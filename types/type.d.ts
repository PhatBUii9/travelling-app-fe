import { TextInputProps, TouchableOpacityProps, ViewStyle } from "react-native";

// Driver and Ride Types
declare interface Driver {
  driver_id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
}

declare interface Ride {
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  fare_price: number;
  payment_status: string;
  driver_id: number;
  user_email: string;
  created_at: string;
  driver: {
    first_name: string;
    last_name: string;
    car_seats: number;
  };
}

// Marker and Map Props
declare interface MarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  first_name: string;
  last_name: string;
  time?: number;
  price?: string;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
  selectedDriver?: number | null;
  onMapReady?: () => void;
}

// Button & Input Props
declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?:
    | "primary"
    | "default"
    | "secondary"
    | "danger"
    | "outline"
    | "success"
    | "facebook"
    | "apple"
    | "google";
  textVariant?:
    | "primary"
    | "default"
    | "secondary"
    | "danger"
    | "success"
    | "facebook"
    | "apple";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  control: Control<T>;
  name: string;
  rules?: object;
  defaultValue?: string;
}

// User & OTP Related Types
declare type EmailEnum = "EMAIL_OTP_REGISTER" | "EMAIL_OTP_LOGIN";
declare type OTPVerificationMethod = "EMAIL_OTP" | "SMS_OTP";

declare interface IFormInputs {
  username?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  dob?: string;
  confirmPassword?: string;
  otp?: string;
  otpVerificationMethod?: OTPVerificationMethod;
  emailEnum?: EmailEnum;
  smsEnum?: EmailEnum;
}

declare interface EmailOTPRequest {
  username: string;
  email: string;
  otpVerificationMethod: "EMAIL_OTP";
  emailEnum: "EMAIL_OTP_REGISTER";
}

declare interface PhoneOTPRequest {
  username: string;
  phoneNumber: string;
  otpVerificationMethod: "PHONE_OTP";
  phoneEnum: "PHONE_OTP_REGISTER";
}

// Stores
declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface DriverStore {
  drivers: MarkerData[];
  selectedDriver: number | null;
  setSelectedDriver: (driverId: number) => void;
  setDrivers: (drivers: MarkerData[]) => void;
  clearSelectedDriver: () => void;
}

// Props
declare interface DriverCardProps {
  item: MarkerData;
  selected: number;
  setSelected: () => void;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

// Validation Rules
declare interface ValidationRuleObject {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: any) => boolean | string;
}

declare interface ValidationRules {
  username: ValidationRuleObject;
  registerUsername: ValidationRuleObject;
  dob: ValidationRuleObject;
  email: ValidationRuleObject;
  phoneNumber: ValidationRuleObject;
  password: ValidationRuleObject;
  confirmPassword: (password: string) => ValidationRuleObject;
}

declare interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

declare type WithLoadingFunction = (
  action: () => Promise<void>,
  showLoading: () => void,
  hideLoading: () => void
) => Promise<void>;

declare interface RegContextType {
  data: IFormInputs | null;
  setData: (d: IFormInputs) => void;
}

declare interface User {
  id: string;
  username: string;
  email?: string;
  phoneNumber?: string;
  dob?: string;
}

declare interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, userData?: User) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
  loading: boolean;
  user: User | null;
}

interface SectionHeaderProps {
  title: string;
  onPress?: () => void;
  canSeeMore: boolean;
}

declare interface UseTripsOptions {
  filter: "all" | "upcoming" | "shared";
  simulateError?: boolean;
}

declare interface UseTripsResult {
  data: Trip[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

declare interface TripCarouselProps {
  title: string;
  filter: "all" | "upcoming" | "shared";
  renderItem: (info: ListRenderItemInfo<Trip>) => ReactNode;
  onSeeMore: () => void;
  visibleCount?: number;
  simulateError?: boolean;
}

declare interface EmptyStateCardProps {
  message: string;
  onRetry: () => void;
}

interface MiniMapProps {
  region: Region;
  markerCoordinate?: { latitude: number; longitude: number };
  containerHeight?: number;
}

interface ScreenContainerProps {
  scrollable?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface MyAppExtra {
  googleMapsApiKey: string;
}

interface GoogleInputProps {
  icon?: JSX.Element;
  placeholder?: string;
  containerStyle?: string;
  inputStyle?: object;
  onSubmit: (query: string) => void;
}

export type Member = {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
};

export type Trip = {
  id: string;
  title: string;
  destination: string;
  dates: string;
  imageUrl: string | number;
  createdAt: string;
  members?: Member[];
  status: "upcoming" | "completed" | "cancelled";
  shared?: boolean;
  locationTag?: string;
  recentlyViewed?: boolean;
  trending?: boolean;
  viewedAt?: string;
};
