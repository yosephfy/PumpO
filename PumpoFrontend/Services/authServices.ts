import { postRequest, getRequest } from "@/utility/axios";

export const LoginService = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await postRequest(`/users/login`, credentials);
    return response; // Assuming the API returns tokens or user data
  } catch (error: any) {
    console.error("Error logging in:", error.response || error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const RegisterService = async (registrationData: object) => {
  try {
    const response = await postRequest(`/users/register`, registrationData);
    return response;
  } catch (error: any) {
    console.error("Error registering user:", error.response || error);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
