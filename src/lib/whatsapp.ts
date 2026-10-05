import { CartItem, CustomerAddress, Product } from "@/types";
import { formatPrice } from "./utils";
import { STORE_INFO } from "@/data/storeInfo";

const WA_NUMBER = STORE_INFO.whatsappNumber; // "919382107724"

/**
 * Creates dynamic WhatsApp link for ordering a single product directly from PDP
 */
export function createProductWhatsAppUrl(
  product: Product,
  options?: {
    size?: string;
    color?: string;
    quantity?: number;
    url?: string;
  }
): string {
  const qty = options?.quantity || 1;
  const totalPrice = product.price * qty;

  const lines = [
    `*✦ NEW ORDER INQUIRY — ALL FEET FASHION ✦*`,
    ``,
    `Hello All Feet Fashion team! I would like to order:`,
    `*Product:* ${product.name}`,
    `*Brand:* ${product.brand}`,
    options?.size ? `*Size:* ${options.size}` : null,
    options?.color ? `*Color / Variant:* ${options.color}` : null,
    `*Quantity:* ${qty}`,
    `*Price:* ${formatPrice(product.price)} each`,
    `*Total:* ${formatPrice(totalPrice)}`,
    ``,
    options?.url ? `*Product Link:* ${options.url}` : null,
    ``,
    `Please confirm availability, payment details, and shipping timeline to my address. Thank you!`,
  ].filter(Boolean);

  const message = lines.join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates dynamic WhatsApp link for full cart / checkout order
 */
export function createCheckoutWhatsAppUrl(
  orderNumber: string,
  items: CartItem[],
  totals: {
    subtotal: number;
    volumeDiscount: number;
    couponDiscount: number;
    couponCode?: string;
    shippingFee: number;
    finalTotal: number;
  },
  customer: CustomerAddress,
  paymentMethod?: string
): string {
  const itemsText = items
    .map(
      (item, index) =>
        `${index + 1}. *${item.product.name}*\n   • Qty: ${item.quantity}\n   • Price: ${formatPrice(item.unitPrice)}\n   ${item.selectedSize ? `• Size: ${item.selectedSize}\n   ` : ""}${item.selectedColor ? `• Color: ${item.selectedColor}\n   ` : ""}• Item Total: ${formatPrice(item.totalPrice)}`
    )
    .join("\n\n");

  const isOnlinePayment = paymentMethod === "ONLINE_UPI";
  const isCod = paymentMethod === "COD";

  const headerTitle = isOnlinePayment
    ? `*✦ ONLINE ORDER & UPI PAYMENT REQUEST — ALL FEET FASHION ✦*`
    : isCod
    ? `*✦ CASH ON DELIVERY ORDER — ALL FEET FASHION ✦*`
    : `*✦ OFFICIAL ORDER CONFIRMATION — ALL FEET FASHION ✦*`;

  const paymentMethodLabel = isOnlinePayment
    ? `*ONLINE PAYMENT (UPI / Google Pay / Card / Netbanking)*`
    : isCod
    ? `*Cash on Delivery (COD)*`
    : `*WhatsApp Order Confirmation*`;

  const nextStepNote = isOnlinePayment
    ? `*NEXT STEP:* Please share your UPI ID / QR code or payment link for *${formatPrice(totals.finalTotal)}*. I will complete the payment and send the transaction screenshot for instant order dispatch!`
    : isCod
    ? `*NEXT STEP:* Please confirm my delivery address and dispatch via courier with COD.`
    : `Please confirm my order and share dispatch & tracking details.`;

  const lines = [
    headerTitle,
    `*Order ID:* ${orderNumber}`,
    ``,
    `*CUSTOMER DETAILS:*`,
    `• Name: ${customer.fullName}`,
    `• Phone: ${customer.phone}`,
    `• Email: ${customer.email || "N/A"}`,
    `• Delivery Address: ${customer.street}`,
    customer.landmark ? `• Landmark: ${customer.landmark}` : null,
    `• City & State: ${customer.city}, ${customer.state}`,
    `• Pincode: ${customer.pincode}`,
    ``,
    `*ORDERED ITEMS:*`,
    itemsText,
    ``,
    `*BILLING BREAKDOWN:*`,
    `• Subtotal: ${formatPrice(totals.subtotal)}`,
    totals.volumeDiscount > 0 ? `• Multi-item Discount: -${formatPrice(totals.volumeDiscount)}` : null,
    totals.couponDiscount > 0 ? `• Coupon (${totals.couponCode}): -${formatPrice(totals.couponDiscount)}` : null,
    `• Shipping: ${totals.shippingFee === 0 ? "FREE Standard Shipping" : formatPrice(totals.shippingFee)}`,
    `*TOTAL PAYABLE: ${formatPrice(totals.finalTotal)}*`,
    ``,
    `*Selected Payment Method:* ${paymentMethodLabel}`,
    ``,
    nextStepNote,
  ].filter(Boolean);

  const message = lines.join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates dynamic customer support WhatsApp link
 */
export function createSupportWhatsAppUrl(topic?: string): string {
  const intro = topic
    ? `Hello All Feet Fashion team! I have a question regarding: *${topic}*.`
    : `Hello All Feet Fashion! I need assistance with personal styling / product inquiry.`;

  const lines = [
    intro,
    ``,
    `Store Location: Bibigunj, School Bazar, Midnapore - 721101`,
    `Can you please assist me?`,
  ];

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
