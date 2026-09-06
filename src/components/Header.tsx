import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Lock, 
  FileText, 
  Globe, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBulkInquiry: (productName?: string) => void;
  onOpenSecurityModal: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currency: 'USD' | 'EUR' | 'GBP';
  onCurrencyChange: (curr: 'USD' | 'EUR' | 'GBP') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenBulkInquiry,
  onOpenSecurityModal,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  currency,
  onCurrencyChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Catalog' },
    { id: 'jackets', label: 'Jackets' },
    { id: 'pants', label: 'Kevlar Pants' },
    { id: 'gloves', label: 'Riding Gloves' },
    { id: 'hoodies-shirts', label: 'Hoodies & Shirts' },
    { id: 'armor', label: 'CE Armor' },
    { id: 'rain-gear', label: 'Rain Gear' },
    { id: 'fashion-leather', label: 'Leather Wear' }
  ];

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    setMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReviewsClick = () => {
    setMobileMenuOpen(false);
    const reviewsEl = document.getElementById('reviews-section');
    if (reviewsEl) {
      reviewsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCustomizationClick = () => {
    setMobileMenuOpen(false);
    const oemEl = document.getElementById('oem-customization-section');
    if (oemEl) {
      oemEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-[#0F172A] border-b border-slate-800 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-4">
            <a 
              href="tel:+923249981194" 
              className="flex items-center space-x-1.5 hover:text-blue-400 transition-colors font-medium text-slate-300"
              title="Call Ally Impex Export Desk"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+92 324 9981194</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href="mailto:allyimpex1@gmail.com" 
              className="hidden sm:flex items-center space-x-1.5 hover:text-blue-400 transition-colors text-slate-300"
              title="Direct Export Department"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>allyimpex1@gmail.com</span>
            </a>
            <span className="text-slate-700 hidden md:inline">|</span>
            <span className="hidden md:inline text-slate-400">
              Sialkot Industrial Zone • CE & ISO 9001 Certified Manufacturer
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Direct WhatsApp Quick Chat */}
            <a
              href="https://wa.me/923249981194?text=Hello%20Ally%20Impex,%20I%20am%20inquiring%20about%20motorcycle%20gear%20bulk%20orders."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-700/50"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Us</span>
            </a>

            {/* Enterprise Security Console Trigger Button */}
            <button
              onClick={onOpenSecurityModal}
              id="security-modal-trigger-btn"
              className="flex items-center space-x-1 text-slate-200 hover:text-blue-400 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded px-2.5 py-0.5 transition-all cursor-pointer font-medium"
              title="View SSL, SIEM Log Monitoring & 2FA Status"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">SSL 256-Bit</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-mono">SIEM Active</span>
            </button>

            {/* Currency Selector */}
            <div className="flex items-center space-x-1 border-l border-slate-800 pl-2">
              <Globe className="w-3 h-3 text-slate-500" />
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as 'USD' | 'EUR' | 'GBP')}
                className="bg-transparent text-slate-300 text-xs focus:outline-none focus:text-blue-400 cursor-pointer"
              >
                <option value="USD" className="bg-slate-900 text-slate-200">USD ($)</option>
                <option value="EUR" className="bg-slate-900 text-slate-200">EUR (€)</option>
                <option value="GBP" className="bg-slate-900 text-slate-200">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleCategoryClick('all')} 
              className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-bold text-2xl tracking-[-0.5px] text-[#0F172A] flex items-center font-['Helvetica_Neue',Arial,sans-serif]">
                  ALLY<span className="text-blue-600 ml-1.5">IMPEX</span>
                </span>
                <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Motorcycle Protective Gear & Apparel
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Cordura jackets, Kevlar jeans, race gloves, armor..."
                className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-800"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons & Bulk CTA */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Icon toggle for tablet/mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
              title="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Bulk Inquiry Button */}
            <button
              onClick={() => onOpenBulkInquiry()}
              id="header-bulk-inquiry-btn"
              className="hidden md:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-sm transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Bulk Order Quote</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              id="header-cart-btn"
              className="relative p-2.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-600 transition-all cursor-pointer shadow-xs"
              title="View Shopping Cart & Checkout"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-600 lg:hidden focus:outline-none"
              title="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="lg:hidden pb-3 pt-1">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products, materials, specs..."
                className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>
        )}

        {/* Desktop Category Navigation Pills */}
        <div className="hidden lg:flex items-center space-x-1.5 py-2.5 border-t border-slate-200 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <div className="h-4 w-px bg-slate-200 mx-2" />
          <button
            onClick={handleCustomizationClick}
            className="px-3 py-1.5 rounded-md text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 whitespace-nowrap transition-all cursor-pointer"
          >
            OEM Custom Printing & Embroidery
          </button>
          <button
            onClick={handleReviewsClick}
            className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 whitespace-nowrap transition-all cursor-pointer"
          >
            Buyer Reviews (4.9/5)
          </button>
          <button
            onClick={onOpenSecurityModal}
            className="px-3 py-1.5 rounded-md text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Security & Compliance</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-lg">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1">Product Categories</p>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{cat.label}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBulkInquiry();
              }}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm flex items-center justify-center space-x-2 shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>Submit Bulk Order Inquiry</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSecurityModal();
              }}
              className="w-full py-2.5 px-4 bg-slate-50 text-slate-700 font-semibold rounded-lg text-sm flex items-center justify-center space-x-2 border border-slate-200"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Enterprise Security Protocols</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 space-y-1.5 px-2">
            <p className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>+92 324 9981194</span>
            </p>
            <p className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>allyimpex1@gmail.com</span>
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
