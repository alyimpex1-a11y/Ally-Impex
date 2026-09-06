import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Lock, 
  Award, 
  ArrowUp,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  FileText
} from 'lucide-react';

interface FooterProps {
  onOpenSecurityModal: () => void;
  onOpenBulkInquiry: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSecurityModal,
  onOpenBulkInquiry,
  onSelectCategory
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs">
      
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="font-bold text-2xl tracking-[-0.5px] text-[#0F172A] font-['Helvetica_Neue',Arial,sans-serif]">
                ALLY<span className="text-blue-600 ml-1">IMPEX</span>
              </span>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              Ally Impex is an international manufacturing and export powerhouse based in Sialkot, Pakistan. Specializing in high-performance motorcycle protective apparel, DuPont™ Kevlar® jeans, Cordura jackets, leather racing gloves, and CE certified armor for global brand distributors.
            </p>

            {/* Social Media Links */}
            <div className="space-y-2 pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Connect on Social Media:
              </p>
              <div className="flex items-center space-x-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 border border-slate-200 flex items-center justify-center transition-colors shadow-xs"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 border border-slate-200 flex items-center justify-center transition-colors shadow-xs"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 border border-slate-200 flex items-center justify-center transition-colors shadow-xs"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 border border-slate-200 flex items-center justify-center transition-colors shadow-xs"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/923249981194"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200 flex items-center justify-center transition-colors shadow-xs"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('jackets')}
                  className="hover:text-blue-600 transition-colors text-slate-600"
                >
                  Motorcycle Cordura Jackets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('pants')}
                  className="hover:text-blue-600 transition-colors text-slate-600"
                >
                  DuPont™ Kevlar® Jeans & Pants
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('gloves')}
                  className="hover:text-blue-600 transition-colors text-slate-600"
                >
                  Race & Touring Gloves
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('hoodies-shirts')}
                  className="hover:text-blue-600 transition-colors text-slate-600"
                >
                  Armored Hoodies & Flannel Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('armor')}
                  className="hover:text-blue-600 transition-colors text-slate-600"
                >
                  CE Level 2 Back & Joint Armor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('rain-gear')}
                  className="hover:text-blue-600 transition-colors text-slate-600"
                >
                  Waterproof Rain Suits & Overcovers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('fashion-leather')}
                  className="hover:text-blue-600 transition-colors text-slate-600"
                >
                  Club Leather Vests & Apparel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: OEM & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              B2B Services & Export
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={onOpenBulkInquiry}
                  className="hover:text-blue-600 transition-colors flex items-center space-x-1 font-semibold text-blue-600"
                >
                  <span>Bulk Order Quotation</span>
                </button>
              </li>
              <li>
                <span>Custom Computerized Embroidery</span>
              </li>
              <li>
                <span>3D High-Density Rubber Badging</span>
              </li>
              <li>
                <span>Screen & Sublimation Printing</span>
              </li>
              <li>
                <span>Private CE Certification Tagging</span>
              </li>
              <li>
                <span>Worldwide Air & Ocean Cargo</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Contact & Export Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Export Desk Contacts
            </h4>
            
            <div className="space-y-2.5">
              <a 
                href="tel:+923249981194"
                className="flex items-start space-x-2 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-900 font-semibold">+92 324 9981194</span>
                  <span className="text-[10px] text-slate-500">Phone & WhatsApp Direct</span>
                </div>
              </a>

              <a 
                href="mailto:allyimpex1@gmail.com"
                className="flex items-start space-x-2 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-900 font-semibold">allyimpex1@gmail.com</span>
                  <span className="text-[10px] text-slate-500">Official Export Enquiries</span>
                </div>
              </a>

              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-800 font-medium">Export Industrial Zone</span>
                  <span className="text-[10px] text-slate-500">Sialkot 51310, Punjab, Pakistan</span>
                </div>
              </div>
            </div>

            {/* Enterprise Security Button */}
            <div className="pt-2">
              <button
                onClick={onOpenSecurityModal}
                className="w-full p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-600 flex items-center justify-between transition-colors cursor-pointer shadow-xs"
              >
                <div className="flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold text-[11px]">Security Protocols</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">SIEM / 2FA</span>
              </button>
            </div>
          </div>

        </div>

        {/* Certifications & Compliance Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-slate-600">
            <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-mono">
              CE EN 17092 Certified
            </span>
            <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-mono">
              ISO 9001:2015 Quality Management
            </span>
            <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-mono">
              DuPont™ Kevlar® Fabric
            </span>
            <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-mono">
              Cordura® Brand Fabric
            </span>
            <span className="bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-mono text-emerald-700 font-semibold">
              256-Bit SSL Encrypted
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Copyright & SEO info */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© 2026 Ally Impex. All Rights Reserved. OEM & ODM Motorcycle Protective Apparel Manufacturer.</p>
          <p>Email: allyimpex1@gmail.com | Phone: +92 324 9981194</p>
        </div>

      </div>
    </footer>
  );
};
