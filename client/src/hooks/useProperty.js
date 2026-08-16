import { useQuery } from '@tanstack/react-query'
import { propertyApi } from '../services/api'

export function useProperty(id) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => propertyApi.getById(id).then(res => res.data),
    enabled: !!id,
  })
}
