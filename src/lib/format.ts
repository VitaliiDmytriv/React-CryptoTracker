import Decimal from "decimal.js";

export const formatMoney = (value: string | null) => {
  if (!value) return "-";
  const number = new Decimal(value).toNumber();
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

export const formatQuantity = (value: string | null) => {
  if (!value) return "-";
  const number = new Decimal(value).toNumber();
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8,
  }).format(number);
};

export const formatPrice = (value: string | null) => {
  if (!value) return "-";
  const number = new Decimal(value).toNumber();

  let maxFractionDigits = 2;

  if (number < 1 && number > 0) {
    maxFractionDigits = 6; // дрібні токени
  } else if (number < 10) {
    maxFractionDigits = 4; // середні
  } // else залишаємо 2

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: maxFractionDigits,
  }).format(number);
};

export const formatPercent = (percent: string) => {
  return new Decimal(percent).abs().toFixed(2) + "%";
};
