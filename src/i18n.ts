import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import plTranslation from "./locales/pl/translation.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  pl: {
    translation: plTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pl", // language to use, more languages can be added later
  interpolation: {
    escapeValue: false, // react already escapes values
  },
});

export default i18n;
