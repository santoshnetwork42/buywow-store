import { Button, Heading, Text } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";

const CheckoutButton = ({
  grandTotal,
  totalAmountSaved,
  validateAndGoToCheckout,
  checkoutButtonDisabled,
  prepaidDiscount,
}) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex shrink-0 flex-col gap-1">
        <Heading size="xl" as="h3" responsive>
          ₹{toDecimal(grandTotal + prepaidDiscount)}
        </Heading>
        {!!totalAmountSaved && (
          <Text className="text-green-600" size="sm">
            You Saved ₹{toDecimal(totalAmountSaved)}
          </Text>
        )}
      </div>
      <Button
        className="w-3/5 shrink"
        variant="primary"
        size="large"
        onClick={validateAndGoToCheckout}
        disabled={checkoutButtonDisabled}
      >
        <Heading
          size="2xl"
          as="h2"
          className="text-xl text-white-a700_01"
          responsive
        >
          Checkout
        </Heading>
      </Button>
    </div>
  );
};

export default CheckoutButton;
