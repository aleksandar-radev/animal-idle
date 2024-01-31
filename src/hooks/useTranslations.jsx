import { translations } from '../constants/translations';
import useStore from './useStore';

const useTranslations = () => {
  const { store } = useStore();

  return translations[store.language || 'en'];
};

export default useTranslations;
