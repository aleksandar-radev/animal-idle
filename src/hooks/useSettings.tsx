import useStore from './useStore';

const useSettings = () => {
  const { settings } = useStore();

  return settings;
};

export default useSettings;
