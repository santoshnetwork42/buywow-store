import {
  createRedirectsAPI,
  getRedirectsAPI,
  updateRedirectsAPI,
} from "@/lib/appSyncAPIs";
import { notFound, redirect } from "next/navigation";
import { extname } from "path";

const handleRedirect = async (path, log) => {
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

  console.error("not found path: ", path);
  if (log) {
    console.log(JSON.stringify(log, null, 2));
  }
  notFound();
};

export default handleRedirect;
