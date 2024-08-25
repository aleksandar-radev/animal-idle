import { useContext } from 'react';
import './ShopCharacters.scss';
import useGameStore from '@/hooks/general/useGameStore';
import ShopCharactersList from './ShopCharactersList';

const ShopCharacters = () => {
  const store = useGameStore();

  return (
    <>
      <ShopCharactersList />
    </>
  );
};

export default ShopCharacters;
