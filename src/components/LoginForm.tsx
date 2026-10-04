"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setToastMessage("Đăng nhập thành công! Đang chuyển hướng đến /tasks...");

    // Mô phỏng chuyển hướng sau 1.2s (không lưu/gửi mật khẩu ra ngoài)
    setTimeout(() => {
      setIsLoading(false);
      router.push("/tasks");
    }, 1200);
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen flex items-center justify-center p-margin-mobile md:p-margin">
      <main className="w-full max-w-md bg-surface-container-lowest rounded-xl p-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] relative">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden">
            {/* Logo & Header */}
            <div className="flex flex-col items-center justify-center text-center mb-6">
              <div className="w-14 h-14 p-1.5 rounded-2xl bg-surface-container-low flex items-center justify-center shadow-sm mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Logo Việc học của tôi"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain rounded-md"
                  priority
                />
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Đăng nhập
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Chào mừng bạn quay lại với Việc học của tôi
              </p>
            </div>

            {/* Form mẫu */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Field Email */}
              <div className="space-y-1.5">
                <label
                  className="block font-label-lg text-label-lg text-on-surface"
                  htmlFor="email"
                >
                  Địa chỉ Email
                </label>
                <div className="relative rounded-lg bg-surface-container-low transition-all duration-200 focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_#2563eb]">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <Icon name="mail" className="text-[20px]" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nhapemail@example.com"
                    className="w-full bg-transparent pl-10 pr-3.5 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none rounded-lg"
                  />
                </div>
              </div>

              {/* Field Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    className="block font-label-lg text-label-lg text-on-surface"
                    htmlFor="password"
                  >
                    Mật khẩu
                  </label>
                </div>
                <div className="relative rounded-lg bg-surface-container-low transition-all duration-200 focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_#2563eb]">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <Icon name="lock" className="text-[20px]" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu của bạn"
                    className="w-full bg-transparent pl-10 pr-11 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none rounded-lg"
                  />
                  <button
                    id="togglePassword"
                    type="button"
                    aria-label="Hiển thị hoặc ẩn mật khẩu"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-colors"
                  >
                    <Icon
                      name={showPassword ? "visibility_off" : "visibility"}
                      className="text-[20px]"
                    />
                  </button>
                </div>
              </div>

              {/* Ghi nhớ & Quên mật khẩu */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input
                    id="rememberMe"
                    name="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-primary-container bg-surface-container-low focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary cursor-pointer accent-[#2563eb]"
                  />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Ghi nhớ đăng nhập
                  </span>
                </label>
                <a
                  href="#forgot-password"
                  className="font-label-lg text-label-lg text-primary-container hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                >
                  Quên mật khẩu?
                </a>
              </div>

              {/* Nút Đăng nhập */}
              <div className="pt-2">
                <button
                  id="submitBtn"
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-primary-container hover:bg-[#1d4ed8] active:bg-[#1e40af] text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 disabled:opacity-80 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>{isLoading ? "Đang đăng nhập..." : "Đăng nhập"}</span>
                  <Icon name="arrow_forward" className="text-[18px]" />
                </button>
              </div>
            </form>

            {/* Liên kết Xem giao diện công việc theo yêu cầu */}
            <div className="mt-4 pt-3 border-t border-surface-container-high text-center">
              <Link
                href="/tasks"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary-container hover:text-primary font-label-lg text-label-lg font-medium transition-all group"
              >
                <Icon
                  name="task_alt"
                  className="text-[18px] group-hover:translate-x-0.5 transition-transform"
                />
                <span>Xem giao diện công việc</span>
              </Link>
            </div>

            {/* Đăng ký */}
            <div className="mt-4 pt-3 text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Chưa có tài khoản?{" "}
                <a
                  href="#register"
                  className="font-label-lg text-label-lg text-primary-container hover:text-primary font-semibold ml-1 inline-flex items-center transition-colors"
                >
                  Đăng ký ngay
                </a>
              </p>
            </div>
          </div>

          {/* Toast thông báo */}
          {toastMessage && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-inverse-surface text-inverse-on-surface rounded-lg font-body-sm text-body-sm shadow-xl transition-all duration-300 z-50 flex items-center gap-2">
              <Icon
                name="check_circle"
                className="text-[18px] text-tertiary-fixed"
              />
              <span>{toastMessage}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
