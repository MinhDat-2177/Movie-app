import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        signIn: "Sign In",
        username: "Username",
        password: "Password",
        rememberMe: "Remember me",
        language: "Language",
      },
    },
    vi: {
      translation: {
        signIn: "Đăng nhập",
        username: "Tên đăng nhập",
        password: "Mật khẩu",
        rememberMe: "Nhớ mật khẩu",
        language: "Ngôn ngữ",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
