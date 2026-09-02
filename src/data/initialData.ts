import { 
  MenuItem, 
  Category, 
  Coupon, 
  PromotionalOffer, 
  Review, 
  GalleryItem, 
  SiteContent, 
  BusinessSettings,
  Order,
  Reservation
} from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-coffee', name: 'Artisanal Coffee', slug: 'coffee', displayOrder: 1, isActive: true },
  { id: 'cat-cold-coffee', name: 'Signature Iced Coffee', slug: 'cold-coffee', displayOrder: 2, isActive: true },
  { id: 'cat-matcha', name: 'Ceremonial Matcha & Teas', slug: 'matcha', displayOrder: 3, isActive: true },
  { id: 'cat-shakes', name: 'Thick Shakes & Coolers', slug: 'shakes', displayOrder: 4, isActive: true },
  { id: 'cat-desserts', name: 'Desserts & Pâtisserie', slug: 'desserts', displayOrder: 5, isActive: true },
  { id: 'cat-pasta', name: 'Gourmet Pasta & Bowls', slug: 'pasta', displayOrder: 6, isActive: true },
  { id: 'cat-sandwiches', name: 'Crunchwiches & Toasties', slug: 'sandwiches', displayOrder: 7, isActive: true },
  { id: 'cat-burgers', name: 'Craft Burgers', slug: 'burgers', displayOrder: 8, isActive: true },
  { id: 'cat-snacks', name: 'Small Plates & Fries', slug: 'snacks', displayOrder: 9, isActive: true },
  { id: 'cat-combos', name: 'Yecha Signature Combos', slug: 'combos', displayOrder: 10, isActive: true },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // SIGNATURE / COLD COFFEES
  {
    id: 'yc-item-1',
    name: 'Italian Tiramisu Iced Latte',
    hindiName: 'इटालियन तिरामिसू आइस्ड लाटे',
    category: 'cold-coffee',
    price: 340,
    description: 'Yecha’s crowned specialty. Double shot espresso layered over velvety mascarpone cream, cold whole milk, and dusted with dark Belgian cocoa.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isBestseller: true,
    isSignature: true,
    isNew: false,
    isAvailable: true,
    preparationTimeMinutes: 6,
    calories: '280 kcal',
    ingredients: ['Double Espresso', 'Mascarpone Cream', 'Milk', 'Vanilla Bean', 'Belgian Cocoa Dust'],
    allergens: ['Dairy'],
    customizations: [
      {
        id: 'cust-milk',
        name: 'Milk Choice',
        required: true,
        defaultChoice: 'Full Cream Milk',
        choices: [
          { label: 'Full Cream Milk', price: 0 },
          { label: 'Oat Milk (Barista Blend)', price: 45 },
          { label: 'Almond Milk', price: 45 }
        ]
      },
      {
        id: 'cust-sweetness',
        name: 'Sweetness Level',
        required: true,
        defaultChoice: 'Regular Sweet',
        choices: [
          { label: 'No Added Sugar', price: 0 },
          { label: 'Mild (50%)', price: 0 },
          { label: 'Regular Sweet', price: 0 }
        ]
      },
      {
        id: 'cust-addons',
        name: 'Add-ons',
        choices: [
          { label: 'Extra Espresso Shot', price: 50 },
          { label: 'Extra Mascarpone Cloud', price: 40 },
          { label: 'Savoiardi Ladyfinger Biscuit', price: 30 }
        ]
      }
    ]
  },
  {
    id: 'yc-item-2',
    name: 'Pistachio Iced Matcha',
    hindiName: 'पिस्ता आइस्ड माचा',
    category: 'matcha',
    price: 360,
    description: 'Ceremonial grade Uji Japanese matcha whisked fresh, poured over chilled oat milk and rich Sicilian pistachio cold foam.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isBestseller: true,
    isSignature: true,
    isAvailable: true,
    preparationTimeMinutes: 7,
    calories: '240 kcal',
    ingredients: ['Ceremonial Grade Matcha', 'Sicilian Pistachio Paste', 'Oat Milk', 'Sweet Cold Foam'],
    allergens: ['Nuts', 'Dairy'],
    customizations: [
      {
        id: 'cust-sweetness',
        name: 'Sweetness Level',
        required: true,
        defaultChoice: 'Mild (50%)',
        choices: [
          { label: 'Unsweetened Pure', price: 0 },
          { label: 'Mild (50%)', price: 0 },
          { label: 'Sweetened', price: 0 }
        ]
      },
      {
        id: 'cust-addons',
        name: 'Add-ons',
        choices: [
          { label: 'Extra Crushed Pistachio topping', price: 40 },
          { label: 'Vanilla Sweet Foam', price: 35 }
        ]
      }
    ]
  },
  {
    id: 'yc-item-3',
    name: 'Crunchwich Classic Chicken Sandwich',
    hindiName: 'क्रंचविच चिकन सैंडविच',
    category: 'sandwiches',
    price: 290,
    description: 'Herb-marinated grilled chicken breast, house smoked paprika remoulade, crisp iceberg, melted sharp cheddar between artisanal toasted brioche.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000&auto=format&fit=crop',
    dietary: 'non-veg',
    isBestseller: true,
    isSignature: true,
    isAvailable: true,
    preparationTimeMinutes: 12,
    calories: '490 kcal',
    ingredients: ['Grilled Chicken Breast', 'Smoked Cheddar', 'Brioche Toast', 'House Remoulade', 'Pickles'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    customizations: [
      {
        id: 'cust-bread',
        name: 'Bread Choice',
        required: true,
        defaultChoice: 'Artisanal Brioche',
        choices: [
          { label: 'Artisanal Brioche', price: 0 },
          { label: 'Multigrain Sourdough', price: 20 }
        ]
      },
      {
        id: 'cust-addons',
        name: 'Add-ons',
        choices: [
          { label: 'Extra Smoked Cheddar Slice', price: 35 },
          { label: 'Jalapeño & Gherkin Relish', price: 25 },
          { label: 'Crispy Truffle Fries on Side', price: 90 }
        ]
      }
    ]
  },
  {
    id: 'yc-item-4',
    name: 'Brownie Nutella Shake',
    hindiName: 'ब्राउनी न्यूटेला शेक',
    category: 'shakes',
    price: 310,
    description: 'Decadent fudge brownie blended with rich Italian Nutella, Madagascar vanilla ice cream, topped with warm chocolate ganache and brownie crumble.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isBestseller: true,
    isSignature: true,
    isAvailable: true,
    preparationTimeMinutes: 6,
    calories: '520 kcal',
    ingredients: ['Dark Chocolate Brownie', 'Nutella Hazelnut Spread', 'Vanilla Ice Cream', 'Whole Milk', 'Ganache'],
    allergens: ['Dairy', 'Nuts', 'Gluten'],
    customizations: [
      {
        id: 'cust-addons',
        name: 'Toppings',
        choices: [
          { label: 'Whipped Cream Rose', price: 30 },
          { label: 'Extra Fudgy Brownie Chunk', price: 45 },
          { label: 'Roasted Hazelnut Flakes', price: 35 }
        ]
      }
    ]
  },
  {
    id: 'yc-item-5',
    name: 'Choco Bar Shake',
    hindiName: 'चोको बार शेक',
    category: 'shakes',
    price: 290,
    description: 'Nostalgia redefined. A whole gourmet crunchy dark chocolate almond bar blended right inside creamy malt ice cream, served with a dunked mini choco bar.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28be0?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isBestseller: false,
    isSignature: true,
    isNew: true,
    isAvailable: true,
    preparationTimeMinutes: 6,
    calories: '480 kcal',
    ingredients: ['Almond Choco Bar', 'Malt Ice Cream', 'Chocolate Ganache', 'Crisp Pearls'],
    allergens: ['Dairy', 'Nuts'],
  },
  {
    id: 'yc-item-6',
    name: 'Artisanal Tiramisu Pot',
    hindiName: 'ऑथेंटिक तिरामिसू',
    category: 'desserts',
    price: 280,
    description: 'Classic Venetian recipe. Espresso-soaked savoiardi sponge enveloped in light whipped mascarpone cream, dark Valrhona cocoa dust.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isBestseller: true,
    isSignature: true,
    isAvailable: true,
    preparationTimeMinutes: 3,
    calories: '340 kcal',
    ingredients: ['Savoiardi', 'Mascarpone', 'Espresso Extract', 'Valrhona Cocoa'],
    allergens: ['Dairy', 'Gluten']
  },
  {
    id: 'yc-item-7',
    name: 'Alfredo Pasta with Garlic Herb Crumb',
    hindiName: 'अल्फ्रेडो पास्ता',
    category: 'pasta',
    price: 340,
    description: 'Penne tossed in slow-simmered rich Parmesan garlic cream sauce, sauteed button mushrooms, zucchini ribbons, and fragrant roasted herb pangrattato.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isBestseller: true,
    isSignature: true,
    isAvailable: true,
    preparationTimeMinutes: 14,
    calories: '560 kcal',
    ingredients: ['Penne Rigate', 'Aged Parmesan', 'Double Cream', 'Garlic Confit', 'Button Mushrooms', 'Herb Crumb'],
    allergens: ['Dairy', 'Gluten'],
    customizations: [
      {
        id: 'cust-pasta-type',
        name: 'Pasta Choice',
        required: true,
        defaultChoice: 'Penne',
        choices: [
          { label: 'Penne', price: 0 },
          { label: 'Fettuccine', price: 20 },
          { label: 'Gluten-free Fusilli', price: 40 }
        ]
      },
      {
        id: 'cust-protein',
        name: 'Add Protein',
        choices: [
          { label: 'Pan-seared Garlic Chicken', price: 70 },
          { label: 'Grilled Herb Paneer', price: 50 },
          { label: 'Extra Truffle Oil Drizzle', price: 45 }
        ]
      }
    ]
  },
  {
    id: 'yc-item-8',
    name: 'Spanish Iced Latte',
    hindiName: 'स्पैनिश आइस्ड लाटे',
    category: 'cold-coffee',
    price: 310,
    description: 'Sweet sweetened condensed milk base topped with chilled silky milk and a float of concentrated dark roasted espresso.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    preparationTimeMinutes: 5,
    calories: '260 kcal',
    allergens: ['Dairy']
  },
  {
    id: 'yc-item-9',
    name: 'Artisanal Flat White',
    hindiName: 'फ्लैट व्हाइट कॉफी',
    category: 'coffee',
    price: 240,
    description: 'Expertly pulled double ristretto shot blended with velvety micro-foamed whole milk creating a silky, coffee-forward cup.',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isAvailable: true,
    preparationTimeMinutes: 4,
    calories: '140 kcal',
    allergens: ['Dairy']
  },
  {
    id: 'yc-item-10',
    name: 'Lotus Biscoff Baked Cheesecake',
    hindiName: 'लोटस बिस्कॉफ चीज़केक',
    category: 'desserts',
    price: 320,
    description: 'Creamy New York style baked cheesecake on a buttery spiced Biscoff biscuit crust, layered with molten Biscoff spread and biscuit crumb.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    preparationTimeMinutes: 2,
    calories: '420 kcal',
    allergens: ['Dairy', 'Gluten']
  },
  {
    id: 'yc-item-11',
    name: 'Parmesan Truffle Loaded Fries',
    hindiName: 'ट्रफल पारमेसन फ्राइज',
    category: 'snacks',
    price: 260,
    description: 'Golden crispy skin-on fries tossed in aromatic white truffle oil, shaved 24-month aged Grana Padano, chopped parsley, with roasted garlic aioli.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isBestseller: true,
    isAvailable: true,
    preparationTimeMinutes: 10,
    calories: '380 kcal',
    allergens: ['Dairy']
  },
  {
    id: 'yc-item-12',
    name: 'Smoked Jalapeno Cottage Cheese Burger',
    hindiName: 'स्मोक्ड पनीर बर्गर',
    category: 'burgers',
    price: 280,
    description: 'Crispy panko-crusted spiced cottage cheese patty, melted gouda, house pickled jalapeños, smoked chipotle sauce in a toasted sesame brioche.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isSpicy: true,
    isAvailable: true,
    preparationTimeMinutes: 12,
    calories: '510 kcal',
    allergens: ['Dairy', 'Gluten']
  },
  {
    id: 'yc-item-13',
    name: 'Yecha Twilight Combo: Latte & Tiramisu',
    hindiName: 'येचा सिग्नेचर कॉम्बो',
    category: 'combos',
    price: 540,
    description: 'Pairing perfection: 1 Italian Tiramisu Iced Latte + 1 Authentic Tiramisu Pot (Save ₹80). The ultimate dessert coffee ritual.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
    dietary: 'veg',
    isBestseller: true,
    isSignature: true,
    isAvailable: true,
    preparationTimeMinutes: 7,
    calories: '620 kcal',
    allergens: ['Dairy', 'Gluten']
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'YECHA10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 300,
    maxDiscount: 100,
    expiryDate: '2026-12-31',
    isActive: true,
    description: '10% OFF on orders above ₹300 (Up to ₹100)'
  },
  {
    id: 'c-2',
    code: 'FIRSTORDER',
    discountType: 'fixed',
    discountValue: 75,
    minOrderValue: 400,
    expiryDate: '2026-12-31',
    isActive: true,
    description: '₹75 Flat OFF for your first dining or delivery order above ₹400'
  },
  {
    id: 'c-3',
    code: 'MATCHAMANIA',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 500,
    maxDiscount: 150,
    expiryDate: '2026-12-31',
    isActive: true,
    description: '15% OFF on signature drinks & combos'
  }
];

