import * as i18next from "i18next";
import { reactI18nextModule } from "react-i18next";

const resources = {
    en: {
        translation: require("./locales/en/en.json")
    }
};

const i18n = i18next
    .use(reactI18nextModule)
    .init({
        resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        react: {
            wait: true
        }
    });

export default i18n;