import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { decode } from "$lib/helper";

export const load: PageLoad = ({ url }) => {
  const code = url.searchParams.get("code");

  if (code === null || code.length === 0) {
    redirect(307, "/create");
  } else {
    return { ...decode(code), now: Date.now() };
  }
};
