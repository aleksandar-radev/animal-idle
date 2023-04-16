import React, { useContext } from 'react';
import { State } from '../api/Store';
import goldIcon from '../assets/gold.png';
import swordIcon from '../assets/sword.png';
import { SHOP_UPGRADES_ATACK } from '../constants/gameVariables';
import { en } from '../constants/translations';
import { upgrades } from '../helpers/upgrades';
import './ShopUpgradesAtack.scss';

const ShopUpgradesAtack = () => {
  const [store] = useContext(State);

  const buyUpgrade = (upg) => {
    upgrades[upg].buy(store);
  };

  const renderUpgrades = () => {
    const upgradesKeys = Object.keys(store.data.upgrades[SHOP_UPGRADES_ATACK]);

    return upgradesKeys.map((upgradeKey) => {
      const upgrade = store.data.upgrades[SHOP_UPGRADES_ATACK][upgradeKey];
      const upgradeKeyDescription = upgradeKey + '-description';
      const bonus = upgrades[upgradeKey].getBonus(upgrade.level);
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

          <div className="ShopUpgradesAtack-button" onClick={() => buyUpgrade(upgradeKey)}>
            <div>
              <img src={goldIcon} />
              {upgrades[upgradeKey].getCost(upgrade.level)}
            </div>
            <div> Level Up</div>
          </div>
        </div>
      );
    });
  };

  return <>{renderUpgrades()}</>;
};

export default ShopUpgradesAtack;
