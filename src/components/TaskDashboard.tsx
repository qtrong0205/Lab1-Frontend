"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Task, TaskFilter } from "@/types/task";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Icon from "./Icon";

// Dữ liệu mẫu ban đầu có đầy đủ id, title, is_done
const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Ôn tập từ vựng IELTS Reading Cam 18 Test 2",
    is_done: false,
    subject: "Tiếng Anh",
    dueDate: "Hôm nay, 16:00",
    isUrgent: true,
  },
  {
    id: "2",
    title: "Làm 5 bài tập cấu trúc dữ liệu Cây nhị phân",
    is_done: false,
    subject: "Tin học",
    dueDate: "Ngày mai, 10:00",
  },
  {
    id: "3",
    title: "Đọc tài liệu Triết học Mác - Lênin chương 2",
    is_done: false,
    subject: "Đại cương",
    dueDate: "Thứ Sáu",
  },
  {
    id: "4",
    title: "Nộp báo cáo đồ án môn Thiết kế giao diện",
    is_done: true,
    subject: "Thiết kế",
    dueDate: "Hôm nay",
    completedAt: "Đã hoàn tất",
  },
  {
    id: "5",
    title: "Luyện phát âm ngữ điệu 20 phút",
    is_done: true,
    subject: "Tiếng Anh",
    dueDate: "Hôm nay",
    completedAt: "Đã hoàn tất",
  },
];