export const INITIAL_OFFERS: PromotionalOffer[] = [
  {
    id: 'off-1',
    title: 'Matcha Golden Hour',
    tagline: 'Artisanal ceremonial matcha cold foam experience',
    discountText: '15% OFF',
    code: 'MATCHAMANIA',
    badge: 'Special Craft',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'off-2',
    title: 'Tiramisu & Latte Duo',
    tagline: 'The iconic pairing of Rome & Bhopal',
    discountText: 'Save ₹80',
    badge: 'Signature Pair',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'off-3',
    title: 'Weekend Twilight Dining',
    tagline: 'Complimentary garlic herb bread on table reservations of 4+ guests',
    discountText: 'Complimentary Treat',
    badge: 'Dine-in Privilege',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Aarav Sharma',
    rating: 5,
    date: '2 days ago',
    comment: 'Without doubt the best Italian Tiramisu Iced Latte in Madhya Pradesh! The atmosphere at Mahindra Business Square is so calm, minimalist, and upscale. A must-visit in Salaiya.',
    verifiedVisit: true,
    favoriteItem: 'Italian Tiramisu Iced Latte',
    userCity: 'Bhopal'
  },
  {
    id: 'rev-2',
    author: 'Priyanka Verma',
    rating: 5,
    date: '1 week ago',
    comment: 'The Pistachio Iced Matcha was whisked to perfection, vibrant green with thick creamy pistachio foam. The Crunchwich Chicken is delightfully juicy. 10/10 presentation!',
    verifiedVisit: true,
    favoriteItem: 'Pistachio Iced Matcha',
    userCity: 'Bhopal'
  },
  {
    id: 'rev-3',
    author: 'Rohan Mehra',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Yecha Cafe sets a whole new benchmark for Bhopal cafe culture. Beautiful warm aesthetic, courteous staff, and the Brownie Nutella Shake is heavenly indulgence.',
    verifiedVisit: true,
    favoriteItem: 'Brownie Nutella Shake',
    userCity: 'Bhopal'
  },
  {
    id: 'rev-4',
    author: 'Sanya Kulkarni',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Came for a quiet evening work session and ended up having the Alfredo Pasta and Biscoff Cheesecake. The seating comfort and coffee quality are world class.',
    verifiedVisit: true,
    favoriteItem: 'Alfredo Pasta',
    userCity: 'Bhopal'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Warm Espresso & Cream Bar',
    category: 'Ambience',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    caption: 'Minimalist espresso bar crafted with warm oak and fluted travertine stone.'
  },
  {
    id: 'gal-2',
    title: 'The Italian Tiramisu Latte',
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1200&auto=format&fit=crop',
    caption: 'Handcrafted with double origin espresso and mascarpone foam.'
  },
  {
    id: 'gal-3',
    title: 'Artisanal Pâtisserie Counter',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
    caption: 'Freshly baked daily brioche, tiramisu cups, and cheesecakes.'
  },
  {
    id: 'gal-4',
    title: 'Ceremonial Matcha Preparation',
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1200&auto=format&fit=crop',
    caption: 'Pure Japanese Uji matcha whisked with bamboo chasen.'
  },
  {
    id: 'gal-5',
    title: 'Al Fresco Evening Patio',
    category: 'Ambience',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    caption: 'Boutique outdoor twilight seating with soft ambient lighting.'
  },
  {
    id: 'gal-6',
    title: 'Freshly Tossed Alfredo Pasta',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1200&auto=format&fit=crop',
    caption: 'Slow simmered garlic parmesan cream with wild mushrooms.'
  }
];

