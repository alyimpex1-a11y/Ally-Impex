import React from 'react';
import { Product } from '../types';
import { ShieldCheck, Star, ShoppingCart, FileText, Eye, Layers } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  currency: 'USD' | 'EUR' | 'GBP';
  onAddToCart: (product: Product, size: string, color: string, qty: number, isSample: boolean) => void;
  onOpenBulkInquiry: (productName: string) => void;
  onOpenQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onAddToCart,
  onOpenBulkInquiry,
  onOpenQuickView
}) => {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden shadow-xs hover:-translate-y-0.5">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isBestseller && (
            <span className="bg-[#E0F2FE] text-[#0369A1] border border-blue-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              New Model
            </span>
          )}
          <span className="bg-white/95 backdrop-blur-md text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200 shadow-xs">
            MOQ: {product.moq} Pcs
          </span>
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={() => onOpenQuickView(product)}
          className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 cursor-pointer shadow-md"
          title="Quick View Specs"
        >
          <Eye className="w-5 h-5" />
        </button>

        {/* Safety Protection Tag */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
          <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-slate-800 bg-white/95 px-2 py-0.5 rounded backdrop-blur-sm border border-slate-200 shadow-xs">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            <span className="truncate max-w-[170px]">{product.protectionRating.split(' ')[0]} {product.protectionRating.split(' ')[1] || 'Certified'}</span>
          </span>

          <div className="flex items-center space-x-1 text-slate-700 bg-white/95 px-1.5 py-0.5 rounded backdrop-blur-sm text-[11px] border border-slate-200 shadow-xs">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-900">{product.rating}</span>
            <span className="text-slate-500">({product.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex justify-between items-center text-xs text-slate-500 font-mono mb-1">
            <span>{product.sku}</span>
            <span className="text-blue-600 font-semibold">{product.categoryLabel}</span>
          </div>

          <h3 
            onClick={() => onOpenQuickView(product)}
            className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1 font-['Helvetica_Neue',Arial,sans-serif]"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
            {product.material}
          </p>
        </div>

        {/* Key Features Bullet Points */}
        <div className="space-y-1 text-[11px] text-slate-600 border-t border-slate-100 pt-2.5">
          {product.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start space-x-1.5">
              <span className="text-blue-600 font-bold">•</span>
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>

        {/* Price and Action Section */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-lg font-bold text-blue-600 font-['Helvetica_Neue',Arial,sans-serif]">
                {formatCurrency(product.price, currency)}
              </span>
              <span className="text-[10px] text-slate-400 uppercase">/ bulk</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Sample: {formatCurrency(product.samplePrice, currency)}
            </p>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => onOpenBulkInquiry(product.name)}
              className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-blue-600 border border-slate-200 transition-colors cursor-pointer"
              title="Request Bulk Quote for this model"
            >
              <FileText className="w-4 h-4" />
            </button>

            <button
              onClick={() => onAddToCart(product, product.sizes[0], product.colors[0], product.moq, false)}
              className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg text-xs shadow-xs transition-all cursor-pointer"
              title={`Add Batch of ${product.moq} to Cart`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add MOQ</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
