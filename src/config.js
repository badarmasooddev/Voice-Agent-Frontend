import { AuthType } from "@/enum";

/***************************  THEME CONSTANT  ***************************/

export const APP_DEFAULT_PATH = "/on-boarding";
export const APP_SUPPORT_PATH = "https://trixlyai.com";

export const DRAWER_WIDTH = 254;
export const MINI_DRAWER_WIDTH = 76 + 1; // 1px - for right-side border;

/***************************  AUTH CONSTANT  ***************************/

export const AUTH_USER_KEY = "auth-user";
export const AUTH_PROVIDER = AuthType.MOCK;

/***************************  THEME ENUM  ***************************/

export let Themes;
(function (Themes) {
  Themes["THEME_CRM"] = "crm";
  Themes["THEME_AI"] = "ai";
  Themes["THEME_HOSTING"] = "hosting";
})(Themes || (Themes = {}));

export let ThemeMode;
(function (ThemeMode) {
  ThemeMode["LIGHT"] = "light";
  ThemeMode["DARK"] = "dark";
})(ThemeMode || (ThemeMode = {}));

export let ThemeDirection;
(function (ThemeDirection) {
  ThemeDirection["LTR"] = "ltr";
  ThemeDirection["RTL"] = "rtl";
})(ThemeDirection || (ThemeDirection = {}));

export let ThemeI18n;
(function (ThemeI18n) {
  ThemeI18n["EN"] = "en";
  ThemeI18n["FR"] = "fr";
  ThemeI18n["RO"] = "ro";
  ThemeI18n["ZH"] = "zh";
})(ThemeI18n || (ThemeI18n = {}));

/***************************  CONFIG  ***************************/

const config = {
  currentTheme: Themes.THEME_HOSTING,
  mode: ThemeMode.LIGHT,
  themeDirection: ThemeDirection.LTR,
  miniDrawer: false,
  i18n: ThemeI18n.EN,
};

export default config;

/***************************  THEME - FONT FAMILY  ***************************/

export const FONT_ROBOTO = "'Roboto', sans-serif";
export const FONT_ARCHIVO = "'Archivo', sans-serif";
export const FONT_FIGTREE = "'Figtree', sans-serif";
