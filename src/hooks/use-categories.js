import { useQuery } from '@tanstack/react-query';
import { classicApi } from '../api/axios';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'], 
    queryFn: async () => {
      const response = await classicApi.get('/categories'); 
      return response.data.map(cat => ({
        label: cat.name,
        value: cat.id
      }));
    },
  });
};