export const INITIAL_SITE_CONTENT: SiteContent = {
  heroTagline: 'CRAFTED COFFEE • ARTISANAL DESSERTS • BHOPAL',
  heroHeadline: 'Not just coffee.\nNot just dessert.\nAn experience.',
  heroSubtext: 'Nestled at Mahindra Business Square, Salaiya — Yecha Cafe is a sanctuary of sensory refinement where world-class coffee brewing meets cinematic gastronomy.',
  announcementText: '✨ Table reservations open for today. Try our signature Italian Tiramisu Iced Latte & Crunchwich.',
  showAnnouncement: true,
  aboutStory: 'Founded with a pure passion for spatial beauty, culinary precision, and specialty coffee, Yecha Cafe (एच कैफे) reimagines the modern Indian cafe experience. From sourcing single-origin Arabica beans to hand-whipping Sicilian pistachio creams, every recipe is a celebration of restraint, aroma, and warmth.',
  address: 'Mahindra Business Square, Aakriti Ecocity, Salaiya, Bhopal, Madhya Pradesh 462026, India',
  phone: '+91 755 492 8820',
  email: 'concierge@yechacafe.in',
  openingHoursWeekday: '11:00 AM – 11:30 PM',
  openingHoursWeekend: '10:30 AM – 12:00 AM',
  instagramUrl: 'https://instagram.com/yechacafe',
  googleMapsUrl: 'https://maps.google.com/?q=Mahindra+Business+Square+Salaiya+Bhopal'
};

