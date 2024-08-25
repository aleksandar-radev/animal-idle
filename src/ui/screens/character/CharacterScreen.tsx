import './CharacterScreen.scss';
import CharactersList from '@/ui/components/character/CharactersList';
import useStore from '@/hooks/useStore';
import useCharacterMethods from '@/hooks/useCharacterMethods';

const CharacterScreen = () => {
  const { data, settings } = useStore();
  const cm = useCharacterMethods();

  const getActiveCharacter = () => {
    return settings.activeCharacter;
  };

  const handleSelectDeck = (deckIndex: number) => () => {
    cm.setActiveDeck(deckIndex);
  };

  return (
    <div className={'CharacterScreen'}>
      {!getActiveCharacter() && (
        <div className="decks">
          {!getActiveCharacter() &&
            cm.getAllDecks().map((deck) => (
              <div
                key={deck.index}
                className={`deck ${data.activeDeckIndex === deck.index ? 'selected' : ''}`}
                onClick={handleSelectDeck(deck.index)}>
                {deck.name}
              </div>
            ))}
        </div>
      )}
      <CharactersList></CharactersList>
    </div>
  );
};

export default CharacterScreen;
