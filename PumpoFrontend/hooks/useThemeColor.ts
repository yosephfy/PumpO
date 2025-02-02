/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useDeviceSettings } from "@/context/SettingContext";
import { useColorScheme } from "@/hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const systemTheme = useColorScheme() ?? "light";

  const { deviceSettings, loading } = useDeviceSettings();
  const theme =
    !loading && deviceSettings.theme
      ? deviceSettings.theme == "system"
        ? systemTheme
        : deviceSettings.theme
      : systemTheme;

  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
