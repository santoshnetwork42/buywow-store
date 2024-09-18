import {
  createRedirectsAPI,
  getRedirectsAPI,
  updateRedirectsAPI,
} from "@/lib/appSyncAPIs";
import { notFound, redirect } from "next/navigation";
import { extname } from "path";

const handleRedirect = async (path) => {
  const extension = extname(path);

  const pageRedirect = await getRedirectsAPI(path);

  if (pageRedirect?.redirect && pageRedirect.redirect !== path) {
    redirect(pageRedirect.redirect.replace("\r", ""));
  }

  if (pageRedirect?.slug) {
    await updateRedirectsAPI(path, (pageRedirect?.hitCount || 0) + 1);
  }

  if (!pageRedirect && !extension) {
    await createRedirectsAPI(path);
  }

  const { REVALIDATE_SECRET = "secret", NEXT_PUBLIC_SITE_URL } = process.env;

  const response = await fetch(
    `http://localhost:3000/api/revalidate?secret=${REVALIDATE_SECRET}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: path ?? "/",
      }),
    },
  );
  const data = await response.json();
  console.log("data: }}}}}}}}}}}}}}{{{{{{{{{{{{{{{{{{{{", data);

  console.error("not found: ", path);
  notFound();
};

export default handleRedirect;
