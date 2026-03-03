import { FAQItem, NavLink } from '../../types/common';

export const NAV_LINKS: NavLink[] = [
  { label: 'Collections', href: '#' },
  { label: 'The Lab', href: '#' },
  { label: 'Bespoke', href: '#' },
  { label: 'About', href: '#' },
];

export const RETURNS_FAQ: FAQItem[] = [
  {
    question: "Return Policy",
    answer: "Due to the nature of fine jewellery, we have specific conditions around returns and exchanges. Please read the policy carefully before placing your order."
  },
  {
    question: "Faulty or Incorrect Items",
    answer: "If your item is faulty, damaged on arrival, or not as ordered, you are entitled to a remedy under the Consumer Guarantees Act. Please contact us as soon as reasonably possible after delivery with your order number and supporting photos.\n\nOnce assessed, we will offer a repair, replacement, or refund where appropriate."
  },
  {
    question: "Change of Mind",
    answer: "We do not offer returns or exchanges for change of mind, including (but not limited to):\n\n• Preference changes after purchase\n• Personal taste decisions\n• Incorrect size selection\n• Ordering the wrong item\n\nThis applies to all fine jewellery due to hygiene, wearability, and the made-to-order nature of our pieces."
  },
  {
    question: "Exchanges",
    answer: "We do not offer exchanges for standard or made-to-order jewellery unless the item is confirmed to be faulty or incorrect."
  },
  {
    question: "Bespoke & Promotional Pieces",
    answer: "The following items are final sale and cannot be returned or exchanged, unless deemed faulty under the Consumer Guarantees Act.:\n\n• Partial bespoke and fully bespoke orders\n• Items with personalised specifications (including size, diamond choice, engraving, metal type, etc.)\n• Items purchased during a sale, promotion, or with a discount code"
  },
  {
    question: "Condition of Returned Items",
    answer: "Where a return is approved:\n\n• Items must be unworn, unused, and in original condition\n• Items must be returned with all original packaging\n\nWe reserve the right to refuse a return if the item shows signs of wear, damage, or alteration"
  },
  {
    question: "Refund Processing",
    answer: "Approved refunds will be processed to the original payment method only. Please allow 5–10 business days for the refund to appear, depending on your payment provider.\n\nShipping fees are non-refundable unless the item is confirmed faulty or incorrect."
  }
];