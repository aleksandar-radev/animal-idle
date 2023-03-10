import api from './Api.js';

export const ResourcesRepo = {

  getResources: async (id) => {
    if (!id) {
      throw new Error('User not found');
    }
    let { data: resources, error } = await api
      .from('resources')
      .select("*")
      .eq('user_id', id);

    if (error) {
      throw new Error(error);
    }

    return resources;
  },
};
