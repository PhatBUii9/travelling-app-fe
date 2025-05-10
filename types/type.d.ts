import { TextInputProps, TouchableOpacityProps } from "react-native";

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

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
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
  userName: string;
  email: string;
  otpVerificationMethod: "EMAIL_OTP";
  emailEnum: string;
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
interface ValidationRuleObject {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: any) => boolean | string;
}

interface ValidationRules {
  username: ValidationRuleObject;
  registerUsername: ValidationRuleObject;
  dob: ValidationRuleObject;
  email: ValidationRuleObject;
  phoneNumber: ValidationRuleObject;
  password: ValidationRuleObject;
  confirmPassword: (password: string) => ValidationRuleObject;
}
