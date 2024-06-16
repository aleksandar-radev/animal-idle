class Settings {
  private _activeMainScreenTab: string;
  private _activeCharacterScreenTab: string;
  private _activeShopScreenTab: string;
  private _activeCharacter: any;
  private _areCharactersDraggable: boolean;
  private _isFightStarted: boolean;

  static MAIN_SCREEN_CHARACTER_TAB = 'character';
  static MAIN_SCREEN_FIGHT_TAB = 'fight';
  static MAIN_SCREEN_SHOP_TAB = 'shop';
  static MAIN_SCREEN_LEADERBOARD_TAB = 'leaderboard';
  static MAIN_SCREEN_SETTINGS_TAB = 'settings';
  static MAIN_SCREEN_ADMIN_TAB = 'admin';

  static CHARACTER_SCREEN_STATS_TAB = 'stats';
  static CHARACTER_SCREEN_SKILLS_TAB = 'skills';
  static CHARACTER_SCREEN_ITEMS_TAB = 'items';

  static SHOP_SCREEN_CHARACTERS_TAB = 'charactersTab';
  static SHOP_SCREEN_DECKS_TAB = 'decksTab';
  static SHOP_SCREEN_UTILITY_TAB = 'utility';

  constructor() {
    this.activeMainScreenTab = Settings.MAIN_SCREEN_CHARACTER_TAB;
    this.activeCharacterScreenTab = Settings.CHARACTER_SCREEN_STATS_TAB;
    this.activeShopScreenTab = Settings.SHOP_SCREEN_CHARACTERS_TAB;
    this.activeCharacter = null;
    this.areCharactersDraggable = false;
    this.isFightStarted = false;
  }

  // Getters and Setters
  get activeMainScreenTab(): string {
    return this._activeMainScreenTab;
  }

  set activeMainScreenTab(value: string) {
    this._activeMainScreenTab = value;
  }

  get activeCharacterScreenTab(): string {
    return this._activeCharacterScreenTab;
  }

  set activeCharacterScreenTab(value: string) {
    this._activeCharacterScreenTab = value;
  }

  get activeShopScreenTab(): string {
    return this._activeShopScreenTab;
  }

  set activeShopScreenTab(value: string) {
    this._activeShopScreenTab = value;
  }

  get activeCharacter(): any {
    return this._activeCharacter;
  }

  set activeCharacter(value: any) {
    this._activeCharacter = value;
  }

  get areCharactersDraggable(): boolean {
    return this._areCharactersDraggable;
  }

  set areCharactersDraggable(value: boolean) {
    this._areCharactersDraggable = value;
  }

  get isFightStarted(): boolean {
    return this._isFightStarted;
  }

  set isFightStarted(value: boolean) {
    this._isFightStarted = value;
  }
}

export default Settings;
