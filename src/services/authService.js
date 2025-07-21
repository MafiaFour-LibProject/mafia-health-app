import { apiClient } from "./config";

// login

export const ApiLogin = async (payload) =>
  apiClient.post("/api/auth/LogIn", payload);

// signup
export const ApiSignup = async (payload) =>
  apiClient.post("/api/auth/signUp", payload);

// verify email

export const verifyEmailToken = async (token) => {
  try {
    const response = await apiClient.get("/api/auth/verify-email", {
      params: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Email verification failed" };
  }
};

// resend verification email

export const resendVerificationEmail = async (email) => {
  try {
    const response = await apiClient.post("/api/auth/resend-verification", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Resend failed" };
  }
};

// Update admin password
export const updateAdminPassword = async ({ oldPassword, newPassword }) => {
  return apiClient.put("/api/auth/update-password", {
    oldPassword,
    newPassword,
  });
};
// export const ApiForgotPassword = async (payload) =>
//   apiClient.post("/auth/forgot-password", payload);

// export const ApiResetPassword = async (payload) =>
//   apiClient.post("/auth/reset-password", payload);

// export const ApiVerifyEmail = async (payload) => apiClient.post("/auth/verify-email");
