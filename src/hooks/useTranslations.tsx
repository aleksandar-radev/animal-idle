import { translations } from '../helpers/constants/translations';
import useStore from './useStore';

const useTranslations = () => {
  const { data } = useStore();

  return translations[data.language || 'en'];
};

export default useTranslations;
