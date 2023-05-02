import { useContext } from 'react';
import { State } from '../../api/Store';
import goldIcon from '../../assets/gold.png';
import swordIcon from '../../assets/sword.png';
import { SHOP_UPGRADES_ATACK } from '../../constants/gameVariables';
import { en } from '../../constants/translations';
import './ShopUpgradesAtack.scss';

const ShopUpgradesAtack = () => {
  const [store] = useContext(State);
  const upgradesKeys = Object.keys(store.data.upgrades[SHOP_UPGRADES_ATACK]);

  return (
    <>
      {upgradesKeys.map((upgradeKey) => {
        const upgrade = store.data.upgrades[SHOP_UPGRADES_ATACK][upgradeKey];
        const upgradeKeyDescription = upgradeKey + '-description';
        const bonus = upgrade.getBonus();
        const description = en[upgradeKeyDescription](bonus);

        return (
          <div className="ShopUpgradesAtack" key={upgradeKey}>
            <div className="ShopUpgradesAtack-icon">
              <img src={swordIcon} />
            </div>

            <div className="ShopUpgradesAtack-info">
              <div>
                {en[upgradeKey]} (Lv. {upgrade.level})
              </div>
              <div>{description}</div>
            </div>

            <div
              className="ShopUpgradesAtack-button"
              onClick={() => {
                upgrade.buy();
              }}>
              <div>
                <img src={goldIcon} />
                {upgrade.getCost()}
              </div>
              <div> Level Up</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopUpgradesAtack;
