import useGameStore from './useGameStore';

const useSettings = () => {
  const { settings } = useGameStore();

  return settings;
};

export default useSettings;
