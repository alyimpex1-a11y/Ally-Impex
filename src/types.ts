export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'jackets' | 'pants' | 'gloves' | 'hoodies-shirts' | 'rain-gear' | 'armor' | 'fashion-leather';
  categoryLabel: string;
  price: number;
  samplePrice: number;
  moq: number; // Minimum Order Quantity
  material: string;
  protectionRating: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: string[];
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  isSampleOrder: boolean;
}

export interface BulkInquiryData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  productName?: string;
  estimatedQuantity: number;
  customizationTypes: string[];
  targetDeliveryDate: string;
  targetPricePerUnit?: string;
  shippingPort?: string;
  additionalNotes: string;
  hasTechPack: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  role: string;
  company: string;
  country: string;
  countryCode: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  productPurchased: string;
}

export interface SIEMLogEvent {
  id: string;
  timestamp: string;
  severity: 'INFO' | 'WARNING' | 'ALERT' | 'CRITICAL';
  type: string;
  sourceIp: string;
  location: string;
  message: string;
  actionTaken: string;
}

export interface SecurityStatus {
  sslStatus: 'ACTIVE' | 'UPDATING';
  sslProtocol: string;
  cipherSuite: string;
  twoFactorEnforced: boolean;
  lastBackupTime: string;
  nextScheduledBackup: string;
  backupIntegrity: '100% Verified' | 'Checking';
  lastPenTestDate: string;
  nextPenTestDate: string;
  quarterlyAuditQuarter: string;
  auditComplianceScore: number;
  siemConnected: boolean;
  siemPlatform: string;
  activeThreatCount: number;
}
