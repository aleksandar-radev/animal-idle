import useGameStore from '../general/useGameStore';
import Requirement from '@/models/Requirement';

const useRequirementMethods = () => {
  const { data } = useGameStore();

  const methods = {
    areRequirementsMet(resource: any): boolean {
      let requirementsMet = true;
      if (!resource.requirements) {
        throw new Error('No requirements provided');
      }
      const requirements = resource.requirements;
      requirements.forEach((requirement: Requirement) => {
        let totalRequirement = methods.getRequirementValue(requirement, resource);
        log(resource);
        log(totalRequirement);
        if (requirement.type === Requirement.REQUIREMENT_TYPE_CURRENCY) {
          if (totalRequirement > data.currencies[requirement.innerType].value) {
            requirementsMet = false;
          }
        }
        if (requirement.type === Requirement.REQUIREMENT_TYPE_LEVEL) {
          if (totalRequirement > data.characters[requirement.innerType].level) {
            requirementsMet = false;
          }
        }
      });
      return requirementsMet;
    },

    removeRequirementResources(resource: any) {
      if (!resource.requirements) {
        throw new Error('No requirements provided');
      }
      const requirements = resource.requirements;
      requirements.forEach((requirement: Requirement) => {
        let totalRequirement = methods.getRequirementValue(requirement, resource);
        if (requirement.type === Requirement.REQUIREMENT_TYPE_CURRENCY) {
          data.currencies[requirement.innerType].value -= totalRequirement;
        }
      });
    },

    getRequirementValue(requirement, resource) {
      let totalRequirement = requirement.value;
      if (requirement.modifierType === Requirement.REQUIREMENT_MODIFIER_TYPE_LEVEL) {
        totalRequirement += Math.floor(requirement.modifier * (resource[requirement.modifierType] - 1));
      }
      return totalRequirement;
    },
  };

  return methods;
};

export default useRequirementMethods;
