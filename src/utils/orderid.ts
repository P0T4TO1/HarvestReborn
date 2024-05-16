import { today, getLocalTimeZone } from "@internationalized/date";

export function generateOrderId() {
  let now = today(getLocalTimeZone()).toDate(getLocalTimeZone()).toISOString();
  let orderId = now.replace(/[^0-9]/g, "");
  return orderId;
}
