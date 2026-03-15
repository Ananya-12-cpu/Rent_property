export type UserRole = "superadmin" | "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  status: "active" | "inactive";
}

export type PropertyType = "apartment" | "house" | "villa" | "studio" | "penthouse";
export type PropertyStatus = "available" | "rented" | "maintenance";

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  amenities: string[];
  images: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "cancelled";
  totalAmount: number;
  createdAt: string;
}

export interface PropertyFilters {
  type?: PropertyType | "all";
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  city?: string;
  status?: PropertyStatus | "all";
  search?: string;
}

export interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  rentedProperties: number;
  totalUsers: number;
  totalRevenue: number;
  bookingsThisMonth: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
