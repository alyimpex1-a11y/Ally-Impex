import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  ShieldCheck, 
  Star, 
  ShoppingCart, 
  FileText, 
  Check, 
  Truck, 
  Info, 
  Share2, 
  CheckCircle2, 
  PhoneCall 
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  currency: 'USD' | 'EUR' | 'GBP';
  onAddToCart: (product: Product, size: string, color: string, qty: number, isSample: boolean) => void;
  onOpenBulkInquiry: (productName: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  currency,
  onAddToCart,
  onOpenBulkInquiry
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Black');
  const [isSample, setIsSample] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(product.moq);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const handleToggleSample = (sampleMode: boolean) => {
    setIsSample(sampleMode);
    if (sampleMode) {
      setQuantity(1);
    } else {
      setQuantity(product.moq);
    }
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity, isSample);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const currentPricePerUnit = isSample ? product.samplePrice : product.price;
  const totalPrice = currentPricePerUnit * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-900 max-h-[92vh] flex flex-col">
        
        {/* Header Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F8FAFC]">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded">
              {product.sku}
            </span>
            <span className="text-xs text-blue-600 font-semibold">
              {product.categoryLabel}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F8FAFC] border border-slate-200">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs text-slate-800 font-medium border border-slate-200 flex items-center space-x-1.5 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{product.protectionRating}</span>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex space-x-2 overflow-x-auto pb-1">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === img ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Quality & Incoterm Highlights */}
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-slate-600">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Shipping terms: FOB Karachi / CIF European & US Ports / DDP Express by DHL/FedEx</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Custom OEM labeling, private packaging, and barcode hangtags available.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specs & Ordering Options */}
          <div className="md:col-span-6 space-y-5">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-sm font-bold ml-1 text-slate-900">{product.rating}</span>
                </div>
                <span className="text-xs text-slate-500">({product.reviewsCount} international buyer ratings)</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 leading-snug font-['Helvetica_Neue',Arial,sans-serif]">
                {product.name}
              </h2>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Order Mode Toggle: Bulk Production vs Sample Unit */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 grid grid-cols-2 gap-1 text-xs font-semibold">
              <button
                onClick={() => handleToggleSample(false)}
                className={`py-2 rounded-lg transition-all text-center cursor-pointer ${
                  !isSample 
                    ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200/60' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Production Batch (MOQ {product.moq} pcs)
              </button>
              <button
                onClick={() => handleToggleSample(true)}
                className={`py-2 rounded-lg transition-all text-center cursor-pointer ${
                  isSample 
                    ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200/60' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sample Prototype (1-5 pcs)
              </button>
            </div>

            {/* Price Calculation Box */}
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-xs text-slate-500 block">
                  {isSample ? 'Sample Unit Rate' : 'B2B Wholesale Price'}
                </span>
                <span className="text-2xl font-bold text-blue-600 font-['Helvetica_Neue',Arial,sans-serif]">
                  {formatCurrency(currentPricePerUnit, currency)}
                </span>
                <span className="text-xs text-slate-500 ml-1">/ piece</span>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Total ({quantity} units)</span>
                <span className="text-xl font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">
                  {formatCurrency(totalPrice, currency)}
                </span>
              </div>
            </div>

            {/* Color selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Select Color: <span className="text-blue-600">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      selectedColor === c
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Select Sizing: <span className="text-blue-600">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Quantity {isSample ? '(Prototypes 1-5)' : `(MOQ Minimum: ${product.moq})`}
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(isSample ? 1 : product.moq, quantity - (isSample ? 1 : 5)))}
                    className="px-3 py-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 text-base font-bold cursor-pointer rounded-l-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center bg-transparent text-sm font-bold text-slate-900 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + (isSample ? 1 : 5))}
                    className="px-3 py-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 text-base font-bold cursor-pointer rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-emerald-600 font-medium">
                  {quantity >= 100 ? '🎉 Eligible for 10% Volume Freight Rebate' : ''}
                </span>
              </div>
            </div>

            {/* Features list */}
            <div>
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Manufacturing Specifications:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  id="modal-add-to-cart-btn"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add {quantity} Pcs to Cart</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBulkInquiry(product.name);
                  }}
                  id="modal-inquire-btn"
                  className="bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl text-sm flex items-center space-x-2 border border-slate-300 shadow-xs transition-colors cursor-pointer"
                  title="Request Custom Tech Pack Quotation"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Inquire OEM</span>
                </button>
              </div>

              {addedNotice && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center space-x-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Successfully added to Cart! Open cart to review or proceed to secure checkout.</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Modal Footer Quick Contact */}
        <div className="px-6 py-3 bg-[#F8FAFC] border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
          <span>Need custom logo printing or specific CE compliance testing?</span>
          <a
            href="https://wa.me/923249981194"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center space-x-1 font-medium"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Direct WhatsApp: +92 324 9981194</span>
          </a>
        </div>

      </div>
    </div>
  );
};
