import { Text } from "@/components/elements";

const PaymentMethods = ({
  id,
  total,
  label,
  description,
  disabled = false,
  selectedMethod,
  handleMethodChange,
}) => {
  return (
    <div
      key={id}
      className="flex w-full cursor-pointer items-center gap-2 shadow-xs"
      onClick={() => {
        if (!disabled) handleMethodChange(id);
      }}
    >
      <div className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border bg-white-a700_01 p-4">
        <div className="flex gap-2">
          <div>
            <input
              type="radio"
              id={id}
              name="paymentMethod"
              value={id}
              checked={selectedMethod === id}
              className="cursor-pointer"
              disabled={disabled}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Text htmlFor={id} className="w-full cursor-pointer">
              {label}
            </Text>
            <Text
              htmlFor={id}
              size="sm"
              className="w-full cursor-pointer font-light"
            >
              {description}
            </Text>
          </div>
        </div>
        <div>
          <Text size="lg">₹{total.toFixed(2)}</Text>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
