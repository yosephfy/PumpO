import { getRequest, putRequest, deleteRequest } from "@/utility/axios";
import { SETTINGS } from "./SettingTypes";

// ----------------------- FETCH SETTINGS -----------------------
export const GetUserSettings = async (userId: string): Promise<SETTINGS> => {
  try {
    const response = await getRequest(`/settings/${userId}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching user settings:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch settings"
    );
  }
};

export const GetSettingsByCategory = async <T>(
  userId: string,
  category: keyof SETTINGS
): Promise<T> => {
  try {
    const response = await getRequest(
      `/settings/${userId}/category/${category}`
    );
    return response;
  } catch (error: any) {
    console.error(
      `Error fetching settings for category ${category}:`,
      error.response || error
    );
    throw new Error(
      error.response?.data?.message ||
        `Failed to fetch settings for ${category}`
    );
  }
};

export const GetSettingsByKey = async <T extends SETTINGS[keyof SETTINGS]>(
  userId: string,
  key: keyof T
): Promise<T[keyof T]> => {
  try {
    const response = await getRequest(
      `/settings/${userId}/settingkey/${String(key)}`
    );
    return response.value;
  } catch (error: any) {
    console.error(
      `Error fetching settings for key ${String(key)}:`,
      error.response || error
    );
    throw new Error(
      error.response?.data?.message ||
        `Failed to fetch settings for ${String(key)}`
    );
  }
};

// ----------------------- UPDATE SETTINGS -----------------------
export const UpdateSettings = async (
  userId: string,
  updates: Partial<{ [K in keyof SETTINGS]: Partial<SETTINGS[K]> }>
): Promise<void> => {
  try {
    console.log(updates);
    for (const category in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, category)) {
        const categorySettings = updates[category as keyof SETTINGS];

        for (const settingKey in categorySettings) {
          if (
            Object.prototype.hasOwnProperty.call(categorySettings, settingKey)
          ) {
            const settingValue = categorySettings[
              settingKey as keyof typeof categorySettings
            ] as SETTINGS[keyof typeof categorySettings];

            if (settingValue !== undefined) {
              //console.log("HEREERERERH", settingValue);
              await putRequest(`/settings/${userId}/${settingKey}`, {
                value: settingValue,
              });
            }
          }
        }
      }
    }
  } catch (error: any) {
    console.error("Error updating settings:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to update settings"
    );
  }
};

// ----------------------- RESET SETTINGS -----------------------
export const ResetUserSetting = async (
  userId: string,
  settingKey: string
): Promise<void> => {
  try {
    await deleteRequest(`/settings/${userId}/${settingKey}`);
  } catch (error: any) {
    console.error("Error resetting setting:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to reset setting");
  }
};
