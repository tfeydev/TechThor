// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';
import translationPT from './locales/pt/translation.json'; // <-- Ordner muss "pt" heißen

const resources = {
  en: { translation: translationEN },
  de: { translation: translationDE },
  pt: { translation: translationPT }, // <-- Verwende "pt" statt "pt-BR"
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    load: 'languageOnly', // <-- wichtige Ergänzung!
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
