import React, { useState } from 'react';
import { CartItem } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  Check, 
  Truck 
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'USD' | 'EUR' | 'GBP';
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');
  const [shippingMethod, setShippingMethod] = useState<'AIR' | 'SEA'>('AIR');

  if (!isOpen) return null;

  // Calculate items subtotal
  const subtotal = items.reduce((sum, item) => {
    const rate = item.isSampleOrder ? item.product.samplePrice : item.product.price;
    return sum + (rate * item.quantity);
  }, 0);

  // Total item count
  const totalPieces = items.reduce((sum, item) => sum + item.quantity, 0);

  // Automatic Volume Tier Discount for large B2B orders
  let volumeTierDiscountPercent = 0;
  if (totalPieces >= 500) {
    volumeTierDiscountPercent = 12; // 12% off for 500+ pcs
  } else if (totalPieces >= 100) {
    volumeTierDiscountPercent = 5; // 5% off for 100+ pcs
  }

  const effectiveDiscountPercent = Math.max(volumeTierDiscountPercent, appliedDiscountPercent);
  const discountAmount = (subtotal * effectiveDiscountPercent) / 100;

  // Estimated export shipping
  const shippingCost = items.length === 0 ? 0 : shippingMethod === 'AIR' ? Math.max(45, totalPieces * 1.5) : Math.max(120, totalPieces * 0.4);

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'EXPORT10' || code === 'ALLY2025' || code === 'MIRS10') {
      setAppliedDiscountPercent(10);
      setPromoMessage('Valid code: 10% B2B Export Discount applied!');
    } else if (code === 'FIRSTSAMPLE') {
      setAppliedDiscountPercent(15);
      setPromoMessage('Valid code: 15% Sample Prototyping Discount applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try EXPORT10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white border-l border-slate-200 text-slate-900 flex flex-col shadow-2xl">
          
          {/* Cart Header */}
          <div className="px-6 py-5 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">Your Export Cart</h2>
                <p className="text-xs text-slate-500 font-mono">
                  {items.length} product lines • {totalPieces} total units
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Your Cart is Empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore our catalog of CE-certified motorcycle jackets, Kevlar jeans, riding gloves, and armor to add samples or bulk production batches.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-xs transition-all cursor-pointer shadow-xs"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              items.map((item, idx) => {
                const unitPrice = item.isSampleOrder ? item.product.samplePrice : item.product.price;
                const lineTotal = unitPrice * item.quantity;

                return (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-white border border-slate-200 flex space-x-3.5 items-start shadow-xs hover:border-slate-300 transition-all"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover bg-slate-50 shrink-0 border border-slate-200"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-slate-900 truncate pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600">
                        <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          Size: <strong className="text-slate-900">{item.selectedSize}</strong>
                        </span>
                        <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          Color: <strong className="text-slate-900">{item.selectedColor}</strong>
                        </span>
                        {item.isSampleOrder ? (
                          <span className="bg-blue-50 text-blue-700 font-semibold px-1.5 py-0.5 rounded text-[10px] border border-blue-200">
                            Sample
                          </span>
                        ) : (
                          <span className="bg-emerald-50 text-emerald-700 font-semibold px-1.5 py-0.5 rounded text-[10px] border border-emerald-200">
                            Bulk Batch
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white shadow-xs">
                          <button
                            onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - (item.isSampleOrder ? 1 : 5)))}
                            className="p-1 hover:text-blue-600 text-slate-500 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + (item.isSampleOrder ? 1 : 5))}
                            className="p-1 hover:text-blue-600 text-slate-500 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line price */}
                        <div className="text-right">
                          <p className="text-xs font-bold text-blue-600 font-['Helvetica_Neue',Arial,sans-serif]">
                            {formatCurrency(lineTotal, currency)}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {formatCurrency(unitPrice, currency)} / ea
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* B2B Volume Discount Tier Progress */}
            {items.length > 0 && (
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 space-y-1.5 shadow-xs">
                <div className="flex justify-between font-semibold text-blue-700">
                  <span>B2B Volume Tier Status</span>
                  <span>{totalPieces} / 500 pcs</span>
                </div>
                <div className="w-full bg-blue-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (totalPieces / 500) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-600">
                  {totalPieces >= 500
                    ? '🏆 Congratulations! Maximum Tier Discount (12% OFF) activated.'
                    : totalPieces >= 100
                    ? '⭐️ 5% Tier discount active. Add more units to reach 500 pcs for 12% off!'
                    : 'Tip: Orders over 100 units receive an automated 5% factory discount.'}
                </p>
              </div>
            )}
          </div>

          {/* Cart Footer & Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-[#F8FAFC] border-t border-slate-200 space-y-4">
              
              {/* Promo code input */}
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon (e.g. EXPORT10)"
                    className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 transition-colors cursor-pointer shadow-xs"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-[11px] ${appliedDiscountPercent > 0 ? 'text-emerald-600 font-semibold' : 'text-blue-600'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Shipping Logistics Mode */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                  Export Freight Method:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setShippingMethod('AIR')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all shadow-xs ${
                      shippingMethod === 'AIR'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Air Express (DHL)</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">4-7 Days Delivery</span>
                  </button>

                  <button
                    onClick={() => setShippingMethod('SEA')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all shadow-xs ${
                      shippingMethod === 'SEA'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Sea Freight (FOB)</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">Economical Container</span>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Subtotal ({totalPieces} units)</span>
                  <span className="text-slate-900 font-semibold font-mono">{formatCurrency(subtotal, currency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({effectiveDiscountPercent}%)</span>
                    <span>-{formatCurrency(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Est. Freight ({shippingMethod === 'AIR' ? 'Air Express' : 'Sea Freight'})</span>
                  <span className="text-slate-900 font-semibold font-mono">{formatCurrency(shippingCost, currency)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-base font-bold text-slate-900">
                  <span>Total Due</span>
                  <span className="text-xl font-bold text-blue-600 font-['Helvetica_Neue',Arial,sans-serif]">
                    {formatCurrency(grandTotal, currency)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={onProceedToCheckout}
                  id="cart-proceed-checkout-btn"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">256-Bit SSL Encrypted Gateway</span>
                  </div>
                  <button
                    onClick={onClearCart}
                    className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
