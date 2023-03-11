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

  updateResources: async (resources, values) => {
    const { data, error } = await api
      .from('resources')
      .update(values)
      .eq('user_id', resources.user_id)
      .select()
      .maybeSingle();

    if (error) {
      throw new Error('Unable to update resources')
    }

    return data;
  },

  insertResources: async (user) => {
    const { data, error } = await api
      .from('resources')
      .insert([
        { user_id: user.id },
      ]);

    if (error) {
      throw new Error(error)
    }

    return data;
  },
};
