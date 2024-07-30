import { createBrowserClient } from "@supabase/ssr";

export const createSupabaseClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export async function getUser() {
  const { auth } = createSupabaseClient();
  const user = (await auth.getUser()).data.user;
  return user;
}

export async function protectRoute() {
  const user = await getUser();
  if (!user) throw Error("Unauthorized");
}