export const INITIAL_BUSINESS_SETTINGS: BusinessSettings = {
  restaurantName: 'YECHA CAFE',
  hindiName: 'एच कैफे',
  gstRate: 0.05,
  deliveryFee: 40,
  freeDeliveryThreshold: 500,
  minimumOrderValue: 150,
  acceptingOrders: true,
  acceptingReservations: true,
  currencySymbol: '₹'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1024',
    orderNumber: 'YC-1024',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    orderType: 'dine-in',
    status: 'Preparing',
    customer: {
      name: 'Aditya Raj',
      phone: '+91 98260 12345',
      tableNumber: 'Table 04',
      notes: 'Please bring coffee with extra cold foam'
    },
    items: [
      {
        cartItemId: 'ci-1',
        menuItem: INITIAL_MENU_ITEMS[0],
        quantity: 2,
        selectedCustomizations: [
          { groupName: 'Milk Choice', choiceLabel: 'Full Cream Milk', price: 0 },
          { groupName: 'Sweetness Level', choiceLabel: 'Regular Sweet', price: 0 }
        ],
        unitPrice: 340,
        totalPrice: 680
      },
      {
        cartItemId: 'ci-2',
        menuItem: INITIAL_MENU_ITEMS[2],
        quantity: 1,
        selectedCustomizations: [
          { groupName: 'Bread Choice', choiceLabel: 'Artisanal Brioche', price: 0 }
        ],
        unitPrice: 290,
        totalPrice: 290
      }
    ],
    subtotal: 970,
    tax: 48.5,
    deliveryFee: 0,
    discount: 50,
    couponCode: 'YECHA10',
    total: 968.5,
    paymentMethod: 'upi',
    paymentStatus: 'Paid',
    estimatedMinutes: 12,
    statusHistory: [
      { status: 'Pending', timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
      { status: 'Confirmed', timestamp: new Date(Date.now() - 22 * 60 * 1000).toISOString() },
      { status: 'Preparing', timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), note: 'Barista started brewing' }
    ]
  },
  {
    id: 'ord-1025',
    orderNumber: 'YC-1025',
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    orderType: 'delivery',
    status: 'Confirmed',
    customer: {
      name: 'Sneha Patel',
      phone: '+91 97555 43210',
      deliveryAddress: 'Villa 14, Aakriti Ecocity, Salaiya, Bhopal',
      deliveryLandmark: 'Near Clubhouse Gate',
      notes: 'Call on arrival'
    },
    items: [
      {
        cartItemId: 'ci-3',
        menuItem: INITIAL_MENU_ITEMS[1],
        quantity: 1,
        selectedCustomizations: [
          { groupName: 'Sweetness Level', choiceLabel: 'Mild (50%)', price: 0 }
        ],
        unitPrice: 360,
        totalPrice: 360
      },
      {
        cartItemId: 'ci-4',
        menuItem: INITIAL_MENU_ITEMS[5],
        quantity: 1,
        selectedCustomizations: [],
        unitPrice: 280,
        totalPrice: 280
      }
    ],
    subtotal: 640,
    tax: 32,
    deliveryFee: 0,
    discount: 0,
    total: 672,
    paymentMethod: 'upi',
    paymentStatus: 'Paid',
    estimatedMinutes: 25,
    statusHistory: [
      { status: 'Pending', timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString() },
      { status: 'Confirmed', timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() }
    ]
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-2041',
    reservationCode: 'YC-RES-2041',
    name: 'Vikram & Natasha Singhania',
    phone: '+91 98930 77889',
    email: 'vikram.singhania@example.com',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '07:30 PM',
    guests: 4,
    seatingArea: 'Indoor Ambient',
    occasion: 'Anniversary',
    specialRequests: 'Corner booth with candlelight if possible',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    tableAssigned: 'Table 08'
  },
  {
    id: 'res-2042',
    reservationCode: 'YC-RES-2042',
    name: 'Devika Nair',
    phone: '+91 94250 11223',
    email: 'devika.nair@example.com',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '08:15 PM',
    guests: 2,
    seatingArea: 'Al Fresco Patio',
    occasion: 'Date Night',
    specialRequests: 'Outdoor patio table',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    tableAssigned: 'Patio P2'
  }
];
