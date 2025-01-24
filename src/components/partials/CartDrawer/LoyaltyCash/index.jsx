import { Heading, Text } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";
import { useRuleEngine } from "@wow-star/utils-cms";
import dynamic from "next/dynamic";

const EllipsisIcon = dynamic(() => import("@/src/assets/svg/ellipsisIcon"));

const LoyaltyCash = ({
  showLoyalty,
  usableRewards,
  isRewardApplied,
  handleRewardApply,
  totalRewardPointsOfUser,
}) => {
  const cartPageWowCashTooltip = useRuleEngine("DEBIT_PREPAID_ORDER");

  if (!showLoyalty || !usableRewards) return null;
  return (
    <div className="mb-7 flex justify-between rounded-lg border-[0.25px] border-[#DDDDDD] p-2.5 shadow-[0_4px_4px_#0000000D] md:p-3">
      <div className="flex gap-3">
        <label className="h-fit" htmlFor="wow-cash">
          <input
            type="checkbox"
            className="size-5 cursor-pointer rounded-md border border-black-900 transition-all checked:!bg-yellow-900 focus:border-black-900"
            id="wow-cash"
            checked={isRewardApplied}
            onChange={(e) => handleRewardApply(e.target.checked)}
          />
        </label>
        <div className="flex flex-col gap-0.5">
          <Heading
            as="h3"
            size="lg"
            className="flex items-center text-base"
            responsive
          >
            Use WOW cash
            {!!cartPageWowCashTooltip?.description && (
              <div className="group relative ml-1 cursor-help">
                <EllipsisIcon size={14} />
                <Text
                  as="span"
                  size="xs"
                  className="absolute left-3 top-3 z-10 hidden w-32 rounded bg-black-900 p-2 text-[11px] text-white-a700 group-hover:block sm:w-36 md:w-40"
                >
                  {cartPageWowCashTooltip.description}
                </Text>
              </div>
            )}
          </Heading>
          <Text as="span" size="sm" responsive>
            Available balance: ₹{toDecimal(totalRewardPointsOfUser)}
          </Text>
        </div>
      </div>
      {!!usableRewards && (
        <Heading as="h3" size="lg">
          ₹{toDecimal(usableRewards)}
        </Heading>
      )}
    </div>
  );
};

export default LoyaltyCash;
