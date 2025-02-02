import { SETTINGS } from "@/Services/SettingTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SettingsContextType {
  deviceSettings: Partial<defaultSettingType>; // Dictionary of settings
  updateDeviceSetting: (key: string, value: any) => Promise<void>;
  resetSettings: () => Promise<void>; // Optional: Reset to default settings
  loading: boolean; // To indicate if settings are being loaded
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

interface defaultSettingType {
  theme: SETTINGS["appearance"]["theme"];
  language: string;
  units: "metric" | "imperial";
  pushNotification: boolean;
}

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [deviceSettings, setSettings] = useState<Partial<defaultSettingType>>(
    {}
  );
  const [loading, setLoading] = useState(true);

  // Default settings (you can modify these)
  const defaultSettings: defaultSettingType = {
    theme: "light",
    language: "en",
    units: "metric", // Options: metric or imperial
    pushNotification: true,
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
  const updateDeviceSetting = async (key: string, value: any) => {
    try {
      const updatedSettings = { ...deviceSettings, [key]: value };
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
      value={{
        deviceSettings,
        updateDeviceSetting,
        resetSettings,
        loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook for using the SettingsContext
export const useDeviceSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useDeviceSettings must be used within a SettingsProvider");
  }
  return context;
};
