import { Text } from "@/components/elements";

const InfoSection = ({ information }) => (
  <div className="container-main mb-main mt-2 flex">
    <Text
      size="xl"
      as="p"
      className="info-section"
      responsive
      dangerouslySetInnerHTML={{ __html: information }}
    />
  </div>
);

export default InfoSection;
