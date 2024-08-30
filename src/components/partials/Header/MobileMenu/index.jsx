import { ArrowIconSVG, CloseSVG, UserSVG } from "@/assets/svg/icons";
import { Button, Heading, Img, Text } from "@/components/elements";
import Sidebar from "@/components/features/Drawer";
import MobileMenuItem from "@/components/partials/Header/MobileMenuItem";
import { useAuthDispatch } from "@/store/sagas/dispatch/auth.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";
import { useCallback } from "react";

const HeaderSection = ({
  mWebUrl,
  mWebAlternativeText,
  onClose,
  isLoggedIn,
  onLoginClick,
}) => (
  <div className="flex items-center justify-between bg-yellow-900 p-4">
    <Link href="/" onClick={onClose}>
      <Img
        src={mWebUrl}
        width={100}
        height={48}
        alt={mWebAlternativeText}
        className="aspect-[100/48] w-[100px] object-contain"
      />
    </Link>
    {!isLoggedIn && (
      <div className="ml-2.5 flex flex-1 flex-col gap-0.5">
        <Heading as="h4" size="lg" className="text-white-a700_01">
          Hi Guest
        </Heading>
        <div
          className="relative flex w-fit cursor-pointer items-center gap-1"
          onClick={onLoginClick}
        >
          <Text size="sm" as="p" className="text-white-a700_01">
            Login
          </Text>
          <ArrowIconSVG className="size-4" strokeColor="#ffffff" />
          <div className="absolute -bottom-[3px] left-0 h-[0.5px] w-[55px] bg-white-a700_01"></div>
        </div>
      </div>
    )}
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

const FooterSection = ({ onClose }) => {
  const { handleSignOut } = useAuthDispatch();
  const handleLogoutClick = () => {
    handleSignOut();
    onClose();
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

const MobileMenu = ({
  isOpen,
  onClose,
  collectionMenus,
  otherLinks,
  logo,
  isLoggedIn,
}) => {
  const { handlePasswordLessModal } = useModalDispatch();
  const { url: mWebUrl, alternativeText: mWebAlternativeText = "logo" } =
    extractAttributes(logo);

  const onLoginClick = useCallback(() => {
    handlePasswordLessModal(true, false, "/");
    onClose();
  }, [handlePasswordLessModal, onClose]);

  const menuContent = (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      {(collectionMenus?.length > 0 || otherLinks?.length > 0) && (
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
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
      />
      {menuContent}
      {isLoggedIn && <FooterSection onClose={onClose} />}
    </Sidebar>
  );
};

export default MobileMenu;
