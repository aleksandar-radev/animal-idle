import { translations } from '@/utils/translations/translations';
import useGameStore from './useGameStore';

const useTranslations = () => {
  const { data } = useGameStore();
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
