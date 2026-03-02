import { useState, useCallback } from 'react';
import {
  SHOPIFY_CONFIG,
  shopifyFetch,
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_CREATE,
  CUSTOMER_RECOVER,
  GET_CUSTOMER,
  GET_CUSTOMER_ORDERS,
} from '../lib/shopify';

/* ── Types ──────────────────────────────────────────────────── */

export interface ShopifyCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  defaultAddress?: {
    address1: string;
    city: string;
    province: string;
    zip: string;
    country: string;
  };
}

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: { amount: string; currencyCode: string };
  lineItems: {
    edges: {
      node: {
        title: string;
        quantity: number;
        variant?: {
          image?: { url: string; altText?: string };
          price: { amount: string; currencyCode: string };
        };
      };
    }[];
  };
}

/* ── Hook ───────────────────────────────────────────────────── */

export function useShopifyAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem('orea_customer_token'),
  );
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(null);
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const isLive = SHOPIFY_CONFIG.isConfigured;

  /* Sign In -------------------------------------------------- */
  const shopifySignIn = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (!isLive) return false;
    setLoading(true);
    try {
      const data = await shopifyFetch<{
        customerAccessTokenCreate: {
          customerAccessToken: { accessToken: string; expiresAt: string } | null;
          customerUserErrors: { message: string }[];
        };
      }>(CUSTOMER_ACCESS_TOKEN_CREATE, { input: { email, password } });

      const token = data.customerAccessTokenCreate.customerAccessToken?.accessToken;
      if (!token) return false;

      setAccessToken(token);
      localStorage.setItem('orea_customer_token', token);

      // Fetch profile immediately
      const profile = await shopifyFetch<{ customer: ShopifyCustomer }>(GET_CUSTOMER, { token });
      if (profile.customer) setCustomer(profile.customer);

      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  }, [isLive]);

  /* Sign Up -------------------------------------------------- */
  const shopifySignUp = useCallback(async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    if (!isLive) return false;
    setLoading(true);
    try {
      const createData = await shopifyFetch<{
        customerCreate: {
          customer: { id: string } | null;
          customerUserErrors: { message: string }[];
        };
      }>(CUSTOMER_CREATE, { input: { firstName, lastName, email, password } });

      if (!createData.customerCreate.customer) return false;

      // Auto-login after sign up
      return await shopifySignIn(email, password);
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  }, [isLive, shopifySignIn]);

  /* Get Profile ---------------------------------------------- */
  const getCustomerProfile = useCallback(async (token?: string): Promise<ShopifyCustomer | null> => {
    const t = token || accessToken;
    if (!isLive || !t) return null;
    setLoading(true);
    try {
      const data = await shopifyFetch<{ customer: ShopifyCustomer }>(GET_CUSTOMER, { token: t });
      if (data.customer) {
        setCustomer(data.customer);
        return data.customer;
      }
      return null;
    } catch {
      // Token expired — clear it
      setAccessToken(null);
      localStorage.removeItem('orea_customer_token');
      return null;
    } finally {
      setLoading(false);
    }
  }, [isLive, accessToken]);

  /* Get Orders ----------------------------------------------- */
  const getOrderHistory = useCallback(async (first = 10): Promise<ShopifyOrder[]> => {
    if (!isLive || !accessToken) return [];
    setLoading(true);
    try {
      const data = await shopifyFetch<{
        customer: { orders: { edges: { node: ShopifyOrder }[] } };
      }>(GET_CUSTOMER_ORDERS, { token: accessToken, first });
      const list = data.customer.orders.edges.map((e) => e.node);
      setOrders(list);
      return list;
    } catch {
      return [];
    } finally {
      setLoading(false);
    }
  }, [isLive, accessToken]);

  /* Password Recovery ---------------------------------------- */
  const shopifyRecoverPassword = useCallback(async (email: string): Promise<boolean> => {
    if (!isLive) return false;
    setLoading(true);
    try {
      const data = await shopifyFetch<{
        customerRecover: {
          customerUserErrors: { code: string; field: string[]; message: string }[];
        };
      }>(CUSTOMER_RECOVER, { email });
      return data.customerRecover.customerUserErrors.length === 0;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  }, [isLive]);

  /* Sign Out ------------------------------------------------- */
  const shopifySignOut = useCallback(() => {
    setAccessToken(null);
    setCustomer(null);
    setOrders([]);
    localStorage.removeItem('orea_customer_token');
  }, []);

  return {
    accessToken,
    customer,
    orders,
    loading,
    isLive,
    shopifySignIn,
    shopifySignUp,
    shopifyRecoverPassword,
    getCustomerProfile,
    getOrderHistory,
    shopifySignOut,
  };
}
