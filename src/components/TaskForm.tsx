"use client";

import { useState } from "react";
import Icon from "./Icon";

interface TaskFormProps {
  onAddTask: (title: string, subject: string) => Promise<boolean>;
  isSubmitting?: boolean;
}

const QUICK_SUBJECTS = [
  { name: "Toán học", colorClass: "text-primary hover:bg-primary-fixed" },
  { name: "Tiếng Anh", colorClass: "text-secondary hover:bg-secondary-fixed" },
  { name: "Lập trình", colorClass: "text-tertiary hover:bg-tertiary-fixed" },
  {
    name: "Đại cương",
    colorClass: "text-on-surface-variant hover:bg-surface-container",
  },
];

export default function TaskForm({ onAddTask, isSubmitting = false }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Đại cương");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setErrorMessage("Tên công việc không được để trống (yêu cầu từ 1–120 ký tự).");
      return;
    }
    if (trimmed.length > 120) {
      setErrorMessage(
        `Tên công việc không được vượt quá 120 ký tự (hiện có ${trimmed.length} ký tự).`
      );
      return;
    }

    const succeeded = await onAddTask(trimmed, selectedSubject);
    if (succeeded) {
      setErrorMessage(null);
      setTitle("");
    }
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md sm:p-space-lg flex flex-col gap-space-md transition-all">
      <div className="flex items-center gap-2">
        <Icon name="add_task" className="text-primary text-[1.25rem]" />
        <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
          Thêm mục tiêu mới
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label
          htmlFor="new-task-input"
          className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold"
        >
          Tên bài học hoặc nhiệm vụ cần làm
        </label>
        <div className="flex flex-col sm:flex-row gap-space-sm">
          <div className="relative flex-1">
            <input
              id="new-task-input"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              aria-invalid={errorMessage ? "true" : "false"}
              aria-describedby={errorMessage ? "new-task-error" : undefined}
              placeholder="Ví dụ: Đọc chương 3 Giải tích, Làm bài tập Tiếng Anh Unit 5..."
              className={`w-full h-11 pl-4 pr-10 rounded-lg text-on-surface placeholder:text-outline text-body-md font-body-md transition-all focus:outline-none focus:ring-2 ${
                errorMessage
                  ? "bg-error-container/20 border border-error focus:ring-error/30"
                  : "bg-surface-container-low focus:bg-surface-container-lowest focus:ring-primary-container/20"
              }`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
              <Icon name="edit_note" className="text-[1.125rem]" />
            </span>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 px-6 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-[0.99] transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Icon name="add" className="text-[1.25rem]" />
            <span>{isSubmitting ? "Đang thêm..." : "Thêm công việc"}</span>
          </button>
        </div>
        {errorMessage && (
          <p id="new-task-error" role="alert" className="text-error font-body-sm text-body-sm flex items-center gap-1.5 mt-1">
            <Icon name="error" className="text-[1rem] shrink-0" />
            <span>{errorMessage}</span>
          </p>
        )}
      </form>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1 mr-1">
          <Icon name="sell" className="text-[0.875rem]" /> Gợi ý gắn môn:
        </span>
        {QUICK_SUBJECTS.map((subject) => {
          const isSelected = selectedSubject === subject.name;
          return (
            <button
              key={subject.name}
              type="button"
              onClick={() => setSelectedSubject(subject.name)}
              className={`px-3 py-1 rounded-full font-label-md text-label-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                  ? "bg-primary-fixed text-primary font-bold shadow-xs ring-1 ring-primary/20"
                  : `bg-surface-container-high ${subject.colorClass}`
              }`}
            >
              + {subject.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
