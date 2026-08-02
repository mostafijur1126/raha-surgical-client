import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path: string) => {
  const res = await fetch(`${baseUrl}${path}`);
  return handelStatusCode(res);
};

export const serverMutation = async (
  path: string,
  data: unknown,
  method = "POST",
) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handelStatusCode(res);
};

const handelStatusCode = async (res: Response) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  } else if (res.status === 403) {
    redirect("/forbidden");
  }
  return res.json();
};
