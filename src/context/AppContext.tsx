import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  MenuItem,
  Category,
  CartItem,
  Order,
  OrderStatus,
  OrderType,
  PaymentMethod,
  OrderCustomerInfo,
  Reservation,
  ReservationStatus,
  Coupon,
  PromotionalOffer,
  Review,
  GalleryItem,
  SiteContent,
  BusinessSettings,
  AdminUser,
  ToastMessage
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS,
  INITIAL_COUPONS,
  INITIAL_OFFERS,
  INITIAL_REVIEWS,
  INITIAL_GALLERY,
  INITIAL_SITE_CONTENT,
  INITIAL_BUSINESS_SETTINGS,
  INITIAL_ORDERS,
  INITIAL_RESERVATIONS
} from '../data/initialData';

export type ActivePage = 
  | 'home' 
  | 'menu' 
  | 'reservation' 
  | 'checkout' 
  | 'tracking' 
  | 'about' 
  | 'gallery' 
  | 'reviews' 
  | 'contact' 
  | 'admin'
  | 'privacy'
  | 'terms';

interface AppContextType {
  // Navigation & Page State
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProductForModal: MenuItem | null;
  setSelectedProductForModal: (item: MenuItem | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  tableNumber: string | null;
  setTableNumber: (table: string | null) => void;
  
  // Menu & Categories
  menuItems: MenuItem[];
  categories: Category[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity: number, customizations?: { groupName: string; choiceLabel: string; price: number }[], instructions?: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartTax: number;
  cartDeliveryFee: number;
  cartDiscount: number;
  cartTotal: number;
  
  // Orders
  orders: Order[];
  activeOrderToTrack: Order | null;
  setActiveOrderToTrack: (order: Order | null) => void;
  placeOrder: (customer: OrderCustomerInfo, orderType: OrderType, paymentMethod: PaymentMethod) => Promise<Order>;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  cancelOrder: (orderId: string, reason?: string) => void;
  
  // Reservations
  reservations: Reservation[];
  createReservation: (booking: Omit<Reservation, 'id' | 'reservationCode' | 'createdAt' | 'status'>) => Promise<Reservation>;
  updateReservationStatus: (resId: string, status: ReservationStatus, table?: string) => void;
  
  // Coupons & Offers
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  offers: PromotionalOffer[];
  addOffer: (offer: Omit<PromotionalOffer, 'id'>) => void;
  updateOffer: (id: string, updates: Partial<PromotionalOffer>) => void;
  deleteOffer: (id: string) => void;
  
  // Content & Gallery & Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'verifiedVisit'> & { name?: string; tagline?: string; recommendedDish?: string }) => void;
  gallery: GalleryItem[];
  galleryItems: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  siteContent: SiteContent;
  updateSiteContent: (updates: Partial<SiteContent>) => void;
  setSiteContent: (updates: Partial<SiteContent>) => void;
  businessSettings: BusinessSettings;
  updateBusinessSettings: (updates: Partial<BusinessSettings>) => void;
  setScannedTable?: (table: string | null) => void;
  setLiveTrackingOrderId?: (id: string) => void;
  
  // Admin Auth
  currentUser: AdminUser | null;
  adminLogin: (password: string, role?: 'admin' | 'manager' | 'staff') => boolean;
  adminLogout: () => void;
  
  // Toast
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Reset all to sample data
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'yecha_cafe_v2_';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(fallback) && !Array.isArray(parsed)) {
        return fallback;
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error loading from storage', key, e);
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to storage', key, e);
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Page state
  const [activePage, setActivePageState] = useState<ActivePage>('home');
  const [selectedProductForModal, setSelectedProductForModal] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState<string | null>(null);

  // Parse query params for ?table=T12 or #menu on mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const tableParam = urlParams.get('table');
      if (tableParam) {
        const formatted = tableParam.toUpperCase().startsWith('T') ? `Table ${tableParam.substring(1)}` : `Table ${tableParam}`;
        setTableNumber(formatted);
      }
      const hash = window.location.hash.replace('#', '');
      if (['menu', 'reservation', 'about', 'gallery', 'reviews', 'contact', 'admin'].includes(hash)) {
        setActivePageState(hash as ActivePage);
      }
    } catch (e) {
      console.warn('URL parsing failed', e);
    }
  }, []);

  const setActivePage = (page: ActivePage) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      if (page === 'home') {
        window.history.pushState(null, '', window.location.pathname);
      } else {
        window.history.pushState(null, '', `#${page}`);
      }
    } catch {
      // ignore
    }
  };

  // Persistent States
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => loadFromStorage('menu', INITIAL_MENU_ITEMS));
  const [categories, setCategories] = useState<Category[]>(() => loadFromStorage('categories', INITIAL_CATEGORIES));
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage('cart', []));
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => loadFromStorage('applied_coupon', null));
  const [orders, setOrders] = useState<Order[]>(() => loadFromStorage('orders', INITIAL_ORDERS));
  const [reservations, setReservations] = useState<Reservation[]>(() => loadFromStorage('reservations', INITIAL_RESERVATIONS));
  const [coupons, setCoupons] = useState<Coupon[]>(() => loadFromStorage('coupons', INITIAL_COUPONS));
  const [offers, setOffers] = useState<PromotionalOffer[]>(() => loadFromStorage('offers', INITIAL_OFFERS));
  const [reviews, setReviews] = useState<Review[]>(() => loadFromStorage('reviews', INITIAL_REVIEWS));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadFromStorage('gallery', INITIAL_GALLERY));
  const [siteContent, setSiteContent] = useState<SiteContent>(() => loadFromStorage('site_content', INITIAL_SITE_CONTENT));
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(() => loadFromStorage('business_settings', INITIAL_BUSINESS_SETTINGS));
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => loadFromStorage('admin_user', null));
  const [activeOrderToTrack, setActiveOrderToTrack] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to storage
  useEffect(() => { saveToStorage('menu', menuItems); }, [menuItems]);
  useEffect(() => { saveToStorage('categories', categories); }, [categories]);
  useEffect(() => { saveToStorage('cart', cart); }, [cart]);
  useEffect(() => { saveToStorage('applied_coupon', appliedCoupon); }, [appliedCoupon]);
  useEffect(() => { saveToStorage('orders', orders); }, [orders]);
  useEffect(() => { saveToStorage('reservations', reservations); }, [reservations]);
  useEffect(() => { saveToStorage('coupons', coupons); }, [coupons]);
  useEffect(() => { saveToStorage('offers', offers); }, [offers]);
  useEffect(() => { saveToStorage('reviews', reviews); }, [reviews]);
  useEffect(() => { saveToStorage('gallery', gallery); }, [gallery]);
  useEffect(() => { saveToStorage('site_content', siteContent); }, [siteContent]);
  useEffect(() => { saveToStorage('business_settings', businessSettings); }, [businessSettings]);
  useEffect(() => { saveToStorage('admin_user', currentUser); }, [currentUser]);

  // Toast Helpers
  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cart]);

  const cartTax = useMemo(() => {
    return Math.round(cartSubtotal * businessSettings.gstRate * 100) / 100;
  }, [cartSubtotal, businessSettings.gstRate]);

  const cartDeliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    if (cartSubtotal >= businessSettings.freeDeliveryThreshold) return 0;
    return businessSettings.deliveryFee;
  }, [cart, cartSubtotal, businessSettings.freeDeliveryThreshold, businessSettings.deliveryFee]);

  const cartDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (cartSubtotal < appliedCoupon.minOrderValue) return 0;
    if (appliedCoupon.discountType === 'percentage') {
      const calc = (cartSubtotal * appliedCoupon.discountValue) / 100;
      return appliedCoupon.maxDiscount ? Math.min(calc, appliedCoupon.maxDiscount) : calc;
    } else {
      return appliedCoupon.discountValue;
    }
  }, [appliedCoupon, cartSubtotal]);

  const cartTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    const gross = cartSubtotal + cartTax + cartDeliveryFee - cartDiscount;
    return Math.max(0, Math.round(gross * 100) / 100);
  }, [cartSubtotal, cartTax, cartDeliveryFee, cartDiscount, cart.length]);

  // Cart Handlers
  const addToCart = (
    item: MenuItem, 
    quantity: number = 1, 
    customizations: { groupName: string; choiceLabel: string; price: number }[] = [], 
    instructions?: string
  ) => {
    const customCost = customizations.reduce((acc, c) => acc + c.price, 0);
    const unitPrice = item.price + customCost;
    const totalPrice = unitPrice * quantity;

    // Create unique key for same item with same customizations
    const customHash = customizations.map(c => `${c.groupName}:${c.choiceLabel}`).sort().join('|');
    const existingIndex = cart.findIndex(
      ci => ci.menuItem.id === item.id && 
      ci.selectedCustomizations.map(c => `${c.groupName}:${c.choiceLabel}`).sort().join('|') === customHash
    );

    if (existingIndex > -1) {
      setCart(prev => {
        const updated = [...prev];
        const current = updated[existingIndex];
        const newQty = current.quantity + quantity;
        updated[existingIndex] = {
          ...current,
          quantity: newQty,
          totalPrice: newQty * current.unitPrice
        };
        return updated;
      });
    } else {
      const newCartItem: CartItem = {
        cartItemId: `ci-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        menuItem: item,
        quantity,
        selectedCustomizations: customizations,
        specialInstructions: instructions,
        unitPrice,
        totalPrice
      };
      setCart(prev => [...prev, newCartItem]);
    }

    addToast(`Added to cart`, `${quantity}x ${item.name}`, 'success');
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        return {
          ...item,
          quantity: newQty,
          totalPrice: newQty * item.unitPrice
        };
      }
      return item;
    }));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === clean && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return { success: false, message: `Minimum order value for ${clean} is ₹${found.minOrderValue}` };
    }
    setAppliedCoupon(found);
    addToast('Coupon Applied', `${found.code} saved you ₹${cartDiscount || (found.discountType === 'fixed' ? found.discountValue : '')}!`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon Removed', undefined, 'info');
  };

  // Order Placement
  const placeOrder = async (
    customer: OrderCustomerInfo,
    orderType: OrderType,
    paymentMethod: PaymentMethod
  ): Promise<Order> => {
    const nextOrderNum = `YC-${1000 + orders.length + 1}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: nextOrderNum,
      createdAt: new Date().toISOString(),
      orderType,
      status: 'Pending',
      customer: {
        ...customer,
        tableNumber: orderType === 'dine-in' ? (customer.tableNumber || tableNumber || 'Table 01') : undefined
      },
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartTax,
      deliveryFee: orderType === 'delivery' ? cartDeliveryFee : 0,
      discount: cartDiscount,
      couponCode: appliedCoupon?.code,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? (orderType === 'delivery' ? 'Cash on Delivery' : 'Pending at Counter') : 'Paid',
      estimatedMinutes: orderType === 'delivery' ? 30 : 15,
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date().toISOString(),
          note: 'Order placed by guest'
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderToTrack(newOrder);
    clearCart();
    addToast('Order Placed Successfully!', `Order ${newOrder.orderNumber} is received.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updated = {
          ...ord,
          status: newStatus,
          statusHistory: [
            ...ord.statusHistory,
            {
              status: newStatus,
              timestamp: new Date().toISOString(),
              note: note || `Status updated to ${newStatus}`
            }
          ]
        };
        if (activeOrderToTrack && activeOrderToTrack.id === orderId) {
          setActiveOrderToTrack(updated);
        }
        return updated;
      }
      return ord;
    }));
    addToast('Order Updated', `Status changed to ${newStatus}`, 'info');
  };

  const cancelOrder = (orderId: string, reason?: string) => {
    updateOrderStatus(orderId, 'Cancelled', reason || 'Cancelled by staff');
  };

  // Reservations
  const createReservation = async (
    booking: Omit<Reservation, 'id' | 'reservationCode' | 'createdAt' | 'status'>
  ): Promise<Reservation> => {
    const code = `YC-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRes: Reservation = {
      ...booking,
      id: `res-${Date.now()}`,
      reservationCode: code,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    setReservations(prev => [newRes, ...prev]);
    addToast('Table Reserved!', `Reservation code: ${code}`, 'success');
    return newRes;
  };

  const updateReservationStatus = (resId: string, status: ReservationStatus, table?: string) => {
    setReservations(prev => prev.map(r => {
      if (r.id === resId) {
        return {
          ...r,
          status,
          tableAssigned: table || r.tableAssigned
        };
      }
      return r;
    }));
    addToast('Reservation Updated', `Marked as ${status}`, 'info');
  };

  // Menu Management
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `yc-item-${Date.now()}`
    };
    setMenuItems(prev => [newItem, ...prev]);
    addToast('Menu Item Added', newItem.name, 'success');
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    addToast('Menu Item Updated', undefined, 'success');
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    addToast('Menu Item Deleted', undefined, 'info');
  };

  const toggleItemAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === id) {
        const next = !item.isAvailable;
        addToast(item.name, next ? 'Marked in stock' : 'Marked out of stock', next ? 'success' : 'warning');
        return { ...item, isAvailable: next };
      }
      return item;
    }));
  };

  // Categories Management
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...category,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCat]);
    addToast('Category Added', newCat.name, 'success');
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    addToast('Category Updated', undefined, 'success');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    addToast('Category Deleted', undefined, 'info');
  };

  // Coupons
  const addCoupon = (coupon: Omit<Coupon, 'id'>) => {
    const newC: Coupon = { ...coupon, id: `c-${Date.now()}` };
    setCoupons(prev => [newC, ...prev]);
    addToast('Coupon Created', newC.code, 'success');
  };

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    addToast('Coupon Updated', undefined, 'success');
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    addToast('Coupon Removed', undefined, 'info');
  };

  // Offers
  const addOffer = (offer: Omit<PromotionalOffer, 'id'>) => {
    const newO: PromotionalOffer = { ...offer, id: `off-${Date.now()}` };
    setOffers(prev => [newO, ...prev]);
    addToast('Offer Published', newO.title, 'success');
  };

  const updateOffer = (id: string, updates: Partial<PromotionalOffer>) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
    addToast('Offer Updated', undefined, 'success');
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id));
    addToast('Offer Deleted', undefined, 'info');
  };

  // Reviews
  const addReview = (review: Omit<Review, 'id' | 'date' | 'verifiedVisit'>) => {
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verifiedVisit: true
    };
    setReviews(prev => [newRev, ...prev]);
    addToast('Thank You!', 'Your review has been shared.', 'success');
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newGal: GalleryItem = { ...item, id: `gal-${Date.now()}` };
    setGallery(prev => [newGal, ...prev]);
    addToast('Image Added to Gallery', undefined, 'success');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    addToast('Image Removed', undefined, 'info');
  };

  // Content & Settings
  const updateSiteContent = (updates: Partial<SiteContent>) => {
    setSiteContent(prev => ({ ...prev, ...updates }));
    addToast('Site Content Updated', undefined, 'success');
  };

  const updateBusinessSettings = (updates: Partial<BusinessSettings>) => {
    setBusinessSettings(prev => ({ ...prev, ...updates }));
    addToast('Business Settings Updated', undefined, 'success');
  };

  // Admin Authentication
  const adminLogin = (password: string, role: 'admin' | 'manager' | 'staff' = 'admin') => {
    // Default demo passcode is "yecha123" or "admin"
    if (password === 'yecha123' || password === 'admin' || password === '1234') {
      const user: AdminUser = {
        id: 'usr-1',
        username: role === 'admin' ? 'admin@yecha' : `${role}@yecha`,
        name: role === 'admin' ? 'Head Concierge / Manager' : 'Kitchen Staff Lead',
        role
      };
      setCurrentUser(user);
      addToast('Welcome Back', `Logged in as ${user.role.toUpperCase()}`, 'success');
      return true;
    } else {
      addToast('Invalid Access Code', 'Please enter "yecha123" or "admin"', 'error');
      return false;
    }
  };

  const adminLogout = () => {
    setCurrentUser(null);
    setActivePage('home');
    addToast('Logged Out', 'Admin session ended', 'info');
  };

  const resetToDefaultData = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    setCategories(INITIAL_CATEGORIES);
    setCoupons(INITIAL_COUPONS);
    setOffers(INITIAL_OFFERS);
    setReviews(INITIAL_REVIEWS);
    setGallery(INITIAL_GALLERY);
    setSiteContent(INITIAL_SITE_CONTENT);
    setBusinessSettings(INITIAL_BUSINESS_SETTINGS);
    setOrders(INITIAL_ORDERS);
    setReservations(INITIAL_RESERVATIONS);
    setCart([]);
    setAppliedCoupon(null);
    addToast('Data Reset', 'Restored pristine Yecha Cafe data', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProductForModal,
        setSelectedProductForModal,
        isCartOpen,
        setIsCartOpen,
        tableNumber,
        setTableNumber,
        menuItems,
        categories,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        addCategory,
        updateCategory,
        deleteCategory,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartTax,
        cartDeliveryFee,
        cartDiscount,
        cartTotal,
        orders,
        activeOrderToTrack,
        setActiveOrderToTrack,
        placeOrder,
        updateOrderStatus,
        cancelOrder,
        reservations,
        createReservation,
        updateReservationStatus,
        coupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        offers,
        addOffer,
        updateOffer,
        deleteOffer,
        reviews,
        addReview,
        gallery,
        galleryItems: gallery,
        addGalleryItem,
        deleteGalleryItem,
        siteContent,
        updateSiteContent,
        setSiteContent: updateSiteContent,
        businessSettings,
        updateBusinessSettings,
        setScannedTable: setTableNumber,
        setLiveTrackingOrderId: (id: string) => {
          const found = orders.find(o => o.id === id || o.orderNumber === id);
          if (found) {
            setActiveOrderToTrack(found);
            setActivePage('tracking');
          }
        },
        currentUser,
        adminLogin,
        adminLogout,
        toasts,
        addToast,
        showToast: addToast,
        removeToast,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
