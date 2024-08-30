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

  console.log("pageRedirect?.slug:> ", pageRedirect?.slug);
  if (!!pageRedirect?.slug) {
    console.log("reached to update");
    const res = await updateRedirectsAPI(
      path,
      (pageRedirect?.hitCount || 0) + 1,
    );
    console.log("res :>> ", res);
  }

  if (!pageRedirect && !extension) {
    await createRedirectsAPI(path);
  }

  notFound();
};

export default handleRedirect;
