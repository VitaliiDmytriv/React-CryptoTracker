import Decimal from "decimal.js";

export const formatMoney = (value: string | null) => {
  if (!value) return "-";
  const number = new Decimal(value).toNumber();
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

export const formatQuantity = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8,
  }).format(value);
};

export const formatPrice = (value: number) => {
  if (!value) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(value);
};
