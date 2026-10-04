export interface Task {
  id: string;
  title: string;
  subject?: string;
  subjectColor?: string;
  is_done: boolean;
  dueDate?: string;
  isUrgent?: boolean;
  completedAt?: string;
  completed?: boolean;
}

export type TaskFilter = "all" | "pending" | "completed";
