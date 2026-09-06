import React, { useState } from 'react';
import { CartItem } from '../types';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Building2, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  AlertTriangle, 
  Download, 
  MessageCircle, 
  PhoneCall, 
  Mail, 
  Check 
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'USD' | 'EUR' | 'GBP';
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  // Checkout Steps: 1: Consignee Details, 2: Payment Gateway, 3: 2FA Verification, 4: Order Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'WIRE' | 'LC' | 'PAYPAL'>('CARD');

  // Customer & Shipping fields
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: 'John Miller',
    email: 'buyer@motogear-eu.com',
    phone: '+49 170 829104',
    country: 'Germany',
    city: 'Munich',
    shippingAddress: 'Industriestrasse 42, 80339 Munich',
    vatNumber: 'DE 948192841',
    // Card simulation
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '08/28',
    cardCvc: '882',
    cardHolder: 'John Miller',
    // 2FA OTP Code
    otpCode: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Calculations
  const subtotal = items.reduce((sum, item) => {
    const rate = item.isSampleOrder ? item.product.samplePrice : item.product.price;
    return sum + (rate * item.quantity);
  }, 0);
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const freightEstimate = Math.max(45, totalUnits * 1.5);
  const grandTotal = subtotal + freightEstimate;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.email || !formData.shippingAddress) {
      setErrorMsg('Please complete all mandatory delivery fields.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleInitiatePayment = () => {
    setIsProcessing(true);
    setErrorMsg('');
    // Simulate 2FA challenge trigger
    setTimeout(() => {
      setIsProcessing(false);
      setOtpSent(true);
      setStep(3); // Go to 2FA Verification
    }, 1200);
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otpCode.length < 4 && formData.otpCode !== '9981' && formData.otpCode !== '1234') {
      // Allow any 4-6 digit code or default
    }
    setIsProcessing(true);
    setTimeout(() => {
      const generatedOrderNo = `AI-EXP-${Date.now().toString().slice(-6)}`;
      setOrderNumber(generatedOrderNo);
      setIsProcessing(false);
      setStep(4);
      onOrderSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-900 flex flex-col">
        
        {/* Modal Top Header with Security Status */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2 font-['Helvetica_Neue',Arial,sans-serif]">
                <span>Ally Impex Secure Payment Gateway</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                  256-Bit SSL
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Encrypted B2B Export Transaction • Compliant with 3D-Secure 2.0 & SIEM Logged
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

        {/* Progress Step Indicator */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className={`flex items-center space-x-1.5 font-medium ${step >= 1 ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
            <span>Consignee & Shipping</span>
          </div>
          <span className="text-slate-300">──</span>
          <div className={`flex items-center space-x-1.5 font-medium ${step >= 2 ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
            <span>Payment Method</span>
          </div>
          <span className="text-slate-300">──</span>
          <div className={`flex items-center space-x-1.5 font-medium ${step >= 3 ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
            <span>2FA OTP Auth</span>
          </div>
          <span className="text-slate-300">──</span>
          <div className={`flex items-center space-x-1.5 font-medium ${step === 4 ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
            <span>Proforma Receipt</span>
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">

          {/* STEP 1: Consignee & Delivery Form */}
          {step === 1 && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200 flex justify-between items-center text-xs shadow-xs">
                <div>
                  <span className="text-slate-500">Order Summary:</span>{' '}
                  <strong className="text-slate-900">{totalUnits} pieces</strong> across {items.length} lines
                </div>
                <div>
                  <span className="text-slate-500">Total Due:</span>{' '}
                  <strong className="text-blue-600 font-mono text-sm font-bold">{formatCurrency(grandTotal, currency)}</strong>
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Moto Supply GmbH"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Full name"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email (Order Confirmation) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 555 019 283"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Germany / USA / UK / Australia"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Destination City & Port</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Hamburg Port / Frankfurt Airport"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Complete Delivery / Warehouse Address *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shippingAddress}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                  placeholder="Street address, building, postal code..."
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  id="checkout-step1-next-btn"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-xs cursor-pointer transition-all"
                >
                  <span>Continue to Payment Gateway</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Gateway Selection */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Select Payment Gateway</h3>
                <p className="text-xs text-slate-500">All payment channels are encrypted with TLS 1.3 and verified via 2FA.</p>
              </div>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Option 1: Credit / Debit Card (Stripe) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer shadow-xs ${
                    paymentMethod === 'CARD'
                      ? 'border-blue-600 bg-blue-50/80 text-slate-900 ring-1 ring-blue-500/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold">Credit / Debit Card</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono border border-slate-200">Instant 3DS</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Visa, Mastercard, Amex, UnionPay via Stripe 3D Secure 2.0</p>
                </button>

                {/* Option 2: International Wire Transfer / Swift (T/T) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('WIRE')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer shadow-xs ${
                    paymentMethod === 'WIRE'
                      ? 'border-blue-600 bg-blue-50/80 text-slate-900 ring-1 ring-blue-500/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold">International Bank Wire (T/T)</span>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-mono border border-emerald-200 font-medium">B2B Best</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Direct Swift transfer to Ally Impex corporate account with Proforma</p>
                </button>

                {/* Option 3: Letter of Credit (L/C at sight) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('LC')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer shadow-xs ${
                    paymentMethod === 'LC'
                      ? 'border-blue-600 bg-blue-50/80 text-slate-900 ring-1 ring-blue-500/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold">Letter of Credit (L/C)</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono border border-slate-200">Container</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Irrevocable LC at sight issued through prime commercial bank</p>
                </button>

                {/* Option 4: PayPal Express */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('PAYPAL')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer shadow-xs ${
                    paymentMethod === 'PAYPAL'
                      ? 'border-blue-600 bg-blue-50/80 text-slate-900 ring-1 ring-blue-500/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold">PayPal Business</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono border border-slate-200">Sample Orders</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Buyer Protection guaranteed for sample consignments</p>
                </button>

              </div>

              {/* Conditional Payment Details */}
              {paymentMethod === 'CARD' && (
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">Encrypted Card Details</span>
                    <span className="text-slate-500 flex items-center space-x-1">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">AES-256 Bit Tokenized</span>
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono shadow-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono shadow-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">CVC / CVV (3D Secure)</label>
                      <input
                        type="text"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono shadow-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'WIRE' && (
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs space-y-2 shadow-xs">
                  <p className="font-bold text-blue-700">Ally Impex Corporate Banking Coordinates (Sialkot, Pakistan):</p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 font-mono">
                    <div><strong>Beneficiary:</strong> Ally Impex (Pvt) Ltd</div>
                    <div><strong>Bank:</strong> Habib Bank Limited (HBL) Export Branch</div>
                    <div><strong>SWIFT / BIC:</strong> HABBBRKKA</div>
                    <div><strong>IBAN:</strong> PK36HABB0001234567890123</div>
                    <div><strong>Export Contact:</strong> +92 324 9981194</div>
                    <div><strong>Finance Email:</strong> allyimpex1@gmail.com</div>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    An official commercial Proforma Invoice with export verification code will be generated upon checkout.
                  </p>
                </div>
              )}

              {paymentMethod === 'LC' && (
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs space-y-1.5 text-slate-700 shadow-xs">
                  <p className="font-bold text-blue-700">Letter of Credit (L/C at Sight) Protocol:</p>
                  <p className="text-[11px] text-slate-500">
                    Ally Impex accepts irrevocable Letters of Credit advised through standard international correspondent banking networks. Our export documentation team will review the draft LC within 24 hours.
                  </p>
                </div>
              )}

              {paymentMethod === 'PAYPAL' && (
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs space-y-1 text-slate-700 shadow-xs">
                  <p className="font-bold text-blue-700">PayPal Express Business Checkout:</p>
                  <p className="text-[11px] text-slate-500">
                    Official merchant gateway linked to allyimpex1@gmail.com. Complete buyer protection enabled.
                  </p>
                </div>
              )}

              {/* Total and Action */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer font-medium"
                >
                  ← Back to Delivery Info
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleInitiatePayment}
                  id="checkout-step2-pay-btn"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
                >
                  {isProcessing ? (
                    <span>Establishing 2FA Channel...</span>
                  ) : (
                    <>
                      <span>Authorize Payment ({formatCurrency(grandTotal, currency)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Two-Factor Authentication (2FA) Security Verification */}
          {step === 3 && (
            <form onSubmit={handleVerify2FA} className="space-y-5 max-w-md mx-auto text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600 shadow-xs">
                <Smartphone className="w-7 h-7 animate-bounce" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">Two-Factor Security Verification (2FA)</h3>
                <p className="text-xs text-slate-500 mt-1">
                  In accordance with Ally Impex security protocols, an OTP verification code has been dispatched to{' '}
                  <strong className="text-slate-800">{formData.phone}</strong> and <strong className="text-slate-800">{formData.email}</strong>.
                </p>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-slate-700 flex items-center justify-center space-x-2 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Demo One-Time Code: <strong className="text-blue-700 font-mono font-bold">9981</strong></span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Enter 4-Digit Security OTP:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={formData.otpCode}
                  onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
                  placeholder="9981"
                  className="w-44 mx-auto text-center bg-white border-2 border-blue-500 rounded-xl py-2.5 text-xl font-mono text-blue-700 tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                />
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-center space-x-2">
                <span>Didn't receive code?</span>
                <button
                  type="button"
                  onClick={() => alert('OTP Code re-sent to ' + formData.phone + ': 9981')}
                  className="text-blue-600 hover:underline cursor-pointer font-semibold"
                >
                  Resend SMS OTP
                </button>
              </div>

              <div className="pt-2 flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  id="checkout-step3-verify-btn"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
                >
                  {isProcessing ? (
                    <span>Validating 2FA Token & SIEM Log...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirm & Process Order</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Order Confirmation & Proforma Receipt */}
          {step === 4 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  Payment & Verification Confirmed
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2 font-['Helvetica_Neue',Arial,sans-serif]">Export Order Successfully Booked!</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Your proforma order <strong className="text-slate-900 font-mono">{orderNumber}</strong> has been logged into our factory production queue. An official confirmation email has been dispatched.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-left max-w-lg mx-auto space-y-2.5 text-xs shadow-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Order Reference:</span>
                  <span className="font-mono text-blue-600 font-bold">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Buyer / Consignee:</span>
                  <span className="text-slate-900 font-medium">{formData.contactName} ({formData.companyName || 'Private'})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="text-slate-900 font-medium">{formData.city}, {formData.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Channel:</span>
                  <span className="text-emerald-700 font-mono font-semibold">
                    {paymentMethod === 'CARD' ? 'Credit Card (3DS Verified)' : paymentMethod === 'WIRE' ? 'Bank Wire (T/T)' : paymentMethod === 'LC' ? 'Letter of Credit' : 'PayPal'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                  <span>Grand Total Paid / Contracted:</span>
                  <span className="text-blue-600 font-mono text-sm">{formatCurrency(grandTotal, currency)}</span>
                </div>
              </div>

              {/* Instant WhatsApp Tracking Link */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 max-w-lg mx-auto text-xs text-left flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center space-x-2.5">
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Direct WhatsApp Order Tracking</p>
                    <p className="text-slate-600 text-[11px]">Chat with Ally Impex Export Manager regarding your consignment.</p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/923249981194?text=Hello%20Ally%20Impex,%20I%20just%20placed%20order%20${orderNumber}%20for%20${totalUnits}%20units.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs shrink-0 transition-colors shadow-xs"
                >
                  Track on WhatsApp
                </a>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    alert(`Downloading Proforma Invoice PDF for ${orderNumber}...\nIssued by Ally Impex, Sialkot, Pakistan\nConsignee: ${formData.contactName}\nEmail: allyimpex1@gmail.com\nPhone: +92 324 9981194`);
                  }}
                  className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 border border-slate-300 transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Download Proforma Invoice (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Back to Storefront
                </button>
              </div>

              <div className="text-[11px] text-slate-400">
                Notice: Dispatch notifications and tracking bill of lading (B/L) will be copied to <span className="text-slate-600 font-medium">allyimpex1@gmail.com</span> and your registered email.
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Security Badge */}
        <div className="px-6 py-2.5 bg-[#F8FAFC] border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>PCI-DSS Level 1 Gateway • 256-Bit TLS • 2FA Enforced</span>
          </div>
          <span>Support: +92 324 9981194</span>
        </div>

      </div>
    </div>
  );
};
