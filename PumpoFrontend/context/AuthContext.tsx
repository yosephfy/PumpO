import AsyncStorage from "@react-native-async-storage/async-storage";
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
  signIn: (user: DT_UserProfile) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<DT_UserProfile | null>(null);

  // Load authentication state and current user from AsyncStorage on app load
  useEffect(() => {
    const loadAuthState = async () => {
      const storedAuthState = await AsyncStorage.getItem("isAuthenticated");
      const storedUser = await AsyncStorage.getItem("currentUser");
      if (storedAuthState === "true" && storedUser) {
        setIsAuthenticated(true);
        setCurrentUser(JSON.parse(storedUser));
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
      value={{ isAuthenticated, currentUser, signIn, signOut }}
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