export default function TaskDashboard() {
  // Quản lý danh sách công việc bằng React State thuần túy (không lưu localStorage, không gọi API)
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(false);

  // State xác nhận khi xóa công việc
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Pomodoro timer state
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);

  // Hiệu ứng đếm ngược Pomodoro
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (pomodoroRunning) {
      interval = setInterval(() => {
        setPomodoroSeconds((prev) => {
          if (prev <= 1) {
            setPomodoroRunning(false);
            return 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroRunning]);

  const formattedPomodoroTime = useMemo(() => {
    const mins = Math.floor(pomodoroSeconds / 60);
    const secs = pomodoroSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [pomodoroSeconds]);

  // Thêm công việc mới
  // 1. Chức năng Thêm tên công việc mới
  const handleAddTask = (title: string, subject: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      is_done: false,
      subject,
      dueDate: "Hôm nay",
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Bật/tắt trạng thái hoàn thành
  // 2. Chức năng Sửa tên công việc
  const handleUpdateTitle = (id: string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };

  // 3. Chức năng Đổi trạng thái hoàn thành (is_done)
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextDone = !t.is_done;
          return {
            ...t,
            is_done: nextDone,
            completedAt: nextDone ? "Vừa xong" : undefined,
          };
        }
        return t;
      })
    );
  };

  // 4. Chức năng Xóa có xác nhận
  const handleRequestDelete = (id: string) => {
    const target = tasks.find((t) => t.id === id);
    if (target) {
      setTaskToDelete(target);
    }
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  // Lắng nghe phím Escape để đóng hộp thoại xác nhận xóa
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && taskToDelete) {
        setTaskToDelete(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [taskToDelete]);

  // Toggle Pomodoro timer
  const handleTogglePomodoro = () => {
    setPomodoroRunning((prev) => !prev);
  };

  // Tính toán số lượng và tiến độ
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.is_done).length;
  const pendingCount = totalCount - completedCount;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Lọc và tìm kiếm
  const filteredTasks = useMemo(() => {
    let result = tasks.filter((t) => {
      if (filter === "pending" && t.is_done) return false;
      if (filter === "completed" && !t.is_done) return false;
      const normalizedSearch = searchQuery.trim().toLowerCase();
      if (
        normalizedSearch &&
        !t.title.toLowerCase().includes(normalizedSearch) &&
        !(t.subject && t.subject.toLowerCase().includes(normalizedSearch))
      ) {
        return false;
      }
      return true;
    });

    if (sortAsc) {
      result = [...result].reverse();
    }

    return result;
  }, [tasks, filter, searchQuery, sortAsc]);

  // Thống kê theo môn học
  const subjectStats = useMemo(() => {
    const subjects = ["Tiếng Anh", "Tin học", "Đại cương"];
    return subjects.map((subj) => {
      const subjTasks = tasks.filter(
        (t) =>
          (t.subject && t.subject.toLowerCase().includes(subj.toLowerCase())) ||
          (subj === "Tin học" &&
            t.subject &&
            t.subject.toLowerCase().includes("thiết kế"))
      );
      const total = subjTasks.length;
      const done = subjTasks.filter((t) => t.is_done).length;
      const percent = total > 0 ? Math.round((done / total) * 100) : 0;
      return {
        name: subj === "Tin học" ? "Tin học & Đồ án" : subj,
        done,
        total,
        percent,
      };
    });
  }, [tasks]);

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen flex flex-col">
      {/* 1. Thanh điều hướng trên cùng (Fixed Header) */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-[1140px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-lg">
            <Link
              href="/tasks"
              className="flex items-center gap-space-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            >
              <Image
                src="/images/logo.png"
                alt="Logo Việc học của tôi"
                width={32}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
              <span className="font-headline-md text-headline-md text-on-surface font-bold">
                Việc học của tôi
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-space-xs">
              <Link
                href="/tasks"
                className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg bg-surface-container-high text-on-surface font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Danh sách công việc
              </Link>
              <a
                href="#notes"
                className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Ghi chú học tập
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-sm">
              <Image
                src="/images/avatar.png"
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden sm:inline-block font-label-lg text-label-lg text-on-surface font-medium">
                Minh Anh
              </span>
            </div>
            <Link
              href="/login"
              className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg text-on-surface-variant hover:text-error hover:bg-surface-container-high transition-colors font-label-lg text-label-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Icon name="logout" className="text-[1.25rem]" />
              <span>Đăng xuất</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Nội dung chính (Main Content) */}
      <main className="flex-1 w-full pt-16 bg-surface">
        <div className="max-w-[1140px] mx-auto px-margin-mobile md:px-margin py-space-lg">
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              {/* Cột chính: Quản lý công việc (lg:col-span-8 xl:col-span-9) */}
              <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-space-lg">
                {/* Tiêu đề trang & Lời chào thân thiện */}
                <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-xs">
                  <div>
                    <div className="flex items-center gap-space-xs text-primary font-label-lg text-label-lg mb-1">
                      <Icon name="wb_sunny" className="text-[1.125rem]" />
                      <span>Thứ Tư, 24 Tháng 10</span>
                    </div>
                    <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
                      Công việc học tập của tôi
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Chào Minh Anh! Hôm nay bạn có{" "}
                      <span className="font-label-lg text-primary font-semibold">
                        {pendingCount} công việc
                      </span>{" "}
                      cần hoàn thành để giữ vững phong độ.
                    </p>
                  </div>

                  {/* Huy hiệu tiến độ tóm tắt */}
                  <div className="hidden sm:flex items-center gap-3 bg-surface-container-low px-4 py-2.5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-fixed text-primary">
                      <Icon name="task_alt" className="text-[1.3rem]" />
                    </div>
                    <div>
                      <div className="font-label-caps text-label-caps text-outline uppercase font-semibold">
                        Tiến độ ngày
                      </div>
                      <div className="font-label-lg text-label-lg text-on-surface font-semibold">
                        {completedCount} / {totalCount} hoàn thành ({progressPercent}%)
                      </div>
                    </div>
                  </div>
                </section>

                {/* Khung thêm công việc mới */}
                <TaskForm onAddTask={handleAddTask} />

                {/* Danh sách công việc với các bộ lọc */}
                <TaskList
                  tasks={filteredTasks}
                  filter={filter}
                  onFilterChange={setFilter}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  sortAsc={sortAsc}
                  onToggleSort={() => setSortAsc(!sortAsc)}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleRequestDelete}
                  onUpdateTitle={handleUpdateTitle}
                  totalCount={totalCount}
                  pendingCount={pendingCount}
                  completedCount={completedCount}
                />
              </div>

              {/* Cột phụ: Góc tập trung & Truyền cảm hứng (lg:col-span-4 xl:col-span-3) */}
              <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-space-md">
                {/* Card Pomodoro / Đồng hồ tập trung nhanh */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="timer" className="text-primary text-[1.25rem]" />
                      <span className="font-headline-md text-headline-md font-semibold">
                        Phiên tập trung
                      </span>
                    </div>
                    <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed uppercase font-semibold">
                      Pomodoro
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center py-4 bg-surface-container-low rounded-lg">
                    <span className="font-display-lg text-display-lg font-bold text-primary tracking-tight">
                      {formattedPomodoroTime}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      {pomodoroRunning
                        ? "Đang tập trung học tập..."
                        : "Sẵn sàng bắt đầu bài mới"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleTogglePomodoro}
                    className="w-full h-10 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Icon
                      name={pomodoroRunning ? "pause" : "play_arrow"}
                      className="text-[1.125rem]"
                    />
                    <span>
                      {pomodoroRunning ? "Tạm dừng" : "Bắt đầu 25 phút"}
                    </span>
                  </button>
                </div>

                {/* Góc cảm hứng học tập */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
                  <div className="h-36 w-full relative">
                    <Image
                      src="/images/study-quote.png"
                      alt="Bàn học truyền cảm hứng với sách và cà phê"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                      <span className="text-white font-label-caps text-label-caps tracking-wider uppercase font-semibold">
                        Châm ngôn hôm nay
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col gap-2">
                    <p className="font-body-sm text-body-sm text-on-surface italic leading-relaxed">
                      &ldquo;Hành trình vạn dặm bắt đầu từ một bước chân nhỏ. Mỗi
                      trang sách hôm nay là hành trang mai sau.&rdquo;
                    </p>
                    <span className="font-label-md text-label-md text-primary font-medium self-end">
                      — Lão Tử
                    </span>
                  </div>
                </div>

                {/* Thống kê nhanh môn học */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-3">
                  <span className="font-headline-md text-headline-md text-on-surface font-semibold">
                    Theo môn học
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {subjectStats.map((item, idx) => (
                      <div key={item.name}>
                        <div className="flex justify-between font-label-md text-label-md text-on-surface-variant mb-1">
                          <span>{item.name}</span>
                          <span className="font-semibold text-on-surface">
                            {item.done} / {item.total} hoàn thành
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              idx === 0
                                ? "bg-secondary"
                                : idx === 1
                                ? "bg-primary"
                                : "bg-outline-variant"
                            }`}
                            style={{ width: `${item.percent}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="w-full bg-surface-container-low py-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.02)] mt-auto">
        <div className="max-w-[1140px] mx-auto px-margin-mobile md:px-margin text-center">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2025 Việc học của tôi • Đồng hành cùng hành trình tri thức của bạn
          </p>
        </div>
      </footer>

      {/* 4. Hộp thoại xác nhận xóa (Modal có hỗ trợ phím Escape, Tab, Enter) */}
      {taskToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn"
        >
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center shrink-0">
                <Icon name="warning" className="text-error text-[1.25rem]" />
              </div>
              <h3
                id="confirm-delete-title"
                className="font-headline-md text-headline-md text-on-surface font-semibold"
              >
                Xác nhận xóa công việc?
              </h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Bạn có chắc chắn muốn xóa công việc{" "}
              <span className="font-semibold text-on-surface">
                &ldquo;{taskToDelete.title}&rdquo;
              </span>
              ? Thao tác này không thể hoàn tác.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                autoFocus
                className="px-4 py-2 rounded-lg bg-error hover:bg-[#ba1a1a]/90 text-on-error font-label-lg text-label-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error shadow-sm"
              >
                Xóa công việc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
