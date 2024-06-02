import { translations } from '../helpers/translations/translations';
import useStore from './useStore';

const useTranslations = () => {
  const { data } = useStore();

  return translations[data.language || 'en'];
};

export default useTranslations;
