# Việc học của tôi

## 1. Giới thiệu

**Việc học của tôi** là ứng dụng quản lý công việc học tập. Người dùng đăng nhập, thêm công việc, sửa tên, đánh dấu hoàn thành và xóa công việc. API lọc dữ liệu theo người dùng đang đăng nhập, vì vậy mỗi người chỉ thấy và thao tác được trên công việc của mình.

### Công nghệ

- Next.js `16.3.8` với App Router.
- React `19.2.8`.
- TypeScript `^5`.
- Tailwind CSS `4.3.3`.
- Supabase:
  - `@supabase/supabase-js` `2.117.2`.
  - `@supabase/ssr` `0.7.0`.
  - PostgreSQL và Supabase Auth.
- Zod `^4.6.5` để kiểm tra dữ liệu đầu vào API.
- Vercel để triển khai: [URL Vercel - cần điền].

Thiết kế Stitch: [link Stitch - cần điền].

## 2. Cấu trúc thư mục

Các tệp và thư mục quan trọng hiện có:

```text
src/
├── app/
│   ├── api/tasks/route.ts          # GET và POST danh sách công việc
│   ├── api/tasks/[id]/route.ts     # PATCH và DELETE một công việc
│   ├── login/page.tsx              # Trang đăng nhập
│   ├── tasks/page.tsx              # Trang danh sách công việc
│   ├── page.tsx                    # Chuyển trang gốc sang /tasks
│   ├── layout.tsx                  # Metadata, font và layout chung
│   └── globals.css                 # Tailwind theme và kiểu giao diện
├── components/
│   ├── LoginForm.tsx               # Form đăng nhập bằng Supabase Auth
│   ├── TaskDashboard.tsx           # Kiểm tra session, gọi API và điều phối giao diện
│   ├── TaskForm.tsx                # Form thêm công việc
│   ├── TaskList.tsx                # Bộ lọc, tìm kiếm, sắp xếp và danh sách
│   ├── TaskItem.tsx                # Sửa, hoàn thành và xóa từng công việc
│   └── Icon.tsx                    # Các biểu tượng SVG và fallback Material Symbols
├── lib/
│   ├── auth-request.ts             # Xác thực Bearer token ở server
│   └── supabase-browser.ts         # Supabase browser client dùng chung
└── types/
    └── task.ts                     # Kiểu Task và TaskFilter

design/stitch/
├── login.html                      # Bản thiết kế trang đăng nhập
├── tasks.html                      # Bản thiết kế màn hình công việc
├── tasks-desktop.html              # Bản thiết kế desktop
├── tasks-mobile.html               # Bản thiết kế mobile
├── login.png
├── tasks.png
├── tasks-desktop.png
├── tasks-mobile.png
└── notes.md                        # Token màu, typography, spacing và hướng dẫn thiết kế
```

Tệp `supabase/schema.sql` chưa tồn tại trong repository: [cần điền nội dung hoặc đường dẫn schema].

Thư mục `docs/` chưa tồn tại trong repository: [cần điền tài liệu dự án nếu bổ sung].

## 3. Yêu cầu môi trường

- Node.js `>=20.9.0` theo yêu cầu của Next.js `16.3.8`.
- npm.
- Git.

Phiên bản dùng khi ghi README:

```text
Node.js: v24.15.0
npm: 11.12.1
Git: 2.53.0.windows.3
```

## 4. Cài đặt và chạy ở máy cá nhân

Clone repository:

```bash
git clone [URL repository - cần điền]
cd viec-hoc
```

Cài đúng dependency theo `package-lock.json`:

```bash
npm ci
```

Tạo file môi trường local từ file mẫu:

```bash
copy .env.example .env.local
```

