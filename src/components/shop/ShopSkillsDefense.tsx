import goldIcon from '../../assets/gold.png';
import { SKILLS_DEFENSE } from '../../helpers/constants/gameVariables';
import { en } from '../../helpers/constants/translations';
import './ShopSkillsDefense.scss';
import useStore from '../../hooks/useStore';

const ShopSkillsDefense = () => {
  const { store } = useStore();
  // const skillsKeys = Object.keys(store.data.skills[SKILLS_DEFENSE]);

  return (
    <>
      {/* {skillsKeys.map((skillKey) => {
        const skill = store.data.skills[SKILLS_DEFENSE][skillKey];
        const skillKeyDescription = skillKey + '-description';
        const bonus = skill.getBonus();
        const description = en[skillKeyDescription](bonus);

        return (
          <div className="ShopSkillsDefense" key={skillKey}>
            <div className="ShopSkillsDefense-icon">
              <img src={skill.icon} />
            </div>

            <div className="ShopSkillsDefense-info">
              <div>
                {en[skillKey]} (Lv. {skill.level})
              </div>
              <div>{description}</div>
            </div>

            <div
              className="ShopSkillsDefense-button"
              onClick={() => {
                skill.buy();
              }}>
              <div>
                <img src={goldIcon} />
                {skill.getCost()}
              </div>
              <div> Level Up</div>
            </div>
          </div>
        );
      })} */}
    </>
  );
};

export default ShopSkillsDefense;
