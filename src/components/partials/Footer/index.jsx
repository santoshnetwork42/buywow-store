"use client";

import { Heading, Img, Text } from "@/components/elements";
import { PAGETYPE, RESTRICT_FOOTER_TO_SHOW } from "@/utils/data/constants";
import { extractAttributes } from "@/utils/helpers";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const FooterMenu = dynamic(
  () => import("@/components/partials/Footer/FooterMenu"),
);

const SocialLink = React.memo(({ item, index }) => {
  if (!item) return null;
  const { url, alternativeText = "icon" } = extractAttributes(item.image) || {};
  if (!url) return null;
  return (
    <Link
      prefetch={false}
      key={item.id || index}
      href={item?.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Img
        src={url}
        width={24}
        height={24}
        alt={alternativeText}
        className="aspect-square w-6 object-contain"
        loading="lazy"
      />
    </Link>
  );
});

const FooterLogo = React.memo(({ logoUrl, logoAlternativeText }) => {
  if (!logoUrl) return null;
  return (
    <Link prefetch={false} href="/">
      <Img
        src={logoUrl}
        width={200}
        height={100}
        alt={logoAlternativeText || "logo"}
        className="aspect-[2] h-auto max-w-[150px] object-contain md:max-w-[175px] xl:max-w-[200px]"
        loading="lazy"
      />
    </Link>
  );
});

const FooterDescription = React.memo(({ description }) => {
  if (!description) return null;
  return (
    <Text
      as="div"
      size="sm"
      className="text-white-a700_01"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
});

const Copyright = React.memo(({ copyrightText }) => {
  if (!copyrightText) return null;
  return (
    <Text
      as="p"
      size="sm"
      className="text-[11px] text-white-a700_01"
      responsive
    >
      {copyrightText}
    </Text>
  );
});

const Footer = ({ data }) => {
  const pathname = usePathname();
  const isRestricted = RESTRICT_FOOTER_TO_SHOW.some(
    (allowedPath) =>
      allowedPath === pathname ||
      (allowedPath !== "/" && pathname.startsWith(`${allowedPath}/`)),
  );

  const {
    logo,
    description,
    socialLinks,
    copyrightText,
    menus: collectionMenus,
    otherLinks,
  } = extractAttributes(data) || {};

  const { url: logoUrl, alternativeText: logoAlternativeText } =
    extractAttributes(logo) || {};

  const prefixSlug = (item) => {
    const prefix = PAGETYPE[item?.slugType];
    return item
      ? {
          ...item,
          slug: item.slug
            ? `/${prefix ? prefix + "/" : ""}${item.slug || ""}`
            : "",
        }
      : null;
  };

  const processSubMenu = (items) =>
    items
      ?.map((item) =>
        item
          ? {
              ...item,
              subMenu: item.subMenu?.map(prefixSlug).filter(Boolean),
            }
          : null,
      )
      .filter(Boolean) || [];

  const hasSubMenu = (item) => item?.subMenu?.length > 0;
  const noSubMenu = (item) => !hasSubMenu(item);

  const menu = {
    itemsWithSubMenu: [
      ...processSubMenu((collectionMenus || []).filter(hasSubMenu)),
      ...processSubMenu((otherLinks || []).filter(hasSubMenu)),
    ],
    itemsWithoutSubMenu: [
      ...(collectionMenus || [])
        .filter(noSubMenu)
        .map(prefixSlug)
        .filter(Boolean),
      ...(otherLinks || []).filter(noSubMenu).map(prefixSlug).filter(Boolean),
    ],
  };
  // Find the index of "Quick Links"
  const quickLinksIndex = menu.itemsWithSubMenu.findIndex(
    (item) => item.title === "Quick Links",
  );

  const [openSections, setOpenSections] = useState(() => {
    const initialState = {};
    if (quickLinksIndex !== -1) {
      initialState[quickLinksIndex] = true;
    }
    return initialState;
  });

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...(prev[index] ? {} : { [index]: true }),
    }));
  };

  if (!data) return null;

  if (isRestricted) return <></>;

  return (
    <footer className="container-main flex bg-blue_gray-300_01 px-5 py-6 shadow-[0_0_0_100vmax_#899fbf] [clipPath:inset(0_-100vmax)] sm:px-10 md:px-14 lg:px-16 xl:px-24">
      <div className="flex w-full flex-col justify-between gap-5 sm:flex-row">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            <FooterLogo
              logoUrl={logoUrl}
              logoAlternativeText={logoAlternativeText}
            />
            <FooterDescription description={description} />
          </div>
          <div className="hidden flex-col gap-12 sm:flex">
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-3 md:gap-4">
                {socialLinks.map((item, index) => (
                  <SocialLink
                    key={`social-link-${index}`}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            )}
            <Copyright copyrightText={copyrightText} />
          </div>
        </div>
        <div className="mt-3 flex w-full flex-col gap-3 sm:mt-5 sm:max-w-[50%] md:max-w-[60%] md:flex-row md:justify-around lg:justify-between">
          {collectionMenus && (
            <div className="flex flex-col gap-3 md:w-1/2 lg:flex-1 lg:flex-row lg:justify-evenly lg:gap-5">
              {menu.itemsWithSubMenu.map((item, index) => (
                <FooterMenu
                  key={`footer-menu-${index}`}
                  item={item}
                  isOpen={openSections[index]}
                  onToggle={() => toggleSection(index)}
                />
              ))}
            </div>
          )}
          <div className="flex flex-col gap-3">
            {menu.itemsWithoutSubMenu.map((item, index) => (
              <Link
                prefetch={false}
                key={`footer-menu-link-${index}`}
                href={item?.slug || item?.link || "#"}
              >
                <Heading
                  as="h5"
                  size="base"
                  className="font-semibold capitalize text-white-a700_01"
                >
                  {item?.title}
                </Heading>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-2 sm:hidden">
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex shrink-0 gap-3 md:gap-4">
              {socialLinks.map((item, index) => (
                <SocialLink
                  key={`social-link-${index}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          )}
          <Copyright copyrightText={copyrightText} />
        </div>
      </div>
    </footer>
  );
};

SocialLink.displayName = "SocialLink";
FooterLogo.displayName = "FooterLogo";
FooterDescription.displayName = "FooterDescription";
Copyright.displayName = "Copyright";
Footer.displayName = "Footer";

export default Footer;
