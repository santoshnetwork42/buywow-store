import { Heading, Img, Text } from "@/components/elements";
import Modal from "@/components/features/Modal";

export default function PaymentLoader({
  loading = false,
  message = "Processing your request",
}) {
  return (
    <Modal
      isOpen={loading}
      enableOutsideClick={false}
      showMobileView={false}
      modalContainerClassName="w-full max-w-72 p-4 sm:p-5 md:w-full lg:p-6"
    >
      <div className="flex flex-col items-center gap-4 text-center md:gap-5">
        <Img
          src="img_image_1724.png"
          alt="logo"
          width="88"
          height="44"
          className="m-auto"
          isStatic
        />

        <div className="loader size-9 rounded-full border-[3px] border-yellow-900"></div>

        <div className="flex flex-col gap-1.5">
          <Heading as="h4" size="lg" className="font-normal text-gray-600">
            {message}
          </Heading>
          <Text as="span" size="sm" className="text-gray-600">
            Please wait
          </Text>
        </div>
      </div>
    </Modal>
  );
}
