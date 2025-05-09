import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import i18n from "../../locale";

type langContextObj = {
  lang: string | null;
  toggleLanguage: (sLang: string) => void;
};

const LangContext = React.createContext<langContextObj>({
  lang: "fa",
  toggleLanguage: (slang) => {},
});

export const LangContextProvider: React.FC<{ children: any }> = (props) => {
  const [lang, setLang] = useLocalStorage("language", "fa");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  function toggleLanguage(sLang: string) {
    setLang(sLang);
  }

  const langValue: langContextObj = {
    lang,
    toggleLanguage,
  };

  return (
    <LangContext.Provider value={langValue}>
      {props.children}
    </LangContext.Provider>
  );
};

export default LangContext;
