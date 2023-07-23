import { useContext } from 'react';
import { State } from '../api/Store';
import { translations } from '../constants/translations';

const useTranslations = () => {
  const [store] = useContext(State);

  return translations[store.language || 'en'];
};

export default useTranslations;
