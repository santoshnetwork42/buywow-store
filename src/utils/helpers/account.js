import dayjs from "dayjs";

export const EVENT_TITLES = {
  CREDIT_PREPAID_ORDER: "Cashback added",
  CREDIT_COD_ORDER: "Cashback added",
  CREDIT_USER_SIGNUP: "Cashback added",
  DEBIT_PREPAID_ORDER: "Cashback debited",
  DEBIT_COD_ORDER: "Cashback debited",
  DEBIT_EXPIRED: "Cashback expired",
  DEBIT_BY_ADMIN: "Cashback debited",
  CREDIT_BY_ADMIN: "Promotional cashback",
  CREDIT_ORDER_REFUNDED: "Cashback added",
  CREDIT_BY_MOENGAGE: "Promotional cashback",
};

export const EVENT_DESCRIPTIONS = {
  CREDIT_PREPAID_ORDER: "Cashback for Order",
  CREDIT_COD_ORDER: "Cashback for Order",
  CREDIT_USER_SIGNUP: "Joining Bonus",
  DEBIT_PREPAID_ORDER: "Used against Order",
  DEBIT_COD_ORDER: "Used against Order",
  DEBIT_BY_ADMIN: "",
  CREDIT_BY_ADMIN: "",
  CREDIT_ORDER_REFUNDED: "Refunded against Order",
  CREDIT_BY_MOENGAGE: "",
  DEBIT_BY_MOENGAGE: "",
};

export const getEventTitle = (eventType) => EVENT_TITLES[eventType] || "";

export const getEventDescription = (eventType, reason) =>
  EVENT_DESCRIPTIONS[eventType] || reason || "";

export const getExpireLabel = (date) => {
  if (!date) return "";
  const days = dayjs(date).diff(dayjs(), "days");
  if (days > 0 && days < 7) return `Expires in ${days} day(s)`;
  if (days > 0) return `Expires on ${dayjs(date).format("DD MMM YYYY")}`;
  if (days === 0) return `Expires today`;
  if (dayjs(date).valueOf() <= dayjs().valueOf())
    return `Expired on ${dayjs(date).format("DD MMM")}`;
  return "";
};
