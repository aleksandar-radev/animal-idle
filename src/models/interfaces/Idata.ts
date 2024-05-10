export interface IData {
  dataVersion: string;
  language: string;
  characters: {
    [key: string]: {
      level: number;
      experience: number;
      isUnlocked: boolean;
      skills: {
        [key: string]: {
          [key: string]: {
            level: number;
          };
        };
      };
    };
  };
  totalDecks: number;
  activeDeckIndex: number;
  decks: string[][];
  charactersMap: {
    [key: number]: string;
  };
  enemy: {
    level: number;
  };
  renderChanges: number;
  renderChange: () => void;
  currencies: {
    [key: string]: {
      value: number;
    };
  };
  id: number;
  highest_level: number | null;
  premium: string;
  total_experience: number | null;
  total_gold: number | null;
}
