import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useShopifyAuth, ShopifyCustomer, ShopifyOrder } from '../hooks/useShopifyAuth';

/* ── Types ──────────────────────────────────────────────────── */

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  orders: ShopifyOrder[];
  loading: boolean;
  isShopifyLive: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  recoverPassword: (email: string) => Promise<boolean>;
  signOut: () => void;
  fetchOrders: () => Promise<ShopifyOrder[]>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/* ── Provider ───────────────────────────────────────────────── */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const shopify = useShopifyAuth();
  const [demoUser, setDemoUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('orea_demo_user');
    return stored ? JSON.parse(stored) : null;
  });

  // Rehydrate Shopify customer on mount if token exists
  useEffect(() => {
    if (shopify.isLive && shopify.accessToken && !shopify.customer) {
      shopify.getCustomerProfile();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Derive user from either Shopify or demo */
  const toUser = (c: ShopifyCustomer): User => ({
    firstName: c.firstName,
    lastName: c.lastName,
    email: c.email,
    phone: c.phone,
  });

  const user: User | null = shopify.customer ? toUser(shopify.customer) : demoUser;

  /* Sign In -------------------------------------------------- */
  const signIn = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (shopify.isLive) {
      return shopify.shopifySignIn(email, password);
    }
    // Demo mode
    const stored = localStorage.getItem('orea_demo_accounts');
    const accounts: Record<string, { password: string; firstName: string; lastName: string }> = stored ? JSON.parse(stored) : {};
    const acct = accounts[email];
    if (acct && acct.password === password) {
      const u: User = { firstName: acct.firstName, lastName: acct.lastName, email };
      setDemoUser(u);
      localStorage.setItem('orea_demo_user', JSON.stringify(u));
      return true;
    }
    return false;
  }, [shopify]);

  /* Sign Up -------------------------------------------------- */
  const signUp = useCallback(async (
    firstName: string, lastName: string, email: string, password: string,
  ): Promise<boolean> => {
    if (shopify.isLive) {
      return shopify.shopifySignUp(firstName, lastName, email, password);
    }
    // Demo mode
    const stored = localStorage.getItem('orea_demo_accounts');
    const accounts: Record<string, { password: string; firstName: string; lastName: string }> = stored ? JSON.parse(stored) : {};
    if (accounts[email]) return false; // already exists
    accounts[email] = { password, firstName, lastName };
    localStorage.setItem('orea_demo_accounts', JSON.stringify(accounts));
    const u: User = { firstName, lastName, email };
    setDemoUser(u);
    localStorage.setItem('orea_demo_user', JSON.stringify(u));
    return true;
  }, [shopify]);

  /* Password Recovery ---------------------------------------- */
  const recoverPassword = useCallback(async (email: string): Promise<boolean> => {
    if (shopify.isLive) {
      return shopify.shopifyRecoverPassword(email);
    }
    // Demo mode — pretend it worked
    return true;
  }, [shopify]);

  /* Sign Out ------------------------------------------------- */
  const signOut = useCallback(() => {
    shopify.shopifySignOut();
    setDemoUser(null);
    localStorage.removeItem('orea_demo_user');
  }, [shopify]);

  /* Fetch Orders --------------------------------------------- */
  const fetchOrders = useCallback(async (): Promise<ShopifyOrder[]> => {
    if (shopify.isLive) {
      return shopify.getOrderHistory();
    }
    return []; // demo has no orders
  }, [shopify]);

  return (
    <AuthContext.Provider value={{
      user,
      accessToken: shopify.accessToken,
      orders: shopify.orders,
      loading: shopify.loading,
      isShopifyLive: shopify.isLive,
      signIn,
      signUp,
      recoverPassword,
      signOut,
      fetchOrders,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ── Hook ───────────────────────────────────────────────────── */

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
