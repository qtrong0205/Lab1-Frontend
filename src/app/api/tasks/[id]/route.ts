import { z } from "zod";
import { authRequest } from "@/lib/auth-request";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

const idSchema = z.string().uuid();

const patchSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    is_done: z.boolean().optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0);

async function getTaskId(context: RouteContext) {
  const { id } = await context.params;
  return idSchema.safeParse(id);
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const auth = await authRequest(request);
    if (!auth) return json({ error: "Chưa đăng nhập" }, 401);

    const parsedId = await getTaskId(context);
    if (!parsedId.success) return json({ error: "ID không hợp lệ" }, 400);

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Dữ liệu JSON không hợp lệ" }, 400);
    }

    const parsedBody = patchSchema.safeParse(body);
    if (!parsedBody.success) {
      return json({ error: "Dữ liệu cập nhật không hợp lệ" }, 400);
    }

    const { data, error } = await auth.db
      .from("tasks")
      .update(parsedBody.data)
      .eq("id", parsedId.data)
      .eq("user_id", auth.user.id)
      .select("id,title,is_done,created_at")
      .maybeSingle();

    if (error) return json({ error: "Không cập nhật được công việc" }, 500);
    if (!data) return json({ error: "Không tìm thấy công việc" }, 404);
    return json({ data });
  } catch {
    return json({ error: "Đã xảy ra lỗi máy chủ" }, 500);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const auth = await authRequest(request);
    if (!auth) return json({ error: "Chưa đăng nhập" }, 401);

    const parsedId = await getTaskId(context);
    if (!parsedId.success) return json({ error: "ID không hợp lệ" }, 400);

    const { data, error } = await auth.db
      .from("tasks")
      .delete()
      .eq("id", parsedId.data)
      .eq("user_id", auth.user.id)
      .select("id")
      .maybeSingle();

    if (error) return json({ error: "Không xóa được công việc" }, 500);
    if (!data) return json({ error: "Không tìm thấy công việc" }, 404);
    return json({ data });
  } catch {
    return json({ error: "Đã xảy ra lỗi máy chủ" }, 500);
  }
}
