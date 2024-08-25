import { useContext } from 'react';
import './ShopCharacters.scss';
import useStore from '@/hooks/useStore';
import ShopCharactersList from './ShopCharactersList';

const ShopCharacters = () => {
  const store = useStore();

  return (
    <>
      <ShopCharactersList />
    </>
  );
};

export default ShopCharacters;
