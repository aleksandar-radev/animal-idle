import { useContext } from 'react';
import { State } from '../../api/Store';
import goldIcon from '../../assets/gold.png';
import { SKILLS_ATTACK } from '../../constants/gameVariables';
import { en } from '../../constants/translations';
import './ShopSkillsAttack.scss';
import useStore from '../../hooks/useStore';

const ShopSkillsAttack = () => {
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
          <div className="ShopSkillsAttack" key={skillKey}>
            <div className="ShopSkillsAttack-icon">
              <img src={skill.getImgUrl()} />
            </div>

            <div className="ShopSkillsAttack-info">
              <div>
                {en[skillKey]} (Lv. {skill.level})
              </div>
              <div>{description}</div>
            </div>

            <div
              className="ShopSkillsAttack-button"
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

export default ShopSkillsAttack;
