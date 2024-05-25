import './CharacterScreen.scss';
import CharactersList from '../../components/character/CharactersList';

const CharacterScreen = () => {
  return (
    <div className={'CharacterScreen'}>
      <CharactersList></CharactersList>
    </div>
  );
};

export default CharacterScreen;
