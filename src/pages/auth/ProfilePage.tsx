import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ShopifyOrder } from '../../hooks/useShopifyAuth';

const ProfilePage: React.FC = () => {
  const { user, signOut, fetchOrders, isShopifyLive } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  useEffect(() => {
    if (!user) {
      navigate('/auth', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (activeTab === 'orders' && isShopifyLive && orders.length === 0) {
      setLoadingOrders(true);
      fetchOrders().then((o) => {
        setOrders(o);
        setLoadingOrders(false);
      });
    }
  }, [activeTab, isShopifyLive, fetchOrders, orders.length]);

  if (!user) return null;

  const tabClass = (tab: string) =>
    `text-micro font-bold uppercase tracking-widest pb-3 border-b-2 transition-colors ${
      activeTab === tab ? 'text-orea-dark border-orea-dark' : 'text-orea-champagne border-transparent hover:text-orea-taupe'
    }`;

  return (
    <section className="min-h-[80vh] bg-orea-cream px-6 py-16">
      <div className="max-w-2xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-h2 font-light text-orea-dark tracking-wide font-serif uppercase">My Account</h1>
            <p className="text-body-sm text-orea-taupe font-light tracking-wide">
              Welcome, {user.firstName}
            </p>
          </div>
          <button
            onClick={() => { signOut(); navigate('/'); }}
            className="flex items-center gap-2 text-micro font-bold uppercase tracking-widest text-orea-taupe hover:text-orea-dark transition-colors"
          >
            <LogOut size={16} strokeWidth={1.2} />
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-orea-champagne/15">
          <button onClick={() => setActiveTab('profile')} className={tabClass('profile')}>
            Profile Details
          </button>
          <button onClick={() => setActiveTab('orders')} className={tabClass('orders')}>
            Order History
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 bg-orea-linen/30 border border-orea-champagne/10 p-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-orea-linen flex items-center justify-center">
                  <User size={24} strokeWidth={1} className="text-orea-taupe" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-body font-medium text-orea-dark tracking-wide">{user.firstName} {user.lastName}</h3>
                  <p className="text-body-sm text-orea-taupe font-light">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 p-6 border border-orea-champagne/10">
                <span className="text-micro font-bold uppercase tracking-widest text-orea-champagne">First Name</span>
                <span className="text-body-sm font-light text-orea-dark">{user.firstName}</span>
              </div>
              <div className="flex flex-col gap-2 p-6 border border-orea-champagne/10">
                <span className="text-micro font-bold uppercase tracking-widest text-orea-champagne">Last Name</span>
                <span className="text-body-sm font-light text-orea-dark">{user.lastName}</span>
              </div>
              <div className="flex flex-col gap-2 p-6 border border-orea-champagne/10 md:col-span-2">
                <span className="text-micro font-bold uppercase tracking-widest text-orea-champagne">Email</span>
                <span className="text-body-sm font-light text-orea-dark">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex flex-col gap-2 p-6 border border-orea-champagne/10 md:col-span-2">
                  <span className="text-micro font-bold uppercase tracking-widest text-orea-champagne">Phone</span>
                  <span className="text-body-sm font-light text-orea-dark">{user.phone}</span>
                </div>
              )}
            </div>

            <p className="text-micro text-orea-champagne tracking-wide">
              To update your details, please contact our{' '}
              <a href="mailto:hello@orea.co.nz" className="text-orea-taupe underline underline-offset-4 hover:text-orea-dark transition-colors">concierge team</a>.
            </p>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="flex flex-col gap-6">
            {loadingOrders ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-6 h-6 border-2 border-orea-champagne border-t-orea-dark rounded-full animate-spin" />
              </div>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="border border-orea-champagne/10 p-6 flex flex-col gap-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-body-sm font-medium text-orea-dark tracking-wide">
                        Order #{order.orderNumber}
                      </h3>
                      <p className="text-micro text-orea-champagne">
                        {new Date(order.processedAt).toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-micro font-bold uppercase tracking-widest text-orea-taupe px-3 py-1 border border-orea-champagne/20">
                        {order.fulfillmentStatus || 'Processing'}
                      </span>
                      <span className="text-body-sm font-light text-orea-dark">
                        ${parseFloat(order.totalPrice.amount).toLocaleString()} {order.totalPrice.currencyCode}
                      </span>
                    </div>
                  </div>
                  {/* Line item thumbnails */}
                  <div className="flex gap-3 flex-wrap">
                    {order.lineItems.edges.map((edge, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-orea-linen/30 p-3">
                        {edge.node.variant?.image?.url && (
                          <img src={edge.node.variant.image.url} alt={edge.node.title} className="w-12 h-12 object-cover" />
                        )}
                        <div className="flex flex-col gap-0.5">
                          <span className="text-micro font-medium text-orea-dark truncate max-w-[200px]">{edge.node.title}</span>
                          <span className="text-micro text-orea-champagne">Qty: {edge.node.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
                <Package size={40} strokeWidth={0.8} className="text-orea-champagne" />
                <div className="flex flex-col gap-2">
                  <p className="text-body font-light text-orea-taupe font-serif">No orders yet</p>
                  <p className="text-body-sm text-orea-champagne">
                    {isShopifyLive
                      ? 'Your order history will appear here once you make a purchase.'
                      : 'Order history is available when connected to Shopify.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
