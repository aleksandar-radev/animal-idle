import { useContext } from 'react';
import { State } from '../../api/Store';
import goldIcon from '../../assets/gold.png';
import { SHOP_UPGRADES_ATACK } from '../../constants/gameVariables';
import { en } from '../../constants/translations';
import './ShopUpgradesUtility.scss';

const ShopUpgradesUtility = () => {
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
          <div className="ShopUpgradesUtility" key={upgradeKey}>
            <div className="ShopUpgradesUtility-icon">
              <img src={upgrade.getImgUrl()} />
            </div>

            <div className="ShopUpgradesUtility-info">
              <div>
                {en[upgradeKey]} (Lv. {upgrade.level})
              </div>
              <div>{description}</div>
            </div>

            <div
              className="ShopUpgradesUtility-button"
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

export default ShopUpgradesUtility;
