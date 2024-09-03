export function extractHeaderSlugs(data) {
  const slugSet = new Set();

  const addSlug = (slug) => {
    if (slug && typeof slug === "string") {
      slugSet.add(JSON.stringify(["collections", slug]));
    }
  };

  if (data?.data?.attributes?.menus) {
    data.data.attributes.menus.forEach((menu) => {
      // Add main menu slug
      addSlug(menu.slug);

      // Add submenu slugs
      if (menu.subMenu && Array.isArray(menu.subMenu)) {
        menu.subMenu.forEach((subItem) => {
          addSlug(subItem.slug);
        });
      }
    });
  }

  // Convert back to array of arrays and parse JSON strings
  return Array.from(slugSet).map(JSON.parse);
}

export function extractFooterSlugs(data) {
  const slugs = new Set();

  const addSlug = (slug) => {
    if (slug && typeof slug === "string" && slug !== "null") {
      slugs.add(["collections", slug]);
    }
  };

  const processMenu = (menu) => {
    addSlug(menu.slug);
    if (Array.isArray(menu.subMenu)) {
      menu.subMenu.forEach((subItem) => addSlug(subItem.slug));
    }
  };

  if (data?.data?.attributes) {
    const { menus } = data.data.attributes;

    if (Array.isArray(menus)) {
      menus.forEach(processMenu);
    }
  }

  return Array.from(slugs);
}
