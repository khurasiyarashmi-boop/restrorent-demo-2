export type DietaryType = 'veg' | 'non-veg' | 'vegan' | 'egg';

export interface CustomizationOption {
  id: string;
  name: string;
  choices: {
    label: string;
    price: number;
  }[];
  required?: boolean;
  defaultChoice?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: string;
  price: number;
  description: string;
  image: string;
  dietary: DietaryType;
  isBestseller?: boolean;
  isNew?: boolean;
  isSpicy?: boolean;
  isSignature?: boolean;
  isAvailable: boolean;
  preparationTimeMinutes: number;
  calories?: string;
  ingredients?: string[];
  allergens?: string[];
  customizations?: CustomizationOption[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconName?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface SelectedCustomization {
  groupName: string;
  choiceLabel: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedCustomizations: SelectedCustomization[];
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'dine-in' | 'pickup' | 'delivery';

export type OrderStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready'
  | 'Out for Delivery'
  | 'Completed'
  | 'Cancelled';

export type PaymentMethod = 'upi' | 'card' | 'cash' | 'netbanking';

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  email?: string;
  deliveryAddress?: string;
  deliveryLandmark?: string;
  tableNumber?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. YC-1048
  createdAt: string;
  orderType: OrderType;
  status: OrderStatus;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  tax: number; // 5% GST on Restaurant services
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending at Counter' | 'Cash on Delivery';
  estimatedMinutes: number;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export type SeatingArea = 'Indoor Ambient' | 'Al Fresco Patio' | 'Mezzanine Lounge' | 'Chef Bar Counter';

export type ReservationStatus = 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled' | 'Pending Review';

export interface Reservation {
  id: string;
  reservationCode: string; // e.g. YC-RES-2041
  name: string;
  phone: string;
  email: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "07:30 PM"
  guests: number;
  seatingArea: SeatingArea;
  occasion?: string;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
  tableAssigned?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
  description: string;
}

export interface PromotionalOffer {
  id: string;
  title: string;
  tagline: string;
  code?: string;
  discountText: string;
  badge: string;
  isActive: boolean;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  verifiedVisit: boolean;
  favoriteItem?: string;
  userCity?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Drinks' | 'Desserts' | 'Food' | 'Ambience' | 'Events';
  image: string;
  caption: string;
}

export interface SiteContent {
  heroTagline: string;
  heroHeadline: string;
  heroSubtext: string;
  announcementText: string;
  showAnnouncement: boolean;
  aboutStory: string;
  address: string;
  phone: string;
  email: string;
  openingHoursWeekday: string;
  openingHoursWeekend: string;
  instagramUrl: string;
  googleMapsUrl: string;
}

export interface BusinessSettings {
  restaurantName: string;
  hindiName: string;
  gstRate: number; // 0.05 (5%)
  deliveryFee: number; // ₹40
  freeDeliveryThreshold: number; // ₹500
  minimumOrderValue: number; // ₹150
  acceptingOrders: boolean;
  acceptingReservations: boolean;
  currencySymbol: string;
}

export type AdminRole = 'admin' | 'manager' | 'staff';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: AdminRole;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
