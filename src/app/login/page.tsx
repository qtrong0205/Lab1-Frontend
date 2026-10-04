import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập - Việc học của tôi",
  description: "Đăng nhập vào không gian Việc học của tôi để quản lý bài tập và tiến độ học tập.",
};

export default function LoginPage() {
  return <LoginForm />;
}
