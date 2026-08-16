import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { propertyApi } from '../services/api'

export function useProperties(params = {}) {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => propertyApi.getAll(params).then(res => res.data),
    keepPreviousData: true,
  })
}

export function useFeaturedProperties() {
  return useQuery({
    queryKey: ['properties', 'featured'],
    queryFn: () => propertyApi.getFeatured().then(res => res.data),
  })
}

export function usePropertyStats() {
  return useQuery({
    queryKey: ['properties', 'stats'],
    queryFn: () => propertyApi.getStats().then(res => res.data),
  })
}

export function useCreateProperty() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => propertyApi.create(data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['properties'] }),
  })
}

export function useUpdateProperty() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => propertyApi.update(id, data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['properties'] }),
  })
}

export function useDeleteProperty() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => propertyApi.delete(id).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['properties'] }),
  })
}
