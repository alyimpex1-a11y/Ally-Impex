import React from 'react';
import { ShieldCheck, Award, Layers, Truck, ArrowRight, MessageCircle, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  onOpenBulkInquiry: () => void;
  onExploreCatalog: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenBulkInquiry, onExploreCatalog }) => {
  return (
    <div className="relative bg-[#F8FAFC] overflow-hidden border-b border-slate-200">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.08),rgba(255,255,255,0))]" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-3.5 py-1 text-xs text-blue-700 font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sialkot Premier OEM & ODM Motorbike Apparel Manufacturer</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight font-['Helvetica_Neue',Arial,sans-serif]">
              Engineered for Speed. <br />
              <span className="text-blue-600">
                Certified for Extreme Protection.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              <strong className="text-slate-900">Ally Impex</strong> produces high-performance motorcycle protective gear, Cordura jackets, DuPont™ Kevlar® reinforced jeans, leather racing gloves, and CE Level-2 armor for global motorcycle brands, racing teams, and international distributors.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-sm text-slate-700">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>CE EN 17092 (Class AA / AAA) Safety Compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Custom Embroidery, Sublimation & 3D Rubber Logos</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Low Minimum Order Quantity (MOQ from 20 pcs)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Worldwide Door-to-Door Air & Sea Export Logistics</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onOpenBulkInquiry}
                id="hero-request-quote-btn"
                className="inline-flex items-center space-x-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-lg text-base shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-5 h-5" />
                <span>Request B2B Bulk Quote</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onExploreCatalog}
                id="hero-explore-catalog-btn"
                className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 px-5 py-3.5 rounded-lg text-base font-semibold shadow-xs transition-all cursor-pointer"
              >
                <span>View Products Catalog</span>
              </button>

              <a
                href="https://wa.me/923249981194?text=Hello%20Ally%20Impex,%20I%20want%20to%20discuss%20bulk%20motorcycle%20gear%20orders."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-3.5 rounded-lg text-sm font-semibold shadow-xs transition-all"
                title="Instant WhatsApp Support"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span className="hidden sm:inline">+92 324 9981194</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </div>

            {/* Direct Contact Banner */}
            <div className="pt-2 text-xs text-slate-500 flex items-center space-x-3">
              <span>Direct Export Desk:</span>
              <span className="text-blue-600 font-semibold font-mono">allyimpex1@gmail.com</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-600 font-semibold font-mono">+92 324 9981194</span>
            </div>
          </div>

          {/* Right Hero Visual Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl group">
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80"
                  alt="Ally Impex Motorcycle Protective Gear"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg px-3 py-1.5 flex items-center space-x-2 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">CE Level 2 Approved</span>
                </div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-semibold shadow-xs">
                  DuPont™ Kevlar® Fabric
                </div>

                {/* Bottom Card Overlay Details */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-left text-white shadow-md">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Featured Export Model</p>
                      <h3 className="text-base font-bold text-white">Apex Pro Cordura 600D Tourer</h3>
                    </div>
                    <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                      MOQ: 25 Pcs
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    Equipped with Reissa® waterproof membrane, viscoelastic armor, and custom brand embossing.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Trust Indicator Pill */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <p className="text-xl font-bold text-blue-600 font-['Helvetica_Neue',Arial,sans-serif]">100%</p>
                <p className="text-[11px] text-slate-500 font-medium">Export Quality</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <p className="text-xl font-bold text-blue-600 font-['Helvetica_Neue',Arial,sans-serif]">7-10 Days</p>
                <p className="text-[11px] text-slate-500 font-medium">Sample Making</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <p className="text-xl font-bold text-blue-600 font-['Helvetica_Neue',Arial,sans-serif]">256-Bit</p>
                <p className="text-[11px] text-slate-500 font-medium">Encrypted B2B</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
