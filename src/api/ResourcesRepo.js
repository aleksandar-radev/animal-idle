import api from './Api.js';

export const ResourcesRepo = {
  getResources: async (id) => {
    if (!id) {
      throw new Error('User not found');
    }

    let { data: resources, error } = await api
      .from('resources')
      .select("*")
      .eq('user_id', id)
      .maybeSingle();

    if (error) {
      throw new Error(error);
    }

    if (Array.isArray(resources)) {
      throw new Error('Result contains information for other users as well. That is not allowed')
    }

    return resources;
  },

  updateResources: async (resources) => {
    const { data, error } = await api
      .from('resources')
      .update({ gold: resources.gold + 1 })
      .eq('user_id', resources.user_id)
      .select()
      .maybeSingle();

    return data;
  },
};
