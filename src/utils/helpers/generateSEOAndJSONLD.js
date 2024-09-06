import { MEDIA_BASE_URL } from "@/config";
import { removeHtmlTags } from "@/utils/helpers";
import { getPublicImageURL } from "@/utils/helpers/img-loader";

export function generateSEOAndJSONLD(params) {
  const {
    isProduct,
    isCollection,
    pdpSection,
    seoComponent,
    extractedSlug,
    webUrl,
    collectionInfoSection,
    pageFaqs,
    name,
  } = params;

  const faqsPageJsonLd = {
    "@context": "https://schema.org/",
    "@type": "FAQPage",
    mainEntity: [],
  };

  let breadcrumbListJsonLd = {};
  let productJsonLd = {};

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
  }

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    // numberOfItems: searchProducts?.total,
    itemListOrder: "Unordered",
    // itemListElement: [
    //   ...searchProducts?.items?.map((product, index) => {
    //     const { thumbImage } = getProductMeta(product);
    //     return {
    //       "@type": "ListItem",
    //       position: index + 1,
    //       name: product?.title,
    //       url: `https://${MEDIA_BASE_URL}/products/${product?.slug}`,
    //       image: {
    //         "@type": "ImageObject",
    //         contentUrl: getPublicImageURL(thumbImage?.imageKey),
    //       },
    //     };
    //   }),
    // ],
  };

  return {
    siteName: name,
    url: extractedSlug,
    title: seoComponent?.seoTitle,
    description: removeHtmlTags(seoComponent?.seoDescription),
    metaTitle: seoComponent?.seoMetaTitle,
    noIndex: seoComponent?.noIndex,
    content: collectionInfoSection?.information || "",
    faqsPageJsonLd,
    breadcrumbListJsonLd,
    productJsonLd,
    alternates: {
      canonical:
        seoComponent?.seoCanonical ||
        `${webUrl}/${isProduct ? "products" : "collections"}/${extractedSlug}`,
    },
    openGraph: {
      title: seoComponent?.seoTitle,
      description: seoComponent?.seoDescription,
    },
    collectionPageJsonLd,
  };
}
