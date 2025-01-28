import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: DT_UserProfile | null;
  loading: boolean; // New loading state
  signIn: (user: DT_UserProfile) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<DT_UserProfile | null>(null);
  const [loading, setLoading] = useState(true); // Indicates loading state

  // Load authentication state and current user from AsyncStorage on app load
  useEffect(() => {
    const loadAuthState = async () => {
      setLoading(true); // Start loading
      try {
        const storedAuthState = await AsyncStorage.getItem("isAuthenticated");
        const storedUser = await AsyncStorage.getItem("currentUser");
        if (storedAuthState === "true" && storedUser) {
          setIsAuthenticated(true); // Set state directly without redundant writes
          setCurrentUser(JSON.parse(storedUser));
          router.replace("/(app)");
        }
      } catch (error) {
        console.error("Error loading auth state:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    loadAuthState();
  }, []);

  const signIn = async (user: DT_UserProfile) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    await AsyncStorage.setItem("isAuthenticated", "true"); // Persist auth state
    await AsyncStorage.setItem("currentUser", JSON.stringify(user)); // Persist user profile
  };

  const signOut = async () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    await AsyncStorage.removeItem("isAuthenticated"); // Clear auth state
    await AsyncStorage.removeItem("currentUser"); // Clear user profile
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
