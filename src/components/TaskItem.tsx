"use client";

import { useState } from "react";
import type { Task } from "@/types/task";
import Icon from "./Icon";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateTitle: (id: string, newTitle: string) => Promise<boolean>;
  isProcessing?: boolean;
}

function getSubjectBadgeClasses(subject?: string) {
  switch (subject?.toLowerCase()) {
    case "tiếng anh":
    case "ngoại ngữ":
      return "bg-secondary-fixed text-on-secondary-fixed";
    case "tin học":
    case "lập trình":
    case "toán học":
      return "bg-primary-fixed text-on-primary-fixed";
    case "đại cương":
    case "triết học":
      return "bg-surface-container text-on-surface-variant";
    case "thiết kế":
      return "bg-surface-container-highest text-on-surface-variant";
    default:
      return "bg-surface-container text-on-surface-variant";
  }
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdateTitle,
  isProcessing = false,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editError, setEditError] = useState<string | null>(null);

  const cancelEdit = () => {
    setEditTitle(task.title);
    setEditError(null);
    setIsEditing(false);
  };

  const saveEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) {
      setEditError("Tên công việc không được để trống (yêu cầu từ 1–120 ký tự).");
      return;
    }
    if (trimmedTitle.length > 120) {
      setEditError(
        `Tên công việc không được vượt quá 120 ký tự (hiện có ${trimmedTitle.length} ký tự).`
      );
      return;
    }

    const succeeded = await onUpdateTitle(task.id, trimmedTitle);
    if (succeeded) {
      setEditError(null);
      setIsEditing(false);
    }
  };

  return (
    <article
      data-testid="task-item"
      className={`group rounded-xl p-space-md shadow-sm transition-all flex items-center justify-between gap-4 ${
        task.is_done
          ? "bg-surface-container-low/60 opacity-85"
          : "bg-surface-container-lowest hover:shadow-md"
      }`}
    >
      {isEditing ? (
        <form onSubmit={saveEdit} className="flex-1 flex flex-col gap-1.5 min-w-0">
          <label
            htmlFor={`edit-task-input-${task.id}`}
            className="block font-label-md text-label-md text-on-surface-variant font-medium"
          >
            Chỉnh sửa tên công việc:
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              id={`edit-task-input-${task.id}`}
              type="text"
              value={editTitle}
              onChange={(event) => {
                setEditTitle(event.target.value);
                if (editError) setEditError(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") cancelEdit();
              }}
              aria-invalid={editError ? "true" : "false"}
              aria-describedby={editError ? `edit-error-${task.id}` : undefined}
              autoFocus
              className={`w-full h-10 px-3 rounded-lg text-body-md font-body-md text-on-surface transition-all focus:outline-none focus:ring-2 ${
                editError
                  ? "bg-error-container/20 border border-error focus:ring-error/30"
                  : "bg-surface-container-low focus:bg-surface-container-lowest focus:ring-primary-container"
              }`}
            />
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="submit"
                disabled={isProcessing}
                className="h-10 px-3.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1.5 hover:bg-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Icon name="check" className="text-[1.125rem]" />
                <span>Lưu</span>
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                disabled={isProcessing}
                className="h-10 px-3.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md flex items-center gap-1.5 hover:bg-surface-container-highest transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Icon name="close" className="text-[1.125rem]" />
                <span>Hủy</span>
              </button>
            </div>
          </div>
          {editError && (
            <p
              id={`edit-error-${task.id}`}
              role="alert"
              className="text-error font-body-sm text-body-sm flex items-center gap-1 mt-0.5"
            >
              <Icon name="error" className="text-[0.875rem] shrink-0" />
              <span>{editError}</span>
            </p>
          )}
        </form>
      ) : (
        <>
          <div className="flex items-center gap-space-md min-w-0 flex-1">
            <button
              type="button"
              onClick={() => onToggle(task.id)}
              disabled={isProcessing}
              aria-label={
                task.is_done
                  ? `Đánh dấu "${task.title}" là chưa xong`
                  : `Đánh dấu "${task.title}" là đã hoàn thành`
              }
              className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                task.is_done
                  ? "bg-tertiary text-on-tertiary"
                  : "bg-surface-container-high hover:bg-primary-fixed text-transparent hover:text-primary"
              }`}
            >
              <Icon name="check" className="text-[1.125rem]" />
            </button>

            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <span
                className={`font-body-md text-body-md truncate ${
                  task.is_done
                    ? "text-outline line-through"
                    : "text-on-surface font-medium"
                }`}
              >
                {task.title}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {task.subject && (
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-label-md text-label-md ${getSubjectBadgeClasses(
                      task.subject
                    )}`}
                  >
                    {task.subject}
                  </span>
                )}
                {task.is_done ? (
                  <span className="flex items-center gap-1 font-body-sm text-body-sm text-tertiary">
                    <Icon name="task_alt" className="text-[1rem]" />
                    <span>{task.completedAt || "Đã hoàn tất"}</span>
                  </span>
                ) : (
                  <span
                    className={`flex items-center gap-1 font-body-sm text-body-sm ${
                      task.isUrgent
                        ? "text-error font-medium"
                        : "text-on-surface-variant"
                    }`}
                  >
                    <Icon
                      name={task.isUrgent ? "schedule" : "calendar_today"}
                      className="text-[1rem]"
                    />
                    <span>{task.dueDate || "Hôm nay"}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                setEditTitle(task.title);
                setEditError(null);
                setIsEditing(true);
              }}
              disabled={isProcessing}
              aria-label={`Chỉnh sửa công việc "${task.title}"`}
              title="Chỉnh sửa tên công việc"
              className="w-8 h-8 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Icon name="edit" className="text-[1.125rem]" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              disabled={isProcessing}
              aria-label={`Xóa công việc "${task.title}"`}
              title="Xóa công việc (có xác nhận)"
              className="w-8 h-8 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
            >
              <Icon name="delete" className="text-[1.125rem]" />
            </button>
          </div>
        </>
      )}
    </article>
  );
}
