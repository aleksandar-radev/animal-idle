import api from './Api.js';

export const SkillsRepo = {
  getSkills: async () => {
    let { data: skills, error } = await api
      .from('skills')
      .select('*')

    if (error) {
      throw new Error(error);
    }
    return skills
  },
};
