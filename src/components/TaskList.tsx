"use client";

import type { Task, TaskFilter } from "@/types/task";
import TaskItem from "./TaskItem";
import Icon from "./Icon";

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortAsc: boolean;
  onToggleSort: () => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTitle: (id: string, newTitle: string) => void;
  totalCount: number;
  pendingCount: number;
  completedCount: number;
}

export default function TaskList({
  tasks,
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  sortAsc,
  onToggleSort,
  onToggleTask,
  onDeleteTask,
  onUpdateTitle,
  totalCount,
  pendingCount,
  completedCount,
}: TaskListProps) {
  const filters: Array<{ value: TaskFilter; label: string; count: number }> = [
    { value: "all", label: "Tất cả", count: totalCount },
    { value: "pending", label: "Chưa xong", count: pendingCount },
    { value: "completed", label: "Đã xong", count: completedCount },
  ];

  return (
    <div className="flex flex-col gap-space-md">
      <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm">
        <div
          role="tablist"
          aria-label="Bộ lọc trạng thái công việc"
          className="inline-flex p-1 bg-surface-container-low rounded-xl gap-1 shrink-0 self-start sm:self-auto"
        >
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={filter === item.value}
              onClick={() => onFilterChange(item.value)}
              className={`px-4 py-1.5 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                filter === item.value
                  ? "bg-surface-container-lowest text-primary shadow-sm font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {item.label}{" "}
              <span className="ml-1 text-label-md text-outline font-medium">
                ({item.count})
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-sm justify-end">
          <div className="relative w-full">
            <label htmlFor="search-task-input" className="sr-only">
              Tìm nhanh bài vở
            </label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
              <Icon name="search" className="text-[1.125rem]" />
            </span>
            <input
              id="search-task-input"
              type="text"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Tìm nhanh bài vở..."
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm focus:bg-surface-container-lowest focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          <button
            type="button"
            onClick={onToggleSort}
            aria-label={sortAsc ? "Sắp xếp theo thứ tự cũ đến mới" : "Sắp xếp theo thứ tự mới đến cũ"}
            title={sortAsc ? "Đang sắp xếp: Cũ đến mới" : "Đang sắp xếp: Mới đến cũ"}
            className="h-9 px-3 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Icon name="swap_vert" className="text-[1.25rem]" />
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-2.5">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onUpdateTitle={onUpdateTitle}
            />
          ))
        ) : (
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg md:p-space-xl flex flex-col items-center text-center max-w-3xl mx-auto w-full py-12">
            <Icon name="auto_stories" className="text-primary text-5xl mb-space-md" />
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs font-semibold">
              Chưa có công việc nào!
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              {searchQuery
                ? `Không tìm thấy công việc nào khớp với từ khóa "${searchQuery}".`
                : filter === "completed"
                ? "Chưa có mục nào được đánh dấu hoàn thành."
                : filter === "pending"
                ? "Tuyệt vời! Bạn không còn công việc nào chưa hoàn tất."
                : "Hãy bắt đầu ngày mới hiệu quả bằng cách thêm bài học hoặc việc cần làm đầu tiên vào danh sách."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
