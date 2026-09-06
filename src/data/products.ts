import { Product, CustomerReview, SIEMLogEvent } from '../types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'ai-jkt-01',
    name: 'Apex Pro Cordura 600D Waterproof Riding Jacket',
    sku: 'AI-JKT-CRD600',
    category: 'jackets',
    categoryLabel: 'Motorcycle Jackets',
    price: 68.50,
    samplePrice: 95.00,
    moq: 25,
    material: 'Cordura 600D Heavy Duty Polyester with Reissa Waterproof Membrane',
    protectionRating: 'CE Certified EN 17092-3:2020 (Class AA)',
    description: 'Designed for extreme all-weather endurance, the Apex Pro combines abrasion-resistant 600D Cordura shell with removable CE Level-2 viscoelastic memory protectors at shoulders, elbows, and spine.',
    features: [
      'Removable thermal diamond-quilted vest liner',
      'Air-Vent zip system across chest, arms, and exhaust back vents',
      'Original YKK waterproof taped zips',
      '3M Scotchlite 360-degree reflective safety accents',
      'Adjustable arm, waist, and cuff tension straps for snug ergonomic fit'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: ['Stealth Black', 'High-Vis Yellow/Black', 'Battleship Grey/Black', 'Desert Sand'],
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.9,
    reviewsCount: 48,
    inStock: true,
    isBestseller: true,
    isNewArrival: false
  },
  {
    id: 'ai-jkt-02',
    name: 'Monza Vintage Top-Grain Cowhide Leather Biker Jacket',
    sku: 'AI-JKT-LTR12',
    category: 'jackets',
    categoryLabel: 'Motorcycle Jackets',
    price: 115.00,
    samplePrice: 155.00,
    moq: 20,
    material: '1.2mm - 1.3mm Premium Milled Top-Grain Cowhide Leather',
    protectionRating: 'CE Certified EN 1621-1 Level 2 (Shoulders & Elbows)',
    description: 'Classic cafe racer silhouette constructed from supple hand-waxed milled cowhide. Built-in discrete armor pockets allow seamless transition between open road speed and urban streetwear.',
    features: [
      'Hand-finished antique brass heavy-duty YKK hardware',
      'Internal armor pockets with removable CE Level-2 protectors',
      'Bi-swing action back pleats for full handlebar reach and comfort',
      'Satin poly lining with zippered inside media & document pockets',
      'Snap collar closure and zipped gusset cuffs'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Vintage Distressed Brown', 'Matte Black', 'Cognac Tan'],
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.8,
    reviewsCount: 36,
    inStock: true,
    isBestseller: true,
    isNewArrival: false
  },
  {
    id: 'ai-jkt-03',
    name: 'BreezeAir Hyper-Vent Mesh Textile Summer Jacket',
    sku: 'AI-JKT-MSH200',
    category: 'jackets',
    categoryLabel: 'Motorcycle Jackets',
    price: 52.00,
    samplePrice: 75.00,
    moq: 30,
    material: 'High-Density 3D Diamond Ballistic Mesh with 600D Polyester Impact Zones',
    protectionRating: 'CE Level 1 Certified Armor Pockets',
    description: 'Engineered specifically for extreme hot climate riding. High tensile 3D airflow mesh panels maximize intake without compromising abrasion strength on shoulders and elbows.',
    features: [
      'Ultra-breathable 3D aerodynamic honeycomb mesh construction',
      'Reinforced 600D abrasion panels at all slide zones',
      'Zip-out emergency windproof/water-resistant inner liner',
      'Reflective piping for enhanced night visibility',
      'Neoprene comfort-edged sports collar'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Charcoal / Neon Green', 'Triple Black', 'Silver / Black'],
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.7,
    reviewsCount: 22,
    inStock: true,
    isBestseller: false,
    isNewArrival: true
  },
  {
    id: 'ai-pnt-01',
    name: 'DuPont™ Kevlar® Reinforced Denim Riding Jeans',
    sku: 'AI-PNT-KVL14',
    category: 'pants',
    categoryLabel: 'Kevlar & Protective Pants',
    price: 44.00,
    samplePrice: 65.00,
    moq: 35,
    material: '14oz Heavy-Weight Stretch Cotton Denim lined with 280 GSM DuPont™ Kevlar® Aramid Fiber',
    protectionRating: 'CE EN 17092-4:2020 (Class A) with CE-Level 2 Knee & Hip Pads',
    description: 'Looks like regular designer denim but packs world-class track protection. DuPont™ Kevlar® lining covers seat, thighs, and knees, paired with externally accessible knee armor slots.',
    features: [
      'Full coverage genuine DuPont™ Kevlar® aramid lining',
      'External hidden zip pockets for knee armor insertion without removing pants',
      'Elastic accordion stretch panels above knees and lower back for riding posture',
      'Triple-needle high-tensile bonded nylon safety stitching',
      'YKK heavy-gauge brass fly zipper'
    ],
    sizes: ['30W/32L', '32W/32L', '34W/32L', '36W/34L', '38W/34L', '40W/34L'],
    colors: ['Raw Indigo Blue', 'Washed Black', 'Stone Distressed Blue'],
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.9,
    reviewsCount: 54,
    inStock: true,
    isBestseller: true,
    isNewArrival: false
  },
  {
    id: 'ai-pnt-02',
    name: 'Enduro Expedition Cordura Waterproof Touring Pants',
    sku: 'AI-PNT-CRD800',
    category: 'pants',
    categoryLabel: 'Kevlar & Protective Pants',
    price: 58.00,
    samplePrice: 85.00,
    moq: 25,
    material: 'Cordura 600D / 1000D Ballistic Reinforcements with Hydratex Membrane',
    protectionRating: 'CE Level 2 Adjustable Knee Protectors + Hip Armor Included',
    description: 'Built for trans-continental adventure touring. Features zippered thigh ventilation intakes, heavy-duty heat-resistant leather grip panels inside calves, and detachable insulated quilted liner.',
    features: [
      '10,000mm hydrostatic head waterproof breathable membrane',
      'Full-length calf zips with gusset to accommodate high adventure boots',
      'Heavy-duty connection zipper to connect with Ally Impex jackets',
      'Expandable twin cargo thigh pockets with storm flaps',
      'Ergonomic pre-curved leg cut reduces rider fatigue'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: ['Tactical Black', 'Grey / Black Contrast', 'Military Olive'],
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
    isBestseller: false,
    isNewArrival: true
  },
  {
    id: 'ai-glv-01',
    name: 'Pro-Circuit Carbon Knuckle Kangaroo/Cowhide Race Gloves',
    sku: 'AI-GLV-CRB01',
    category: 'gloves',
    categoryLabel: 'Motorcycle Gloves',
    price: 34.50,
    samplePrice: 50.00,
    moq: 50,
    material: 'Grade-A Cowhide with Ultra-Sensitive Kangaroo Leather Palm & Carbon Fiber Shield',
    protectionRating: 'CE Certified EN 13594:2015 KP Level 1 & 2',
    description: 'Track-proven gauntlet gloves offering tactile throttle control with kangaroo palm, vented carbon-fiber knuckle defense, and patented fourth-finger anti-separation bridge.',
    features: [
      'High-impact molded real carbon fiber knuckle protection',
      'Palm slider with SuperFabric™ high abrasion resistance',
      'Conductive smart-touch finger tips for smartphone and GPS navigation',
      'Dual hook-and-loop wrist cuff retention system',
      'External finger stitching for maximum comfort and seam durability'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black / White / Red', 'Monochrome Stealth Black', 'Black / Fluorescent Yellow'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.9,
    reviewsCount: 62,
    inStock: true,
    isBestseller: true,
    isNewArrival: false
  },
  {
    id: 'ai-glv-02',
    name: 'ThermoShield 7.4V Rechargeable Heated Waterproof Gloves',
    sku: 'AI-GLV-HTD74',
    category: 'gloves',
    categoryLabel: 'Motorcycle Gloves',
    price: 64.00,
    samplePrice: 90.00,
    moq: 30,
    material: 'Goat Skin Leather & Cordura with Micro-Carbon Heating Elements',
    protectionRating: 'CE Certified with TPR knuckle impact shield',
    description: 'Full thermal defense against sub-zero riding. Micro-alloy heating fibers wrap around each finger and back of hand, powered by dual 7.4V 2500mAh lithium-polymer battery packs with 3 heat levels.',
    features: [
      '3-stage push-button LED temperature controller (40°C - 65°C)',
      'Waterproof Hipora membrane with 150g 3M Thinsulate insulation',
      'Up to 6 hours continuous runtime on low heat mode',
      'Visor wiper blade integrated on left thumb',
      'Touchscreen compatible index and thumb'
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: ['Night Shadow Black'],
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.8,
    reviewsCount: 28,
    inStock: true,
    isBestseller: false,
    isNewArrival: true
  },
  {
    id: 'ai-hdr-01',
    name: 'Armored Heavyweight Fleece Motorcycle Hoodie with Kevlar®',
    sku: 'AI-HDR-KVL350',
    category: 'hoodies-shirts',
    categoryLabel: 'Protective Hoodies & Shirts',
    price: 42.00,
    samplePrice: 60.00,
    moq: 40,
    material: '350 GSM Heavy Cotton Fleece with 100% DuPont™ Kevlar® Lining',
    protectionRating: 'CE Level 1 Elbow & Shoulder Protectors Included',
    description: 'Urban stealth meets rider safety. Looks and feels like a premium street hoodie, but features complete DuPont™ Kevlar® inner reinforcement across the torso, sleeves, and back.',
    features: [
      'Full inner layer of 100% DuPont™ Kevlar® 220 GSM aramid knit',
      'Detachable CE protectors at shoulders, elbows and pocket for back pad',
      'Thumb loops at cuffs to prevent sleeve ride-up during acceleration',
      'Dual kangaroo hand pockets with hidden zippered security pockets',
      'Drawstring hood with snap lock to prevent high-speed flapping'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Heather Grey', 'Obsidian Black', 'Military Camo', 'Deep Navy'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.9,
    reviewsCount: 41,
    inStock: true,
    isBestseller: true,
    isNewArrival: false
  },
  {
    id: 'ai-hdr-02',
    name: 'IronClad Lumberjack Plaid Flannel Protective Shirt',
    sku: 'AI-SHT-FLN100',
    category: 'hoodies-shirts',
    categoryLabel: 'Protective Hoodies & Shirts',
    price: 39.50,
    samplePrice: 58.00,
    moq: 40,
    material: '100% Heavy Yarn-Dyed Cotton Plaid Flannel with Full Kevlar® Underlay',
    protectionRating: 'CE Certified EN 17092 (Class A)',
    description: 'The ultimate casual cruiser shirt. Rugged buffalo check flannel backed by full aramid abrasion-resistant layer and mesh lining for breathability on sunny afternoon rides.',
    features: [
      '100% genuine DuPont™ Kevlar® lining throughout body and arms',
      'Heavy front center YKK zipper concealed by snap-button placket',
      'Two chest pockets with snap flaps and internal water-resistant pocket',
      'Underarm air-flow eyelets for temperature regulation',
      'Internal pockets equipped with CE Level 1 viscoelastic armor'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Red / Black Buffalo Plaid', 'Grey / Black Lumberjack', 'Navy / White Check'],
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.8,
    reviewsCount: 33,
    inStock: true,
    isBestseller: false,
    isNewArrival: true
  },
  {
    id: 'ai-rn-01',
    name: 'StormBreaker High-Vis 2-Piece Fluorescent Rain Suit',
    sku: 'AI-RN-STORM2',
    category: 'rain-gear',
    categoryLabel: 'Rain Gear & Weather Defense',
    price: 26.00,
    samplePrice: 40.00,
    moq: 50,
    material: 'Ripstop Nylon with PU 10,000mm Waterproof Coating & Heat-Taped Seams',
    protectionRating: 'ISO 20471 High Visibility Standards & EN 343 Rain Resistance',
    description: 'Compact packable emergency rain gear designed to pull easily over leather or textile riding suits. Sealed waterproof storm flap prevents wind-driven moisture penetration.',
    features: [
      '100% electronically seam-taped waterproof construction',
      'Hi-Vis fluorescent neon yellow with wide 3M Scotchlite reflective bands',
      'Double storm flap over front zipper with hook-and-loop closure',
      'Elastic waist with drawcord and adjustable ankle gussets',
      'Comes with lightweight compact drawstring carrying pouch'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Fluorescent Neon Yellow / Black', 'High-Vis Orange / Black'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.7,
    reviewsCount: 18,
    inStock: true,
    isBestseller: false,
    isNewArrival: false
  },
  {
    id: 'ai-arm-01',
    name: 'CE Level 2 Viscoelastic Honeycomb Back Protector Insert',
    sku: 'AI-ARM-BCK02',
    category: 'armor',
    categoryLabel: 'CE Armor & Detachable Protection',
    price: 12.50,
    samplePrice: 20.00,
    moq: 100,
    material: 'High-Performance Polyurethane (PU) Memory Polymer with Air Channels',
    protectionRating: 'CE Certified EN 1621-2:2014 Level 2 (< 9kN residual force transmission)',
    description: 'Soft and flexible to rider contours at rest, instantly solidifies on impact to dissipate kinetic energy. Universal fit designed for back protector compartments in jackets and race suits.',
    features: [
      'Engineered honeycomb matrix delivers supreme air ventilation',
      'Superior multi-impact recovery without permanent deformation',
      'Extremely lightweight (less than 320 grams)',
      'Temperature stable from -20°C to +40°C',
      'Available in Men, Women, and Youth standard contour cuts'
    ],
    sizes: ['Small (Women/Youth)', 'Medium (Jacket 48-52)', 'Large (Jacket 54-60)'],
    colors: ['Safety Neon Yellow', 'Stealth Charcoal'],
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.9,
    reviewsCount: 49,
    inStock: true,
    isBestseller: true,
    isNewArrival: false
  },
  {
    id: 'ai-fsh-01',
    name: 'Outlaw Biker Club Cowhide Leather Vest with Concealed Pockets',
    sku: 'AI-VST-CLUB01',
    category: 'fashion-leather',
    categoryLabel: 'Fashion Garments & Leather Accessories',
    price: 46.00,
    samplePrice: 70.00,
    moq: 30,
    material: '1.2mm Heavy-Weight Naked Cowhide Leather',
    protectionRating: 'Heavy Duty Wind & Abrasion Resistant',
    description: 'Authentic club-style riding vest with single-panel back, perfect for custom club patches, embroidery, or branding. Equipped with dual internal concealed carry weapon/utility pockets.',
    features: [
      'Seamless one-piece leather back panel for large club patches and logos',
      'Dual inside concealed carry pockets with built-in holster straps',
      'Heavy-duty hidden front zipper with snap button storm closure',
      'Two chest pockets and two zippered lower slash hand pockets',
      'Premium polyester liner with internal zip access for easy patch sewing'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
    colors: ['Onyx Matte Black'],
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.9,
    reviewsCount: 39,
    inStock: true,
    isBestseller: true,
    isNewArrival: false
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    author: 'Markus Weber',
    role: 'Procurement Director',
    company: 'Bavaria MotoGear GmbH',
    country: 'Germany',
    countryCode: 'DE',
    rating: 5,
    date: '2026-02-14',
    title: 'Outstanding CE Level 2 Quality & Flawless Export Logistics',
    comment: 'We have ordered three 20ft containers of Cordura jackets and Kevlar jeans with Ally Impex. The stitch precision, CE EN 17092 compliance documentation, and custom embossed leather labels were delivered on schedule. Invaluable export partner for European retail distribution.',
    verifiedBuyer: true,
    productPurchased: 'Apex Pro Cordura 600D Jacket & Kevlar Jeans'
  },
  {
    id: 'rev-02',
    author: 'David Sterling',
    role: 'Founder & Brand Director',
    company: 'Apex Rider Supply Co.',
    country: 'United Kingdom',
    countryCode: 'GB',
    rating: 5,
    date: '2026-01-28',
    title: 'Exceptional Custom Embroidery & Fast Sample Prototyping',
    comment: 'Ally Impex handled our proprietary tech-pack and delivered physical sample prototypes in under 8 days! The kangaroo race gloves and armored flannel shirts passed our independent UK safety audit on the very first try.',
    verifiedBuyer: true,
    productPurchased: 'Pro-Circuit Carbon Knuckle Gloves'
  },
  {
    id: 'rev-03',
    author: 'Elena Rodriguez',
    role: 'Product Development Lead',
    company: 'Iberia Motor Wear',
    country: 'Spain',
    countryCode: 'ES',
    rating: 5,
    date: '2025-12-19',
    title: 'Top Grade Milled Cowhide & Impeccable Stitching',
    comment: 'The Monza vintage jackets have become our best-selling winter apparel line in Madrid and Barcelona. Supple 1.3mm leather, smooth YKK brass zippers, and exact sizing consistency across 500 units.',
    verifiedBuyer: true,
    productPurchased: 'Monza Vintage Cowhide Leather Jacket'
  },
  {
    id: 'rev-04',
    author: 'Tyler Vance',
    role: 'Supply Chain Operations',
    company: 'Great Lakes Tactical & Moto',
    country: 'United States',
    countryCode: 'US',
    rating: 5,
    date: '2025-11-05',
    title: 'Smooth Wire Transfer, Letter of Credit & Zero Defects',
    comment: 'Communication with their Sialkot export office via WhatsApp (+92 324 9981194) and email was immediate and professional 24/7. Their bulk tier pricing saved us 22% compared to our previous supplier.',
    verifiedBuyer: true,
    productPurchased: 'Armored Heavyweight Fleece Hoodie'
  }
];

export const INITIAL_SIEM_EVENTS: SIEMLogEvent[] = [
  {
    id: 'LOG-8821',
    timestamp: '2026-09-06 06:14:22 UTC',
    severity: 'INFO',
    type: 'TLS_HANDSHAKE_SUCCESS',
    sourceIp: '194.26.29.11',
    location: 'Munich, Germany',
    message: 'TLS 1.3 Session established with cipher TLS_AES_256_GCM_SHA384',
    actionTaken: 'Connection routed via Cloudflare Edge proxy'
  },
  {
    id: 'LOG-8822',
    timestamp: '2026-09-06 06:18:45 UTC',
    severity: 'INFO',
    type: 'DB_BACKUP_COMPLETED',
    sourceIp: '10.0.4.12 (Internal Cron)',
    location: 'Encrypted Cloud Storage',
    message: 'Automated snapshot backup #20260906-0600 completed (2.4 GB, AES-256 GCM)',
    actionTaken: 'Integrity hash validated (SHA-256 match)'
  },
  {
    id: 'LOG-8823',
    timestamp: '2026-09-06 06:21:02 UTC',
    severity: 'WARNING',
    type: 'RATE_LIMIT_FLAG',
    sourceIp: '45.154.255.89',
    location: 'Unknown Autonomous System',
    message: 'Exceeded 60 API requests/minute on endpoint /api/catalog/search',
    actionTaken: 'HTTP 429 Too Many Requests issued; IP throttled for 15 mins'
  },
  {
    id: 'LOG-8824',
    timestamp: '2026-09-06 06:24:18 UTC',
    severity: 'ALERT',
    type: 'UNAUTHORIZED_PORT_PROBE',
    sourceIp: '185.220.101.5',
    location: 'Tor Exit Node / Amsterdam',
    message: 'Blocked SQLi & XSS payload pattern probe on B2B inquiry form',
    actionTaken: 'WAF Rule #891 triggered: Source IP dropped at Edge Gateway'
  }
];
