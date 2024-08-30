import {
  createRedirectsAPI,
  getRedirectsAPI,
  updateRedirectsAPI,
} from "@/lib/appSyncAPIs";
import { notFound, redirect } from "next/navigation";
import { extname } from "path";

const handleRedirect = async (path) => {
  console.log("path", path);
  const extension = extname(path);

  const pageRedirect = await getRedirectsAPI(path);

  console.log("pageRedirect", pageRedirect);
  if (pageRedirect?.redirect && pageRedirect.redirect !== path) {
    console.log("redirecting to", pageRedirect.redirect);
    redirect(pageRedirect.redirect.replace("\r", ""));
  }

  if (pageRedirect?.slug) {
    console.log("slug found updating redirect");
    await updateRedirectsAPI(path, (pageRedirect?.hitCount || 0) + 1);
  }

  if (!pageRedirect && !extension) {
    console.log("no page redirect found creating new");
    const response = await createRedirectsAPI(path);
    console.log("response", response);
  }

  console.log("not found");
  return notFound();
};

export default handleRedirect;
