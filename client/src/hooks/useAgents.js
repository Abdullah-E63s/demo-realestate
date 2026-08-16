import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { agentApi } from '../services/api'

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: () => agentApi.getAll().then(res => res.data),
  })
}

export function useCreateAgent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => agentApi.create(data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
  })
}

export function useUpdateAgent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => agentApi.update(id, data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
  })
}

export function useDeleteAgent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => agentApi.delete(id).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
  })
}
