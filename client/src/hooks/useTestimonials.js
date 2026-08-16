import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { testimonialApi } from '../services/api'

export function useTestimonials(params = {}) {
  return useQuery({
    queryKey: ['testimonials', params],
    queryFn: () => testimonialApi.getAll(params).then(res => res.data),
  })
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => testimonialApi.create(data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testimonials'] }),
  })
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => testimonialApi.update(id, data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testimonials'] }),
  })
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => testimonialApi.delete(id).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testimonials'] }),
  })
}
