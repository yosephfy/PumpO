import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useSetting } from "@/hooks/useSettings";
import { SETTINGS } from "@/Services/SettingTypes";

const AppearanceSettings = () => {
  // States for toggles and dropdowns
  const { value: fontSize, updateSetting: setFontSize } = useSetting(
    "appearance",
    "fontSize"
  );
  const { value: theme, updateSetting: setTheme } = useSetting(
    "appearance",
    "theme"
  );
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
            { label: "Light", value: "Light" },
            { label: "Dark", value: "Dark" },
            { label: "System Default", value: "System Default" },
          ],
          dropdownValue: theme as SETTINGS["appearance"]["theme"],
          onDropdownChange: (val) =>
            setTheme(val as SETTINGS["appearance"]["theme"]),
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
