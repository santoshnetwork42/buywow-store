import { Heading, Text } from "@/components/elements";

const QueryUs = () => {
  return (
    <div className="container-main flex flex-col gap-6 py-4">
      <div>
        <Heading size="3xl">Contact Us</Heading>
      </div>
      <div className="iframe-container">
        <iframe
          style={{ border: "none" }}
          src="https://selfserveapp.kapturecrm.com/support-portals/prod/la/buywow/"
          width="100%"
          height="600px"
        ></iframe>
      </div>
      <div className="flex flex-col gap-3">
        <Text>
          Feel free to email us at support@buywow.in for any questions,
          grievances, or feedback.
        </Text>
        <Text>Contact details</Text>
        <Text>Body Cupid Pvt Ltd. (Buywow)</Text>
        <Text>
          4th Floor, Prestige Dotcom, Field Marshal Cariappa Road, Srinivas
          Nagar, Shanthala Nagar, Ashok Nagar, Bengaluru – 560025, Karnataka,
          India.
        </Text>
        <Text>Phone Number: +917996123484</Text>
        <Text>Working Hours- 10AM - 7PM IST (Monday to Saturday)</Text>
      </div>
    </div>
  );
};

export default QueryUs;
