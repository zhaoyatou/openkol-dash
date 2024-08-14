export function cent2Yuan(cents: number): string {
  cents = Math.floor(cents)
  const absCents = Math.abs(cents);
  const dollars = Math.floor(absCents / 100);
  const remainingCents = absCents % 100;
  const formattedCents = remainingCents.toString().padStart(2, '0');
  let result = `${dollars}.${formattedCents}`;
  if (cents < 0) {
    result = '-' + result;
  }
  return result;
}

const validAmountRegex = /^\d+(\.\d{0,2})?$/;
export function yuan2Cent(amount: string): number {
  // if (!amount) {
  //   return 0;
  // }
  // const [yuanStr, decimalStr] = amount.split(".");
  // const yuan = BigInt(yuanStr);
  // const decimal = decimalStr ? BigInt(decimalStr) : 0n;
  // return Number(yuan * 100n + decimal);
  if (!validAmountRegex.test(amount)) {
    return NaN;
  }
  const [dollars, cents = '00'] = amount.split('.');
  const totalCents = parseInt(dollars + cents.padEnd(2, '0'), 10);
  return totalCents;
}

import dayjs from "dayjs";

export function second2Time(second: number): string {
  return dayjs(second * 1000).format("YYYY-MM-DD HH:mm:ss");
}
