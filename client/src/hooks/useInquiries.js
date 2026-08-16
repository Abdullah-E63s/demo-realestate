import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { inquiryApi } from '../services/api'

export function useInquiries(params = {}) {
  return useQuery({
    queryKey: ['inquiries', params],
    queryFn: () => inquiryApi.getAll(params).then(res => res.data),
  })
}

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: (data) => inquiryApi.create(data).then(res => res.data),
  })
}

export function useMarkInquiryRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => inquiryApi.markAsRead(id).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiries'] }),
  })
}

export function useDeleteInquiry() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => inquiryApi.delete(id).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiries'] }),
  })
}
