import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { newsApi } from '../services/api'

export function useNews(params = {}) {
  return useQuery({
    queryKey: ['news', params],
    queryFn: () => newsApi.getAll(params).then(res => res.data),
  })
}

export function useCreateNews() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => newsApi.create(data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['news'] }),
  })
}

export function useUpdateNews() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => newsApi.update(id, data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['news'] }),
  })
}

export function useDeleteNews() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => newsApi.delete(id).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['news'] }),
  })
}
