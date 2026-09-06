import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Send, 
  CheckCircle2, 
  Upload, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Calculator, 
  Layers, 
  Printer, 
  Calendar 
} from 'lucide-react';
import { BulkInquiryData } from '../types';

interface BulkInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export const BulkInquiryModal: React.FC<BulkInquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct = ''
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<BulkInquiryData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    category: 'jackets',
    productName: preselectedProduct,
    estimatedQuantity: 200,
    customizationTypes: ['Screen Printing', 'Computerized Embroidery'],
    targetDeliveryDate: '2026-10-30',
    targetPricePerUnit: '',
    shippingPort: '',
    additionalNotes: '',
    hasTechPack: false
  });

  const [techPackName, setTechPackName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const customizationOptions = [
    'Screen Printing',
    '3D High-Density Rubber Print',
    'Computerized Embroidery',
    'Sublimation Printing',
    'Embossed Leather Patches',
    'Custom CE Armor Certification Labeling',
    'Custom Barcode Hangtags & Retail Polybags'
  ];

  const toggleCustomization = (option: string) => {
    setFormData((prev) => {
      const exists = prev.customizationTypes.includes(option);
      return {
        ...prev,
        customizationTypes: exists
          ? prev.customizationTypes.filter((o) => o !== option)
          : [...prev.customizationTypes, option]
      };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTechPackName(e.target.files[0].name);
      setFormData((prev) => ({ ...prev, hasTechPack: true }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-900 flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">B2B Bulk Order & OEM Quotation Request</h2>
              <p className="text-xs text-slate-500">
                Direct to Factory Export Division • Sialkot, Pakistan
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

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {submitted ? (
            <div className="py-10 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">Inquiry Successfully Transmitted!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.contactPerson}</strong>. Your bulk inquiry for{' '}
                <strong className="text-blue-600 font-mono font-bold">{formData.estimatedQuantity} units</strong> has been submitted to the Ally Impex Export Desk.
              </p>
              <div className="p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1.5 text-left shadow-xs">
                <p>• Dispatch Target: <strong className="text-slate-900">allyimpex1@gmail.com</strong></p>
                <p>• Export Manager Direct: <strong className="text-slate-900">+92 324 9981194</strong></p>
                <p>• Response Guarantee: <strong className="text-blue-600">Within 4 - 8 Business Hours</strong></p>
              </div>

              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <a
                  href={`https://wa.me/923249981194?text=Hello%20Ally%20Impex,%20I%20just%20submitted%20a%20bulk%20inquiry%20for%20${formData.estimatedQuantity}%20units.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-xs"
                >
                  Confirm on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-2.5 rounded-xl text-xs border border-slate-300 transition-colors cursor-pointer shadow-xs"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Top info strip */}
              <div className="p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl flex flex-wrap justify-between items-center text-xs text-slate-600 gap-2 shadow-xs">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Direct Export Line: <strong className="text-slate-900">+92 324 9981194</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email: <strong className="text-slate-900">allyimpex1@gmail.com</strong></span>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Moto Supply Co."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Full name & title"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@company.com"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 20 7946 0912"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. United Kingdom, USA, Germany, Australia"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Product Line / Model</label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="e.g. Cordura Riding Jackets or Custom Kevlar Jeans"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Order Volume (Pieces) *
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      required
                      min={20}
                      step={10}
                      value={formData.estimatedQuantity}
                      onChange={(e) => setFormData({ ...formData, estimatedQuantity: parseInt(e.target.value) || 20 })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-blue-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono shadow-xs"
                    />
                    <span className="text-xs text-slate-500 shrink-0">MOQ: 20 pcs</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Delivery Deadline</label>
                  <input
                    type="date"
                    value={formData.targetDeliveryDate}
                    onChange={(e) => setFormData({ ...formData, targetDeliveryDate: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>
              </div>

              {/* Customization Printing & Techniques (Inspired by mirsintl) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider flex items-center space-x-1.5">
                  <Printer className="w-3.5 h-3.5 text-blue-600" />
                  <span>OEM Custom Branding & Printing Techniques Required:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {customizationOptions.map((opt) => {
                    const selected = formData.customizationTypes.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleCustomization(opt)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                          selected
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-500/20'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt}</span>
                        {selected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tech-Pack / Logo File Upload simulation */}
              <div className="p-3.5 rounded-xl border border-dashed border-slate-300 bg-[#F8FAFC] hover:border-blue-500 hover:bg-blue-50/30 transition-colors text-center shadow-xs">
                <label className="cursor-pointer block">
                  <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1.5" />
                  <span className="text-xs font-semibold text-slate-800 block">
                    {techPackName ? `Attached: ${techPackName}` : 'Attach Tech-Pack, Size Spec Sheet, or Logo Vectors'}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Supported: PDF, AI, PSD, ZIP, PNG, JPG (Max 50MB)
                  </span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.ai,.psd,.zip,.png,.jpg,.jpeg"
                  />
                </label>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customization Details, CE Rating Needs & Fabric Specifications
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Detail any specific membrane requirements (Reissa/GoreTex), Kevlar GSM weight, custom thread colors, or private labeling instructions..."
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                />
              </div>

              {/* Submission Button */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                <div className="text-[11px] text-slate-500 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Confidential NDA Guaranteed</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-bulk-inquiry-btn"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Request...' : 'Send Bulk Order Inquiry'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-2.5 bg-[#F8FAFC] border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
          <span>Inquiry routed to: allyimpex1@gmail.com</span>
          <span>WhatsApp Quick Response: +92 324 9981194</span>
        </div>

      </div>
    </div>
  );
};
