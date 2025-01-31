import { useEffect, useState } from "react";
import { GetSettingsByKey, UpdateSettings } from "@/Services/SettingServices";
import { SETTINGS } from "@/Services/SettingTypes";
import { useAuth } from "@/context/AuthContext";

// Generic hook to manage settings
export function useSetting<T extends keyof SETTINGS>(
  category: T,
  key: keyof SETTINGS[T]
) {
  const { currentUser } = useAuth();
  const userId = currentUser?.user_id || "";
  const [value, setValue] = useState<SETTINGS[T][keyof SETTINGS[T]]>();

  useEffect(() => {
    const fetchSetting = async () => {
      if (!userId) return;
      try {
        const settingValue = await GetSettingsByKey<SETTINGS[T]>(userId, key);
        console.log({ settingValue, type: typeof settingValue });

        if (settingValue) setValue(settingValue);
      } catch (error) {
        console.error(`Error fetching ${String(key)}:`, error);
      }
    };

    fetchSetting();
  }, [userId, key]);

  const updateSetting = async (newValue: SETTINGS[T][typeof key]) => {
    if (!userId) return;
    try {
      setValue(newValue); // Optimistic UI update
      await UpdateSettings(userId, { [category]: { [key]: newValue } });
    } catch (error) {
      console.error(`Error updating ${String(key)}:`, error);
    }
  };

  return { value, updateSetting };
}
