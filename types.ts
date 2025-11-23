
export enum UserRole {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
  CHEF = 'CHEF'
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  availableQty: number;
  ingredients: string[];
  prepTime?: string;
  calories?: number;
  portionSize?: string;
  isDailySpecial?: boolean;
}

export interface Chef {
  id: string;
  name: string;
  bio: string;
  location: string;
  rating: number;
  reviewsCount: number;
  image: string;
  specialty: string;
  isOnline: boolean;
  isPickupOnly?: boolean; // New field
  distance: string;
  distanceValue: number; // Numeric distance in km for sorting
  badges: string[];
  menu: Dish[];
}

export interface CartItem extends Dish {
  quantity: number;
  chefId: string;
  chefName: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Accepted' | 'Preparing' | 'Out for Delivery' | 'Ready for Pickup' | 'Completed' | 'Cancelled';
  date: string;
  chefName: string;
  // Chef View Specifics
  customerName?: string; 
  customerAddress?: string; 
  deliveryType?: 'Delivery' | 'Pickup';
}

export interface CommunityRequest {
  id: string;
  requesterName: string;
  location: string;
  message: string;
  urgency: 'HIGH' | 'MEDIUM';
  distance: string;
  tags: string[];
  postedAt: string;
}