Mở `.env.local` và điền các giá trị Supabase tương ứng theo mục [Biến môi trường](#6-biến-môi-trường). Không đưa `.env.local` lên Git.

Chạy môi trường phát triển:

```bash
npm run dev
```

Mở `http://localhost:3000`. Nếu cổng `3000` đang bận, dùng URL và cổng được in trong Terminal, ví dụ `http://localhost:3001`.

## 5. Tạo project Supabase

Thực hiện theo thứ tự:

1. Tạo một project mới trong Supabase.
2. Lấy **Project URL** và **publishable key** từ phần thông tin kết nối/API của project.
3. Chạy nội dung `supabase/schema.sql` trong **SQL Editor** trên project mới lần đầu.
   - Hiện repository chưa có tệp này, nên chưa thể cung cấp hoặc xác nhận câu lệnh schema: [cần điền].
4. Kiểm tra bảng `tasks` có Row Level Security (RLS) được bật và có đủ 4 policy cho thao tác đọc, thêm, sửa và xóa.
   - Trạng thái thực tế của database chưa được kiểm tra từ repository: [cần điền].
5. Vào **Authentication → Users** và tạo hai tài khoản thử A và B bằng dữ liệu giả.

Không sử dụng dữ liệu thật, mật khẩu thật hoặc thông tin nhạy cảm cho các tài khoản thử.

## 6. Biến môi trường

Các biến được khai báo trong `.env.example`:

| Tên biến | Ý nghĩa | Lấy ở đâu |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL của Supabase project | Supabase Dashboard, phần thông tin API/project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key dùng cho Supabase Auth và client | Supabase Dashboard, phần API keys |

Chỉ cấu hình hai biến `NEXT_PUBLIC_` nêu trên cho ứng dụng này. Không ghi giá trị thật, mật khẩu, token, `service_role` key hoặc database password vào README, GitHub hay file được commit.

## 7. API

Tất cả endpoint dưới đây yêu cầu header:

```http
Authorization: Bearer <access_token>
```

`access_token` được lấy từ phiên Supabase Auth hiện tại. API không nhận `user_id` từ client; server lấy user từ token và tự thêm điều kiện `user_id` vào truy vấn.

| Phương thức | Đường dẫn | Body gửi | Response thành công | Lỗi có thể trả về |
|---|---|---|---|---|
| `GET` | `/api/tasks` | Không có | `200` với `{ "data": [...] }` | `401` chưa đăng nhập; `500` lỗi database/máy chủ |
| `POST` | `/api/tasks` | `{ "title": "..." }`, title sau trim từ 1–120 ký tự | `201` với `{ "data": { ... } }` | `400` JSON hoặc title không hợp lệ; `401` chưa đăng nhập; `500` lỗi database/máy chủ |
| `PATCH` | `/api/tasks/[id]` | Một hoặc cả hai field: `{ "title": "..." }`, `{ "is_done": true }` | `200` với `{ "data": { ... } }` | `400` UUID/body/field không hợp lệ hoặc body rỗng; `401` chưa đăng nhập; `404` không tìm thấy công việc thuộc user; `500` lỗi database/máy chủ |
| `DELETE` | `/api/tasks/[id]` | Không có | `200` với `{ "data": { "id": "..." } }` | `400` UUID không hợp lệ; `401` chưa đăng nhập; `404` không tìm thấy công việc thuộc user; `500` lỗi database/máy chủ |

Các field trả về của công việc trong API là `id`, `title`, `is_done` và `created_at`. PATCH từ chối field lạ, `user_id` và body rỗng. Mọi thao tác trên `/api/tasks/[id]` đều lọc cả `id` và user hiện tại.

## 8. Kiểm tra và kiểm thử

### Kiểm tra code

Các lệnh kiểm tra:

```bash
npx eslint .
npx tsc --noEmit
npm run build
```

Kết quả lần chạy trong môi trường hiện tại:

| Lệnh | Kết quả |
|---|---|
| `npx eslint .` | Đạt |
| `npx tsc --noEmit` | Đạt |
| `npm run build` | Đạt |

### Kiểm thử thủ công

Kiểm thử chức năng và phân quyền T01–T12 trên trình duyệt theo cách sau:

- Tài khoản A ở cửa sổ trình duyệt thường.
- Tài khoản B ở cửa sổ ẩn danh.
- Kiểm tra đăng nhập, tải danh sách, thêm, sửa, hoàn thành, xóa, đăng xuất, lỗi phiên và việc không truy cập được công việc của user khác.

Bảng kết quả được dự kiến lưu tại [`docs/test-results.md`](docs/test-results.md), nhưng tệp này hiện chưa tồn tại: [cần điền kết quả T01–T12].

| Mã | Nội dung kiểm thử | Kết quả |
|---|---|---|
| T01 | Đăng nhập tài khoản A | [cần điền] |
| T02 | Tải danh sách công việc của A | [cần điền] |
| T03 | Thêm công việc bằng tài khoản A | [cần điền] |
| T04 | Sửa tên công việc của A | [cần điền] |
| T05 | Đánh dấu công việc hoàn thành/chưa hoàn thành | [cần điền] |
| T06 | Xóa công việc của A | [cần điền] |
| T07 | Đăng xuất và chuyển về trang đăng nhập | [cần điền] |
| T08 | Đăng nhập tài khoản B | [cần điền] |
| T09 | B chỉ thấy công việc của B | [cần điền] |
| T10 | B không sửa được công việc của A | [cần điền] |
| T11 | B không xóa được công việc của A | [cần điền] |
| T12 | Token thiếu/sai hoặc phiên hết hạn bị yêu cầu đăng nhập lại | [cần điền] |

Dự án không có công cụ kiểm thử tự động được khai báo trong `package.json`.

## 9. Deploy lên Vercel

1. Đưa source code lên GitHub.
2. Trong Vercel, chọn **Add New Project** và import repository GitHub.
3. Chọn framework **Next.js** nếu Vercel yêu cầu xác nhận.
4. Trong phần Environment Variables, thêm:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
5. Chọn **Deploy**.
6. Sau khi thay đổi biến môi trường, phải redeploy để bản build mới nhận giá trị mới.

## 10. Phiên bản và ngày chạy

Ngày chạy các lệnh: [cần điền].

| Lệnh | Kết quả ghi nhận |
|---|---|
| `node --version` | `v24.15.0` |
| `npm --version` | `11.12.1` |
| `git --version` | `git version 2.53.0.windows.3` |
| `npm ls next react tailwindcss @supabase/supabase-js` | `next@16.3.8`, `react@19.2.8`, `tailwindcss@4.3.3`, `@supabase/supabase-js@2.117.2` |

## 11. Lưu ý và giới hạn

- Dữ liệu công việc được lưu ở Supabase, không nằm trong GitHub. Nếu muốn giữ dữ liệu lâu dài, cần có kế hoạch sao lưu riêng.
- Supabase Free có thể bị tạm dừng khi ít hoạt động; cần kiểm tra trạng thái project trước khi báo cáo.
- Chỉ dùng dữ liệu giả và tài khoản thử.
- `subject`, `dueDate`, `isUrgent` vẫn có trong một số kiểu dữ liệu/giao diện, nhưng API hiện tại chỉ nhận và lưu `title`, cùng trạng thái `is_done` khi cập nhật.
- Tệp `supabase/schema.sql` chưa có nên chưa thể xác nhận schema database và 4 policy RLS từ repository: [cần điền].
- Tài khoản thử, URL Vercel, link Stitch và kết quả T01–T12 chưa được cung cấp: [cần điền].
- Phần chưa đạt hoặc chưa làm: [cần điền].

## 12. Công cụ AI đã dùng

- **Antigravity**: dựng giao diện ban đầu từ thiết kế Stitch.
- **GitHub Copilot**: hoàn thiện backend, gồm Supabase Auth, API và kết nối dữ liệu thật.

Các kiểm tra code đã thực hiện:

- `npx eslint .`
- `npx tsc --noEmit`
- `npm run build`

Các lệnh trên đều đạt trong lần chạy đã ghi ở mục [Kiểm tra code](#kiểm-tra-code). Trên trình duyệt local, trang đăng nhập đã được mở và hiển thị thành công tại `/login`. Chưa có kết quả kiểm thử thủ công T01–T12 để khẳng định toàn bộ luồng nghiệp vụ và phân quyền: [cần điền].
