import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useDeviceSettings } from "@/context/SettingContext";
import { useSetting } from "@/hooks/useSettings";
import { SETTINGS } from "@/Services/SettingTypes";

const AppearanceSettings = () => {
  // States for toggles and dropdowns
  const { value: fontSize, updateSetting: setFontSize } = useSetting(
    "appearance",
    "fontSize"
  );
  const { deviceSettings, updateDeviceSetting } = useDeviceSettings();
  const { value: animationEnabled, updateSetting: setAnimationEnabled } =
    useSetting("appearance", "animationEnabled");

  // List of appearance settings options
  const appearanceOptions: SettingOptionGroupProp[] = [
    {
      id: "1",
      items: [
        {
          id: "4",
          label: "Theme",
          type: "dropdown",
          dropdownOptions: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
            { label: "System Default", value: "system" },
          ],
          dropdownValue: deviceSettings[
            "theme"
          ] as SETTINGS["appearance"]["theme"],
          onDropdownChange: (val) => updateDeviceSetting("theme", val),
        },
        {
          id: "2",
          label: "Font Size",
          type: "dropdown",
          dropdownOptions: [
            { label: "Small", value: "Small" },
            { label: "Medium", value: "Medium" },
            { label: "Large", value: "Large" },
          ],
          dropdownValue: fontSize as SETTINGS["appearance"]["fontSize"],
          onDropdownChange: (val) =>
            setFontSize(val as SETTINGS["appearance"]["fontSize"]),
        },

        {
          id: "6",
          label: "Animation Effects",
          type: "toggle",
          value: animationEnabled as SETTINGS["appearance"]["animationEnabled"],
          onToggle: (val) => setAnimationEnabled(val),
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={appearanceOptions} />;
};

export default AppearanceSettings;
