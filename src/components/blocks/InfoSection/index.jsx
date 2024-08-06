import { Text } from "@/components/elements";

const InfoSection = ({ information }) => (
  <div className="container-main mb-main flex">
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
