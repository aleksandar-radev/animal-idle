import goldIcon from '../../assets/gold.png';
import { SHOP_UPGRADES_ATTACK } from '../../constants/gameVariables';
import { en } from '../../constants/translations';
import './ShopUpgradesUtility.scss';
import useStore from '../../hooks/useStore';

const ShopUpgradesUtility = () => {
  const { store } = useStore();
  const upgradesKeys = Object.keys(store.data.upgrades[SHOP_UPGRADES_ATTACK]);

  return (
    <>
      {upgradesKeys.map((upgradeKey) => {
        const upgrade = store.data.upgrades[SHOP_UPGRADES_ATTACK][upgradeKey];
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
