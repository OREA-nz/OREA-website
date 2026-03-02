
import { FAQItem, NavLink } from '../../types/common';

export const NAV_LINKS: NavLink[] = [
  { label: 'Collections', href: '#' },
  { label: 'The Lab', href: '#' },
  { label: 'Bespoke', href: '#' },
  { label: 'About', href: '#' },
];

export const SHIPPING_FAQ: FAQItem[] = [
  {
    question: "Where do you ship to?",
    answer: "We currently ship within New Zealand and to selected international destinations.\n\nIf your country is not listed at checkout, please contact us and we will do our best to assist."
  },
  {
    question: "How much does shipping cost?",
    answer: "New Zealand: Complimentary insured shipping on all orders.\n\nInternational: Shipping costs are calculated at checkout based on destination and service level."
  },
  {
    question: "When will I get my order?",
    answer: "We will work quickly to ship your order as soon as possible.\n\nReady-to-ship pieces: Dispatched within 2–3 business days.\n\nMade-to-order & bespoke pieces: Typically require 2–8 weeks for production before dispatch.\n\nOnce your order has been dispatched, delivery typically takes 4-12 business days. Delivery times may vary depending on your location, customs clearance, and local courier services."
  },
  {
    question: "What if my parcel is delayed?",
    answer: "While we work closely with trusted couriers, delays can occasionally occur due to weather, customs processing, or peak periods.\n\nIf your parcel has not arrived within the expected timeframe, please contact us and we will assist in tracking your order."
  },
  {
    question: "What if my order is lost or damaged in transit?",
    answer: "All shipments are fully insured. Please notify us as soon as possible so we can find a resolution as quickly as possible."
  },
  {
    question: "Can I change my delivery address after placing an order?",
    answer: "If your order has not yet been dispatched, we may be able to update the delivery address.\n\nPlease contact us as soon as possible. Once an order has been shipped, address changes may not be possible."
  },
  {
    question: "How is my jewellery packaged?",
    answer: "All ORÉA pieces are delivered in luxury, discreet packaging, designed for both protection and gifting."
  },
  {
    question: "Need your order sooner?",
    answer: "Have a special date or tight timeframe? Contact us before placing your order and we’ll do our best to accommodate urgent requests, subject to production availability."
  }
];
