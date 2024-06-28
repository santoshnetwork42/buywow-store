import { Heading } from "@/components/common";

const CollectionMetadataSection = ({ title, content }) => (
  <div className="flex flex-col gap-2">
    <Heading
      size="text5xl"
      as="h2"
      className="!font-inter !font-normal leading-[140%]"
    >
      <span className="font-outfit font-semibold text-black-900">{title}</span>
    </Heading>
    <span className="font-outfit text-black-900">{content}</span>
  </div>
);

// Main component that uses the data object and sub-components
const CollectionMetadata = ({ metadataData }) => (
  <div className="container-xs flex flex-col items-center gap-12 p-5">
    <div className="flex flex-col gap-6 self-stretch">
      {Object.keys(metadataData).map((key) => (
        <CollectionMetadataSection
          key={key}
          title={metadataData[key].title}
          content={metadataData[key].content}
        />
      ))}
    </div>
  </div>
);

export default CollectionMetadata;
