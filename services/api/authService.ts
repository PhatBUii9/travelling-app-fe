import { EmailOTPRequest, IFormInputs } from "@/types/type";

const BASE_URL = "http://10.0.2.2:8080/The-Project/public/api";

/**
 * Register a user via POST
 */
// export async function checkUserDetail(data: IFormInputs) {
//   try {
//     const response = await fetch(`${BASE_URL}/users/register/detail/verify`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     console.log("📦 Backend response:", result);
//     console.log("📡 HTTP status:", response.status);
//     console.log("📡 Error code:", result.code);

//     // if (!response.ok || result.code !== "USER_CREATED") {
//     //   throw new Error(result.message || "Registration failed");
//     // }

//     switch (result.code) {
//       case "E000":
//         console.log("Users details pass the verification");
//         return true;
//       case "E002":
//         console.log("Username has already been taken");
//         break;
//       case "E013":
//         console.log("Username format invalid");
//         break;
//       case "E010":
//         console.log("Email format is invalid");
//         break;
//       case "E003":
//         console.log("Email has already been taken");
//         break;
//       case "E004":
//         console.log(
//           "Password must be 8-20 characters long, include at least one lowercase letter, one uppercase letter, one digit, one special character, and must not contain whitespace, <, >, /, or \\ characters."
//         );
//         break;
//       case "E011":
//         console.log(
//           "Phone number must start with 0, 84, or +84, followed by 3, 5, 7, 8, or 9, and contain 7 to 8 digits"
//         );
//         break;
//       default:
//         console.log("Unexpected server error.");
//         break;
//     }
//     return false;
//   } catch (error: any) {
//     console.error("Register error:", error?.message || error);
//     throw new Error(error?.message || "Registration failed");
//   }
// }

export async function checkUserDetail(data: IFormInputs) {
  const response = await fetch(`${BASE_URL}/users/register/detail/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("📦 Backend response:", result);
  return result;
}

/**
 * Check if a username already exists via GET
 * Backend returns:
 * - 409 Conflict if username exists
 * - 404 Not Found if username is available
 */
export async function checkUsernameExists(username: string): Promise<boolean> {
  const url = `${BASE_URL}/users/get/user?user-input=${username}`;
  console.log("🌐 Fetching:", url);

  try {
    const res = await fetch(url);
    console.log("📡 HTTP status:", res.status);

    if (res.status === 409) {
      console.log("⚠️ Username exists");
      return true;
    } else if (res.status === 404) {
      console.log("✅ Username is available");
      return false;
    } else {
      console.warn("❓ Unexpected status:", res.status);
      return false;
    }
  } catch (error) {
    console.error("❌ Error checking username:", error);
    return false; // safe default
  }
}

export async function sendEmailOTP(data: EmailOTPRequest) {
  try {
    const response = await fetch(`${BASE_URL}/otp/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);

    switch (result.code) {
      case "E026":
        console.log("Max OTP retry exceeded.");
        break;
      case "E000":
        console.log("OTP sent successfully");
        return true;
      default:
        console.log("Undefined error");
    }
    return false;
  } catch (error: any) {
    console.error("Sending OTP Error:", error?.message || error);
    throw new Error(error?.message || "SendingOTP Failed");
  }
}

export async function verifyOTP(data: IFormInputs) {
  try {
    const response = await fetch(`${BASE_URL}/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
  } catch (error: any) {
    console.error("Validating OTP Error:", error?.message || error);
    throw new Error(error?.message || "Validating OTP Failed");
  }
}
