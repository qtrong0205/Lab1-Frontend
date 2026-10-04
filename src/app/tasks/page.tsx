import type { Metadata } from "next";
import TaskDashboard from "@/components/TaskDashboard";

export const metadata: Metadata = {
  title: "Danh sách công việc - Việc học của tôi",
  description: "Quản lý công việc học tập, bài tập cần nộp và theo dõi tiến độ.",
};

export default function TasksPage() {
  return <TaskDashboard />;
}
