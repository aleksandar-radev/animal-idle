import Requirement from '@/models/Requirement';
import './RequirementsView.scss';
import useTranslations from '@/hooks/general/useTranslations';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import useCurrencies from '@/hooks/gameMethods/useCurrencies';

const RequirementsView = ({ requirements }) => {
  const t = useTranslations();
  const cm = useCharacterMethods();
  const currencies = useCurrencies();
  const activeCharacter = cm.getActiveCharacter();

  const isRequirementMet = (req: Requirement) => {
    switch (req.type) {
      case Requirement.REQUIREMENT_TYPE_LEVEL:
        return activeCharacter.level >= req.value;
      case Requirement.REQUIREMENT_TYPE_CURRENCY:
        const currency = currencies.getCurrency(req.innerType);
        return currency && currency.value >= req.value;
      case Requirement.REQUIREMENT_TYPE_SKILL:
        const skill = activeCharacter.skills[req.innerType];
        return skill && skill.level >= req.value;
      case Requirement.REQUIREMENT_TYPE_CHARACTER_UNLOCKED:
        const character = cm.getActiveCharacterByType(req.innerType);
        return character && character.isUnlocked;
      case Requirement.REQUIREMENT_TYPE_CHARACTER_TYPE:
        return activeCharacter.type === req.innerType;
      // case Requirement.REQUIREMENT_TYPE_UPGRADE:
      //   return cm.getUpgradeLevel(req.innerType) >= req.value;
      default:
        return false;
    }
  };

  return (
    <div className="RequirementsView">
      {t['requirements']}:
      {requirements.map((req) => {
        const isMet = isRequirementMet(req);
        return (
          <div key={req.type} className={isMet ? 'requirement-met' : 'requirement-not-met'}>
            {renderRequirement(req, t)}
          </div>
        );
      })}
    </div>
  );
};

const renderRequirement = (req, t) => {
  switch (req.type) {
    case Requirement.REQUIREMENT_TYPE_LEVEL:
      return `${t['level']}: ${req.value}`;
    case Requirement.REQUIREMENT_TYPE_CURRENCY:
      return `${t[req.innerType]}: ${req.value}`;
    case Requirement.REQUIREMENT_TYPE_SKILL:
      return `${t['skill']} ${req.innerType}: ${req.value}`;
    case Requirement.REQUIREMENT_TYPE_CHARACTER_UNLOCKED:
      return `${t['character_unlocked']}: ${req.innerType}`;
    case Requirement.REQUIREMENT_TYPE_CHARACTER_TYPE:
      // Character type is not visible for the user, it is only used internally
      return ``;
    case Requirement.REQUIREMENT_TYPE_UPGRADE:
      return `${t['upgrade']}: ${req.innerType} ${req.value}`;
    default:
      return `${req.type}: ${req.value}`;
  }
};
export default RequirementsView;
