import { CloseSVG } from "@/assets/svg/icons";
import { Button, Heading, Img } from "@/components/elements";
import Sidebar from "@/components/features/Drawer";
import { useNavbar } from "@/utils/context/navbar";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";

const HeaderSection = ({ mWebUrl, mWebAlternativeText, onClose }) => (
  <div className="flex items-center justify-between bg-yellow-900 p-4">
    <Link prefetch={false} href="/" onClick={onClose}>
      <Img
        src={mWebUrl}
        width={100}
        height={48}
        alt={mWebAlternativeText}
        className="aspect-[100/48] w-[100px] object-contain"
      />
    </Link>
    <Button onClick={onClose}>
      <CloseSVG height={24} width={24} fillColor="#ffffff" />
    </Button>
  </div>
);

HeaderSection.displayName = "HeaderSection";

const MenuListItem = ({ item, index, onClose }) => (
  <li key={`menu-item-${index}`}>
    <Link
      prefetch={false}
      href={`/blog${item?.path === "/" ? "" : item?.path}`}
      onClick={onClose}
      className="pb-3 pt-2"
    >
      <Heading size="base" as="h4" className="font-semibold">
        {item.label}
      </Heading>
    </Link>
    <div className="h-[0.5px] w-full bg-gray-300" />
  </li>
);

MenuListItem.displayName = "MenuListItem";

const BlogMobileMenu = ({ isOpen, onClose, menus }) => {
  const { headerData } = useNavbar();
  const { mWebMenuLogo } = extractAttributes(headerData) || {};
  const {
    url: mWebLogoUrl,
    alternativeText: mWebLogoAlternativeText = "logo",
  } = extractAttributes(mWebMenuLogo) || {};

  const blogMenuContent = (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      <ul className="space-y-4">
        {menus?.length > 0 &&
          menus
            ?.filter((m) => m.path !== "/web-stories")
            ?.map((item, index) => (
              <div key={index}>
                <MenuListItem item={item} onClose={onClose} index={index} />
              </div>
            ))}
      </ul>
    </div>
  );
  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      position="left"
      width="326px"
      className="lg:hidden"
    >
      <HeaderSection
        mWebUrl={mWebLogoUrl}
        mWebAlternativeText={mWebLogoAlternativeText}
        onClose={onClose}
      />
      {blogMenuContent}
    </Sidebar>
  );
};

export default BlogMobileMenu;
