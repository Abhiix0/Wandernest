// Common Types
export interface BaseEntity {
  id: string | number;
  createdAt?: Date;
  updatedAt?: Date;
}

// User Types
export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  country?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  currency: string;
  language: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  marketing: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  locationSharing: boolean;
}

// Destination Types
export interface Destination extends BaseEntity {
  name: string;
  country: string;
  city: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  rating: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  nearbyDestinations?: string[];
  activities?: Activity[];
  climate?: ClimateInfo;
  isVerified?: boolean;
  verificationSource?: string;
  duration?: string;
  locationType?: string;
  continent?: string;
  parentLocation?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  isVerified?: boolean;
  verificationSource?: string;
}

export interface ClimateInfo {
  bestTime: string;
  temperature: {
    min: number;
    max: number;
  };
  humidity: number;
}

// Trip Types
export interface Trip extends BaseEntity {
  destination: Destination;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: number;
  status: 'planned' | 'booked' | 'completed' | 'cancelled';
  itinerary?: ItineraryItem[];
}

export interface ItineraryItem {
  id: string;
  day: number;
  date: Date;
  activities: Activity[];
  accommodation?: string;
  transportation?: string;
}

// Review Types
export interface Review extends BaseEntity {
  userId: string;
  destinationId: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  helpful?: number;
  verified?: boolean;
  isVerified?: boolean;
  verificationSource?: string;
}

// Gamification Types
export interface Achievement extends BaseEntity {
  name: string;
  description: string;
  icon: string;
  category: 'travel' | 'community' | 'safety';
  requirement: string;
  unlocked: boolean;
  progress?: number;
  points: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  avatar?: string;
  points: number;
  badges: number;
  country: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    message?: string;
  };
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}
