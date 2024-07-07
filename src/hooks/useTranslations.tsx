import { translations } from '../helpers/translations/translations';
import useStore from './useStore';

const useTranslations = () => {
  const { data } = useStore();
  const language = data.language || 'en';

  return new Proxy(
    {},
    {
      get: (target, prop) => {
        if (typeof prop === 'string') {
          return translations[language][prop] || prop;
        }
        return undefined;
      },
    },
  );
};

export default useTranslations;
