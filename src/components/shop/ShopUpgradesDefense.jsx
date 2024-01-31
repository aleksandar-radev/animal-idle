import goldIcon from '../../assets/gold.png';
import { SHOP_UPGRADES_DEFENSE } from '../../constants/gameVariables';
import { en } from '../../constants/translations';
import './ShopUpgradesDefense.scss';
import useStore from '../../hooks/useStore';

const ShopUpgradesDefense = () => {
  const { store } = useStore();
  const upgradesKeys = Object.keys(store.data.upgrades[SHOP_UPGRADES_DEFENSE]);

  return (
    <>
      {upgradesKeys.map((upgradeKey) => {
        const upgrade = store.data.upgrades[SHOP_UPGRADES_DEFENSE][upgradeKey];
        const upgradeKeyDescription = upgradeKey + '-description';
        const bonus = upgrade.getBonus();
        const description = en[upgradeKeyDescription](bonus);

        return (
          <div className="ShopUpgradesDefense" key={upgradeKey}>
            <div className="ShopUpgradesDefense-icon">
              <img src={upgrade.getImgUrl()} />
            </div>

            <div className="ShopUpgradesDefense-info">
              <div>
                {en[upgradeKey]} (Lv. {upgrade.level})
              </div>
              <div>{description}</div>
            </div>

            <div
              className="ShopUpgradesDefense-button"
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

export default ShopUpgradesDefense;
