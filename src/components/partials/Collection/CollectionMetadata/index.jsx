import { Heading, Text } from "@/components/common";

const CollectionMetadataSection = ({
  title,
  content,
  listTitle,
  listContent,
}) => (
  <div className="flex flex-col">
    <Heading size="xl" as="h2" className="!leading-[140%]" responsive>
      {title}
    </Heading>
    {content && (
      <Text size="xl" as="p" className="!leading-[140%]" responsive>
        {content}
      </Text>
    )}
    {listTitle && (
      <Text
        size="xl"
        as="p"
        className={`${content && "mt-4"} !leading-[140%]`}
        responsive
      >
        {listTitle}
      </Text>
    )}
    {listContent && (
      <ul className="mt-4 list-disc space-y-0.5 pl-6">
        {listContent.map((item, index) => (
          <li key={index}>
            <Text size="xl" as="p" className="!leading-[140%]" responsive>
              {item}
            </Text>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// Main component that uses the data object and sub-components
const CollectionMetadata = ({ metadataData }) => (
  <div className="mt-5 flex flex-col gap-6 sm:gap-6 lg:mt-3 lg:gap-8">
    {Object.entries(metadataData).map(([key, data]) => (
      <CollectionMetadataSection
        key={key}
        title={data.title}
        content={data.content}
        listTitle={data.listTitle}
        listContent={data.listContent}
      />
    ))}
  </div>
);

export default CollectionMetadata;
