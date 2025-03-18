import Requirement from '@/models/Requirement';
import './RequirementsView.scss';
import useTranslations from '@/hooks/general/useTranslations';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import useCurrenciesMethods from '@/hooks/gameMethods/useCurrenciesMethods';
import useRequirementMethods from '@/hooks/gameMethods/useRequirementMethods';

const RequirementsView = ({ resource }) => {
  const t = useTranslations();
  const cm = useCharacterMethods();
  const currencies = useCurrenciesMethods();
  const activeCharacter = cm.getActiveCharacter();
  const requirementMethods = useRequirementMethods();
  const requirements = resource.requirements;

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

  const renderRequirement = (req, t) => {
    const totalValue = requirementMethods.getRequirementValue(req, resource);
    switch (req.type) {
      case Requirement.REQUIREMENT_TYPE_LEVEL:
        return `${t['level']}: ${totalValue}`;
      case Requirement.REQUIREMENT_TYPE_CURRENCY:
        return `${t[req.innerType]}: ${totalValue}`;
      case Requirement.REQUIREMENT_TYPE_SKILL:
        return `${t['skill']} ${req.innerType}: ${totalValue}`;
      case Requirement.REQUIREMENT_TYPE_CHARACTER_UNLOCKED:
        return `${t['character_unlocked']}: ${req.innerType}`;
      case Requirement.REQUIREMENT_TYPE_CHARACTER_TYPE:
        // Character type is not visible for the user, it is only used internally
        return ``;
      case Requirement.REQUIREMENT_TYPE_UPGRADE:
        return `${t['upgrade']}: ${req.innerType} ${totalValue}`;
      default:
        return `${req.type}: ${totalValue}`;
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

export default RequirementsView;
