// validationRules.ts

const EMAIL_PATTERN: RegExp =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_VN_PATTERN: RegExp = /^(0|84|\+84)(3|5|7|8|9)\d{7,8}$/;
const PASSWORD_PATTERN: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?])[^\s<>\\/]{8,20}$/;
const USERNAME_PATTERN: RegExp =
  /^(?!^(0|84|\+84)(3|5|7|8|9)\d{7,8}$)(?!.*[\u0008\t])[a-zA-Z0-9_.-]{5,20}$/;
const DOB_PATTERN: RegExp = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

// Define an interface for a basic validation rule object
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
  registerPassword: ValidationRuleObject;
  confirmPassword: (password: string) => ValidationRuleObject;
}

const validationRules: ValidationRules = {
  username: {
    required: "Username is required",
    minLength: {
      value: 5,
      message: "Username should be at least 5 characters long",
    },
    maxLength: {
      value: 20,
      message: "Username should not exceed 20 characters",
    },
  },
  registerUsername: {
    required: "Username is required",
    minLength: {
      value: 5,
      message: "Username should be at least 5 characters long",
    },
    maxLength: {
      value: 20,
      message: "Username should not exceed 20 characters",
    },
    pattern: {
      value: USERNAME_PATTERN,
      message:
        "Username must not include backspace, or tab, and do not match phone pattern",
    },
  },
  dob: {
    required: "Date of Birth is required",
    pattern: {
      value: DOB_PATTERN,
      message: "Invalid Date of Birth (DD/MM/YYYY)",
    },
  },
  email: {
    pattern: {
      value: EMAIL_PATTERN,
      message: "Invalid email format",
    },
  },
  phoneNumber: {
    pattern: {
      value: PHONE_VN_PATTERN,
      message:
        "Phone numbers must start with either +84, 84, or 0 (03, 05, 07, 08, 09)",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password should be at least 8 characters long",
    },
    maxLength: {
      value: 20,
      message: "Password should not exceed 20 characters",
    },
  },
  registerPassword: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password should be at least 8 characters long",
    },
    maxLength: {
      value: 20,
      message: "Password should not exceed 20 characters",
    },
    pattern: {
      value: PASSWORD_PATTERN,
      message:
        "Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and must not contain whitespace, <, >, /, or \\ characters.",
    },
  },
  confirmPassword: (password: string) => ({
    required: "Confirm Password is required",
    validate: (value: string) => value === password || "Passwords do not match",
  }),
};

export default validationRules;
