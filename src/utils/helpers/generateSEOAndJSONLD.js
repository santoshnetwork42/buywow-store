import { MEDIA_BASE_URL } from "@/config";
import { removeHtmlTags } from "@/utils/helpers";
import { getPublicImageURL } from "@/utils/helpers/img-loader";

export function generateSEOAndJSONLD(params) {
  const {
    isProduct,
    isCollection,
    isMain,
    pdpSection,
    seoComponent,
    extractedSlug,
    webUrl,
    collectionInfoSection,
    pageFaqs,
    name,
    collectionProducts = {},
  } = params;

  const faqsPageJsonLd = {
    "@context": "https://schema.org/",
    "@type": "FAQPage",
    mainEntity: [],
  };

  let breadcrumbListJsonLd = {};
  let productJsonLd = {};
  let organizationJsonLd = {};
  let websiteJsonLd = {};
  let pdpImage = {};

  if (isProduct) {
    const { fetchedProduct, productDetailView } =
      pdpSection?.product?.pdpProduct?.data?.attributes || {};

    const productFAQs = productDetailView?.find(
      (item) => item?.__typename === "ComponentAccordionFaQsSection",
    );

    faqsPageJsonLd.mainEntity =
      productFAQs?.FAQs?.map((faq) => ({
        "@type": "Question",
        name: faq?.question,
        acceptedAnswer: { "@type": "Answer", text: faq?.answer },
      })) || [];

    const defaultCollection = seoComponent?.schemaDefaultCollection;

    breadcrumbListJsonLd = {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: webUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: defaultCollection,
          item: `${webUrl}/collections/${defaultCollection}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: fetchedProduct?.title,
          item: `${webUrl}/products/${extractedSlug}`,
        },
      ],
    };

    const productImgs =
      fetchedProduct?.images?.items?.map((img) =>
        getPublicImageURL({ key: img.imageKey, resize: 100, addPrefix: true }),
      ) || [];

    const thumbImageIndex =
      fetchedProduct?.images?.items?.findIndex((img) => !!img?.isThumb) || 0;

    pdpImage = {
      imageUrl: productImgs[thumbImageIndex],
      alt: fetchedProduct?.title || extractedSlug || "",
    };

    productJsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: fetchedProduct?.title || "",
      image: productImgs,
      description:
        fetchedProduct?.longDescription?.replace(/(<([^>]+)>)/gi, "") || "",
      sku: fetchedProduct?.sku || "",
      mpn: fetchedProduct?.sku || "",
      brand: fetchedProduct?.brand || "",
      url: `${webUrl}/products/${extractedSlug}`,
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${webUrl}/products/${extractedSlug}`,
        price: fetchedProduct?.price,
        priceValidUntil: new Date().toISOString(),
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: 3.5,
            currency: "INR",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "IN",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            businessDays: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "https://schema.org/Monday",
                "https://schema.org/Tuesday",
                "https://schema.org/Wednesday",
                "https://schema.org/Thursday",
                "https://schema.org/Friday",
                "https://schema.org/Saturday",
                "https://schema.org/Sunday",
              ],
            },
            cutoffTime: "19:00:00+05:30",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 0,
              maxValue: 0,
              unitCode: "DAY",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 5,
              unitCode: "DAY",
            },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "IN",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 7,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/FreeReturn",
        },
      },
      gtin: fetchedProduct?.barcode || "",
      gtin8: fetchedProduct?.barcode || "",
      gtin13: fetchedProduct?.barcode || "",
      gtin14: fetchedProduct?.barcode || "",
    };
  } else if (isCollection) {
    faqsPageJsonLd.mainEntity =
      pageFaqs?.FAQs?.map((faq) => ({
        "@type": "Question",
        name: faq?.question,
        acceptedAnswer: { "@type": "Answer", text: faq?.answer },
      })) || [];

    breadcrumbListJsonLd = {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://${MEDIA_BASE_URL}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: extractedSlug,
          item: `https://${MEDIA_BASE_URL}/collections/${extractedSlug}`,
        },
      ],
    };
  } else if (isMain) {
    organizationJsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: seoComponent?.seoTitle,
      Description: seoComponent?.seoDescription,
      url: seoComponent?.seoCanonical,
      Logo: "https://media.buywow.in/public/wow-cms/thumbnail_img_header_logo_9aeb8a1417.png",
      sameAs: [
        "https://www.facebook.com/wowskinscienceindia",
        "https://www.instagram.com/wowskinscienceindia/",
        "https://www.pinterest.com/wowskinsciencein/",
        "https://twitter.com/buywow_in",
        "https://www.youtube.com/channel/UCz3yLP_63OUzsBcT0n3xcxA/videos",
      ],
      Founder: [
        {
          "@type": "Person",
          name: "Manish Chowdhary & Karan Chowdhary",
        },
      ],
      foundingDate: "",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+917996123484",
          contactType: "Customer Service",
          email: "support@buywow.in",
        },
      ],
      Address: {
        type: "PostalAddress",
        streetAddress:
          "Prestige Dotcom 4 th floor, Field Marshal Cariappa Rd, Srinivas Nagar, Shanthala Nagar, Ashok Nagar",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560025",
        addressCountry: "IN",
      },
    };
    websiteJsonLd = {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: seoComponent?.seoCanonical,
      potentialAction: {
        "@type": "SearchAction",
        target: `${seoComponent?.seoCanonical}/search?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
  }

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: collectionProducts?.pagination?.totalData || 0,
    itemListOrder: "Unordered",
    itemListElement: [
      ...(collectionProducts?.products?.data || []).map(
        ({ attributes }, index) => {
          const { fetchedProduct: product } = attributes;
          const thumbImage = (product?.images?.items || [])?.[0];
          return {
            "@type": "ListItem",
            position: index + 1,
            name: product?.title,
            url: `https://${MEDIA_BASE_URL}/products/${product?.slug}`,
            image: {
              "@type": "ImageObject",
              contentUrl: getPublicImageURL(thumbImage?.imageKey),
            },
          };
        },
      ),
    ],
  };

  return {
    siteName: name,
    url: extractedSlug,
    title: seoComponent?.seoTitle,
    description: removeHtmlTags(seoComponent?.seoDescription),
    metaTitle: seoComponent?.seoMetaTitle,
    content: collectionInfoSection?.information || "",
    faqsPageJsonLd,
    breadcrumbListJsonLd,
    productJsonLd,
    alternates: {
      canonical:
        seoComponent?.seoCanonical ||
        `${webUrl}/${isProduct ? "products" : "collections"}/${extractedSlug}`,
    },
    robots: {
      index: !seoComponent?.noIndex,
      follow: !seoComponent?.noIndex,
      googleBot: {
        index: !seoComponent?.noIndex,
        follow: !seoComponent?.noIndex,
      },
    },
    openGraph: {
      title: seoComponent?.seoTitle,
      description: seoComponent?.seoDescription,
      ...(isProduct &&
        pdpImage?.imageUrl && {
          images: [
            {
              url: pdpImage.imageUrl,
              width: 1200,
              height: 630,
              alt: pdpImage.alt,
            },
          ],
        }),
    },
    collectionPageJsonLd,
    organizationJsonLd,
    websiteJsonLd,
  };
}
