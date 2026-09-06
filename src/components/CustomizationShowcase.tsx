import React from 'react';
import { Layers, Sparkles, CheckCircle2, FileSpreadsheet, ArrowRight, ShieldCheck, Printer } from 'lucide-react';

interface CustomizationShowcaseProps {
  onOpenBulkInquiry: () => void;
}

export const CustomizationShowcase: React.FC<CustomizationShowcaseProps> = ({ onOpenBulkInquiry }) => {
  const capabilities = [
    {
      title: 'Computerized Embroidery',
      description: 'Precision Japanese multi-head embroidery for team logos, club crests, and rider names with bonded fire-resistant threads.',
      tag: 'Biker Vests & Jackets'
    },
    {
      title: '3D High-Density Rubber Badges',
      description: 'Molded thermoplastic polyurethane (TPU) and high-density rubber logos offering premium dimensional tactile texture.',
      tag: 'Gloves & Armor Suits'
    },
    {
      title: 'Silk Screen & Plastisol Printing',
      description: 'Heavy pigment crack-proof plastisol printing calibrated for extreme washing resistance on hoodies, shirts, and casual garments.',
      tag: 'Hoodies & Flannel Shirts'
    },
    {
      title: 'Full All-Over Sublimation',
      description: 'Gas-permeable digital sublimation delivering photorealistic patterns and high-visibility camo prints that never fade or peel.',
      tag: 'Balaclavas & Rain Gear'
    },
    {
      title: 'Laser Embossed Leather Patches',
      description: 'Custom hot-stamped and laser-engraved vegetable tanned leather labels tailored for vintage jackets and retro riding jeans.',
      tag: 'Cowhide Leather Wear'
    },
    {
      title: 'CE Certified Custom Labeling',
      description: 'Full compliance with EU EN 17092 testing protocols including custom CE sewn-in tags, pictograms, and user instruction booklets.',
      tag: 'European Export Standard'
    }
  ];

  return (
    <section id="oem-customization-section" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-3.5 py-1 text-xs text-blue-700 font-semibold shadow-xs">
            <Printer className="w-3.5 h-3.5" />
            <span>In-House OEM & Private Labeling Facility</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight font-['Helvetica_Neue',Arial,sans-serif]">
            Custom Branding, Printing & Embroidery Solutions
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Turn your brand vision into race-ready reality. Ally Impex provides complete in-house prototyping, custom labeling, and diverse printing technologies tailored for motorcycle gear brands.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#F8FAFC] border border-slate-200 hover:border-blue-300 hover:bg-white transition-all duration-200 space-y-3 group shadow-xs"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono uppercase bg-[#E0F2FE] text-[#0369A1] font-semibold px-2 py-0.5 rounded border border-blue-200">
                  {item.tag}
                </span>
                <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-['Helvetica_Neue',Arial,sans-serif]">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* OEM Process Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#0F172A] border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-lg font-bold text-white font-['Helvetica_Neue',Arial,sans-serif]">
              Have a Proprietary Tech-Pack or Prototype Design?
            </h3>
            <p className="text-xs text-slate-300">
              Send us your vector artwork, technical sketches, and sizing requirements. Our Sialkot master pattern makers will produce physical sample prototypes in 7 to 10 days.
            </p>
          </div>

          <button
            onClick={onOpenBulkInquiry}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg text-sm shadow-sm transition-all cursor-pointer shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Upload Tech-Pack for Quotation</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
