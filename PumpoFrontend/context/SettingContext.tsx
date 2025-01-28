import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SettingsContextType {
  settings: Record<string, any>; // Dictionary of settings
  updateSetting: (key: string, value: any) => Promise<void>;
  resetSettings: () => Promise<void>; // Optional: Reset to default settings
  loading: boolean; // To indicate if settings are being loaded
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  // Default settings (you can modify these)
  const defaultSettings = {
    theme: "light",
    language: "en",
    units: "metric", // Options: metric or imperial
    notificationsEnabled: true,
    dataSavingMode: false,
  };

  // Load settings from AsyncStorage or use defaults
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem("appSettings");
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        } else {
          setSettings(defaultSettings);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
        setSettings(defaultSettings);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Update a specific setting
  const updateSetting = async (key: string, value: any) => {
    try {
      const updatedSettings = { ...settings, [key]: value };
      setSettings(updatedSettings);
      await AsyncStorage.setItem(
        "appSettings",
        JSON.stringify(updatedSettings)
      );
    } catch (error) {
      console.error("Error updating setting:", error);
    }
  };

  // Reset settings to defaults
  const resetSettings = async () => {
    try {
      setSettings(defaultSettings);
      await AsyncStorage.setItem(
        "appSettings",
        JSON.stringify(defaultSettings)
      );
    } catch (error) {
      console.error("Error resetting settings:", error);
    }
  };

  return (
    <SettingsContext.Provider
      value={{ settings, updateSetting, resetSettings, loading }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook for using the SettingsContext
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
