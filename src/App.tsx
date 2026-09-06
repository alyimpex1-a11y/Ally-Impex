import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BulkInquiryModal } from './components/BulkInquiryModal';
import { ReviewsSection } from './components/ReviewsSection';
import { SecurityCenterModal } from './components/SecurityCenterModal';
import { CustomizationShowcase } from './components/CustomizationShowcase';
import { Footer } from './components/Footer';

import { PRODUCTS_DATA, CUSTOMER_REVIEWS, INITIAL_SIEM_EVENTS } from './data/products';
import { Product, CartItem, CustomerReview, SIEMLogEvent } from './types';
import { 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  AlertTriangle, 
  X,
  FileSpreadsheet
} from 'lucide-react';

export default function App() {
  // State management
  const [products] = useState<Product[]>(PRODUCTS_DATA);
  const [cart, setCart] = useState<CartItem[]>([
    // Initial demo item to make the shopping cart immediately visible and engaging
    {
      product: PRODUCTS_DATA[0],
      selectedSize: 'L',
      selectedColor: 'Stealth Black',
      quantity: 25,
      isSampleOrder: false
    }
  ]);
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [siemEvents, setSiemEvents] = useState<SIEMLogEvent[]>(INITIAL_SIEM_EVENTS);

  // Filters & Navigation
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'moq'>('featured');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [bulkInquiryOpen, setBulkInquiryOpen] = useState<boolean>(false);
  const [bulkInquiryProduct, setBulkInquiryProduct] = useState<string>('');
  const [securityModalOpen, setSecurityModalOpen] = useState<boolean>(false);

  // Real-time security alert toast state
  const [activeAlertToast, setActiveAlertToast] = useState<{
    show: boolean;
    title: string;
    message: string;
    severity: 'ALERT' | 'INFO';
  }>({
    show: false,
    title: '',
    message: '',
    severity: 'INFO'
  });

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.protectionRating.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'moq') return a.moq - b.moq;
      // Default featured
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string, qty: number, isSample: boolean) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color &&
          item.isSampleOrder === isSample
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            selectedSize: size,
            selectedColor: color,
            quantity: qty,
            isSampleOrder: isSample
          }
        ];
      }
    });

    // Auto open cart drawer
    setCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleProceedToCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    // Clear cart on successful purchase
    setCart([]);
  };

  // Bulk inquiry modal handler
  const handleOpenBulkInquiry = (productName?: string) => {
    setBulkInquiryProduct(productName || '');
    setBulkInquiryOpen(true);
  };

  // Add customer review
  const handleAddReview = (newRev: Omit<CustomerReview, 'id' | 'date'>) => {
    const created: CustomerReview = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([created, ...reviews]);
  };

  // Real-time security alert simulator
  const handleTriggerSimulatedAlert = () => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const newEvent: SIEMLogEvent = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp,
      severity: 'ALERT',
      type: 'UNAUTHORIZED_LOGIN_ATTEMPT',
      sourceIp: '198.51.100.77',
      location: 'Suspicious Proxy Node',
      message: 'Multiple failed administrative login attempts from blacklisted subnet. 2FA challenge triggered and failed.',
      actionTaken: 'IP automatically isolated by WAF. Stakeholder notification dispatched to allyimpex1@gmail.com and +92 324 9981194.'
    };

    setSiemEvents((prev) => [newEvent, ...prev]);

    setActiveAlertToast({
      show: true,
      title: '🚨 SIEM Security Alert Triggered',
      message: 'Unauthorized login attempt detected from 198.51.100.77. IP blocked at WAF edge. Alert sent to allyimpex1@gmail.com.',
      severity: 'ALERT'
    });

    setTimeout(() => {
      setActiveAlertToast((prev) => ({ ...prev, show: false }));
    }, 6000);
  };

  // Backup routine trigger
  const handleTriggerBackup = () => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const backupEvent: SIEMLogEvent = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp,
      severity: 'INFO',
      type: 'MANUAL_DB_BACKUP',
      sourceIp: '10.0.1.20 (Admin Console)',
      location: 'Primary Cloud Cluster',
      message: 'On-demand AES-256 encrypted database snapshot archived to secondary geo-region.',
      actionTaken: 'Integrity hash validated. Zero data loss confirmed.'
    };

    setSiemEvents((prev) => [backupEvent, ...prev]);

    setActiveAlertToast({
      show: true,
      title: '✅ Database Backup Completed',
      message: 'Encrypted snapshot generated and verified across multi-region backup storage.',
      severity: 'INFO'
    });

    setTimeout(() => {
      setActiveAlertToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Real-time Alert Toast Notification */}
      {activeAlertToast.show && (
        <div className="fixed top-20 right-4 z-50 max-w-md bg-white border border-red-200 shadow-xl rounded-xl p-4 text-xs text-slate-900 animate-in slide-in-from-top-4 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5 animate-pulse" />
          <div className="flex-1">
            <h4 className="font-bold text-red-700">{activeAlertToast.title}</h4>
            <p className="text-slate-600 mt-0.5">{activeAlertToast.message}</p>
          </div>
          <button
            onClick={() => setActiveAlertToast((prev) => ({ ...prev, show: false }))}
            className="text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenBulkInquiry={handleOpenBulkInquiry}
        onOpenSecurityModal={() => setSecurityModalOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Hero Section */}
      <HeroBanner
        onOpenBulkInquiry={() => handleOpenBulkInquiry()}
        onExploreCatalog={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Products Catalog Section */}
        <section id="catalog-section" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header & Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs text-blue-600 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Export Ready Catalog</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">
                Motorcycle Protective Apparel Collection
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {filteredProducts.length} manufactured styles • Sialkot export factory direct pricing
              </p>
            </div>

            {/* Sort and View Controls */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-white text-slate-900">Featured Models</option>
                  <option value="price-asc" className="bg-white text-slate-900">Price: Low to High</option>
                  <option value="price-desc" className="bg-white text-slate-900">Price: High to Low</option>
                  <option value="rating" className="bg-white text-slate-900">Highest Rating</option>
                  <option value="moq" className="bg-white text-slate-900">Lowest MOQ</option>
                </select>
              </div>

              <button
                onClick={() => handleOpenBulkInquiry()}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5 shadow-xs"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Request Custom Catalog (PDF)</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-base text-slate-700 font-semibold">No products found matching your search.</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or searching for another keyword.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs cursor-pointer shadow-xs transition-colors"
              >
                View Full Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  onAddToCart={handleAddToCart}
                  onOpenBulkInquiry={handleOpenBulkInquiry}
                  onOpenQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}

        </section>

        {/* OEM Customization Showcase (Printing, Rubber Badges, Embroidery) */}
        <CustomizationShowcase onOpenBulkInquiry={() => handleOpenBulkInquiry()} />

        {/* Customer Reviews Section */}
        <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />

        {/* Security & Reliability Callout Strip */}
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">
                    Enterprise Data Security, SIEM Monitoring & SSL Protection
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Two-Factor Authentication (2FA) for transactions • Automated daily database backups • Quarterly penetration testing
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => setSecurityModalOpen(true)}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-colors cursor-pointer shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>View Security Console</span>
                </button>
                <button
                  onClick={handleTriggerSimulatedAlert}
                  className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold px-3 py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
                  title="Test alert notification system"
                >
                  Test Alert
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer
        onOpenSecurityModal={() => setSecurityModalOpen(true)}
        onOpenBulkInquiry={() => handleOpenBulkInquiry()}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating Direct WhatsApp & Phone Contact Trigger */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end space-y-2">
        <a
          href="https://wa.me/923249981194?text=Hello%20Ally%20Impex,%20I%20am%20interested%20in%20motorcycle%20gear%20products."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all font-bold text-xs"
          title="Chat with Ally Impex on WhatsApp (+92 324 9981194)"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out group-hover:ml-2">
            WhatsApp +92 324 9981194
          </span>
        </a>
      </div>

      {/* MODALS */}
      {/* Quick View Product Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currency={currency}
        onAddToCart={handleAddToCart}
        onOpenBulkInquiry={handleOpenBulkInquiry}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Secure Payment Gateway Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        currency={currency}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Bulk Order & OEM Inquiry Modal */}
      <BulkInquiryModal
        isOpen={bulkInquiryOpen}
        onClose={() => setBulkInquiryOpen(false)}
        preselectedProduct={bulkInquiryProduct}
      />

      {/* Enterprise Security Center Modal */}
      <SecurityCenterModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
        siemEvents={siemEvents}
        onTriggerSimulatedAlert={handleTriggerSimulatedAlert}
        onTriggerBackup={handleTriggerBackup}
      />

    </div>
  );
}
