import goldIcon from '../../assets/gold.png';
import { SKILLS_ATTACK } from '../../helpers/constants/gameVariables';
import { en } from '../../helpers/constants/translations';
import './ShopSkillsUtility.scss';
import useStore from '../../hooks/useStore';

const ShopSkillsUtility = () => {
  const { store } = useStore();
  // const skillsKeys = Object.keys(store.data.skills[SKILLS_ATTACK]);

  return (
    <>
      {/* {skillsKeys.map((skillKey) => {
        const skill = store.data.skills[SKILLS_ATTACK][skillKey];
        const skillKeyDescription = skillKey + '-description';
        const bonus = skill.getBonus();
        const description = en[skillKeyDescription](bonus);

        return (
          <div className="ShopSkillsUtility" key={skillKey}>
            <div className="ShopSkillsUtility-icon">
              <img src={skill.icon} />
            </div>

            <div className="ShopSkillsUtility-info">
              <div>
                {en[skillKey]} (Lv. {skill.level})
              </div>
              <div>{description}</div>
            </div>

            <div
              className="ShopSkillsUtility-button"
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

export default ShopSkillsUtility;
