import { Button, Heading, Img, Text } from "@/components/elements";
import Link from "next/link";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with us for any queries, feedback, or to place an order. We are here to help!",
};

const ContactUs = () => {
  return (
    <div className="container-main flex flex-col gap-6 py-4">
      <div>
        <Heading size="3xl">Contact Us</Heading>
      </div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2">
          <Heading size="2xl">Track Order</Heading>
          <Text className="text-center">
            {
              "If you're eager to track your order and receive up-to-date information, use our order tracking system."
            }
          </Text>
          <Link prefetch href="https://track.buywow.in/">
            <Button variant="primary" className="p-4">
              Track Now
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-6 md:flex-row">
          <div className="md:w-1/2">
            <Img
              src="https://dms.mydukaan.io/original/jpeg/media/ea25387c-415b-4445-a1df-885f69dbd406.jpg"
              alt="Chat-Image"
              className="chat-img"
              width={700}
              height={700}
            />
          </div>
          <div className="flex flex-col gap-2 md:w-1/2">
            <Heading size="2xl">Get</Heading>
            <Heading size="4xl">Quick</Heading>
            <Heading size="4xl">Responses</Heading>
            <Heading size="2xl">to Your Queries</Heading>

            <Text>
              For immediate assistance and real-time support, our chat feature
              is available.
            </Text>
            {/* href="https://wa.link/xs6kb5" */}
            <div className="mt-8">
              <Link prefetch href="https://wa.link/xs6kb5">
                <Button className="p-3" variant="primary">
                  Chat With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 md:flex-row">
          <div className="flex flex-col gap-4 md:w-1/2">
            <Heading size="2xl">
              Not Interested in{" "}
              <span className="text-yellow-900" size="2xl">
                Chatting?
              </span>
            </Heading>
            <Heading size="2xl">Write to us</Heading>
            <Text>
              Our 70% of Customers Choose Chat for Quicker Resolutions!
            </Text>
            <Link prefetch href="/query-us">
              <Button className="p-4" variant="primary">
                Send a Query
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4 md:w-1/2">
            <Heading size="2xl">Note:</Heading>
            <Text>Expected response time by agents are 24-48 hrs.</Text>
            <Text>
              Agents are available between 10am to 7pm IST from Monday to
              Saturday.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
