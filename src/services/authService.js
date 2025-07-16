import { apiClient } from "./config";

const baseURL = "https://startuphealth.onrender.com";

// login

export const ApiLogin = async (payload) =>
  apiClient.post(`${baseURL}/api/auth/LogIn`, payload);

// signup
export const ApiSignup = async (payload) =>
  apiClient.post(`${baseURL}/api/auth/signUp`, payload);

// verify email

export const verifyEmailToken = async (token) => {
  try {
    const response = await apiClient.post(`${baseURL}/api/auth/verify-email`, {
      token,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Email verification failed" };
  }
};

// resend verification email

export const resendVerificationEmail = async (email) => {
  try {
    const response = await apiClient.post(
      `${baseURL}/api/auth/resend-verification`,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Resend failed" };
  }
};

// export const ApiForgotPassword = async (payload) =>
//   apiClient.post("/auth/forgot-password", payload);

// export const ApiResetPassword = async (payload) =>
//   apiClient.post("/auth/reset-password", payload);

// export const ApiVerifyEmail = async (payload) => apiClient.post("/auth/verify-email");
