import { today, getLocalTimeZone } from "@internationalized/date";

export function generateOrderId() {
  let now = today(getLocalTimeZone()).toDate(getLocalTimeZone()).toISOString();
  let orderId = now.replace(/[^0-9]/g, "").slice(0, 14);
  return orderId;
}
