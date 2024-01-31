# Shop Upgrades

### Attack

Bonus Flat Damage: increases damage of `ALL` damage skills by flat amount

Bonus Percent Damage: increases damage of `ALL` damage skills by %

Crit Chance: increases chance to crit of `ALL` damage skills

Crit Damage: increases crit damage of `ALL` damage skills

Attack Speed: reduces cooldown of basic `Attack` skill.

Double Damage Chance: increases chance to deal double damage.

### Defense

Flat Damage Reduction: Reduces damage taken by flat amount

Increase Heal Amount: Increases health restores by `Heal` skill

Code logic is as follows:

All getters should be accessed by useStore() hook, which itself calls the getters from the `models` folder. If you need to get the level of the character, you call

```
store.getCharacter(charType).getLevel();
```

All actions, that means attacking, killing, dying, upgrading, etc. are in `hooks` folder
All game logic should be there.
Additionaly, all requests to the database also happen in `hooks` folder. Currently (possibly forever) are 2 files dealing with database. `useDataManager` and `useDataRepo`;

Files in `components` and `screens` folders, MUST NOT contain any game logic, but instead call hooks. They should only contain logic on how things should be rendered.

### NOTE

`if there is any code not aligned with these rules, it has to be changed`
