import { CloseSVG, UserSVG } from "@/assets/images";
import { Button, Heading, Img, Text } from "@/components/elements";
import Sidebar from "@/components/features/Drawer";
import MobileMenuItem from "@/components/partials/Header/MobileMenuItem";
import { authSagaActions } from "@/store/sagas/sagaActions/auth.actions";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";
import { useDispatch } from "react-redux";

const HeaderSection = ({ mWebUrl, mWebAlternativeText, onClose }) => (
  <div className="flex items-center justify-between bg-yellow-900 p-4">
    <Link href="/" onClick={onClose}>
      <Img
        src={mWebUrl}
        width={100}
        height={48}
        alt={mWebAlternativeText}
        isStatic
        className="aspect-[100/48] w-[100px] object-contain"
      />
    </Link>
    <div className="ml-2.5 flex flex-1 flex-col gap-0.5">
      <Heading as="h4" size="lg" className="text-white-a700_01">
        Hi Guest
      </Heading>
      <Link
        href="/login"
        className="relative flex w-fit items-center gap-1"
        onClick={onClose}
      >
        <Text size="sm" as="p" className="text-white-a700_01">
          Login
        </Text>
        <Img
          src="img_arrow_right_white.svg"
          width={18}
          height={18}
          alt={`Login arrow`}
          className="aspect-square w-[18px] object-contain"
        />
        <div className="absolute -bottom-[3px] left-0 h-[0.5px] w-[55px] bg-white-a700_01"></div>
      </Link>
    </div>
    <Button onClick={onClose}>
      <CloseSVG height={24} width={24} fillColor="#ffffff" />
    </Button>
  </div>
);

HeaderSection.displayName = "HeaderSection";

const MenuList = ({ items, closeMenu, linkPrefix }) => (
  <>
    {items?.map((item, index) => (
      <li key={`menu-item-${index}`}>
        <MobileMenuItem
          item={item}
          closeMenu={closeMenu}
          linkPrefix={linkPrefix}
        />
        <div className="h-[0.5px] w-full bg-gray-300" />
      </li>
    ))}
  </>
);

MenuList.displayName = "MenuList";

const FooterSection = () => {
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch({
      type: authSagaActions.SIGNOUT,
    });
  };

  return (
    <div className="sticky bottom-0 left-0 w-full bg-gray-50 p-4">
      <div className="flex cursor-pointer items-center gap-2">
        <UserSVG />
        <Text
          size="sm"
          as="p"
          className="capitalize"
          onClick={() => {
            handleLogoutClick();
          }}
        >
          Logout
        </Text>
      </div>
    </div>
  );
};
FooterSection.displayName = "FooterSection";

const MobileMenu = ({ isOpen, onClose, collectionMenus, otherLinks, logo }) => {
  const { url: mWebUrl, alternativeText: mWebAlternativeText = "logo" } =
    extractAttributes(logo);

  const menuContent = (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      {(!!collectionMenus?.length || !!otherLinks?.length) && (
        <ul className="space-y-4">
          {collectionMenus?.length > 0 && (
            <MenuList
              items={collectionMenus}
              closeMenu={onClose}
              linkPrefix="collections"
            />
          )}
          {otherLinks?.length > 0 && (
            <MenuList items={otherLinks} closeMenu={onClose} linkPrefix="" />
          )}
        </ul>
      )}
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
        mWebUrl={mWebUrl}
        mWebAlternativeText={mWebAlternativeText}
        onClose={onClose}
      />
      {menuContent}
      <FooterSection />
    </Sidebar>
  );
};

export default MobileMenu;
