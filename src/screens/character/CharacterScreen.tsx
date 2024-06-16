import './CharacterScreen.scss';
import CharactersList from '../../components/character/CharactersList';
import useStore from '../../hooks/useStore';

const CharacterScreen = () => {
  const { data, settings } = useStore();

  const getDecks = () => {
    return Object.keys(data.decks);
  };

  const getActiveCharacter = () => {
    return settings.activeCharacter;
  };

  return (
    <div className={'CharacterScreen'}>
      {!getActiveCharacter() && (
        <div className="decks">
          {!getActiveCharacter() &&
            getDecks().map((deck) => (
              <div key={deck} className="deck">
                {deck}
              </div>
            ))}
        </div>
      )}
      <CharactersList></CharactersList>
    </div>
  );
};

export default CharacterScreen;
