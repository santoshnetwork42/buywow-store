export const replaceBlogLinks = (content) => {
  const domain = `${process.env.NEXT_PUBLIC_SITE_URL}/blog`;
  const ip = process.env.NEXT_PUBLIC_WP_IP;
  const regEx = new RegExp(ip, "g");
  const newContent = content?.replace(regEx, domain);

  const externalLink = new RegExp(
    `<a href="http|https://(?!${domain}).*?"`,
    "g",
  );

  newContent?.replace(externalLink, (match) => {
    newContent?.replace(
      match,
      `${match} target="_blank" rel="noopener noreferrer"`,
    );
  });

  return newContent;
};
