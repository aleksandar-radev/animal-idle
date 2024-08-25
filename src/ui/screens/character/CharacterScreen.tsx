import './CharacterScreen.scss';
import CharactersList from '@/ui/components/character/CharactersList';
import useGameStore from '@/hooks/general/useGameStore';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';

const CharacterScreen = () => {
  const { data, settings } = useGameStore();
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
