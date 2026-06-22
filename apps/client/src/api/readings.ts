import { apiClient } from './client'

export const readingsApi = {
  create: (data: {
    spreadType: string
    question?: string
    cards: { cardId: string; position: string; isReversed: boolean; order: number }[]
  }) => apiClient.post('/readings', data).then((r) => r.data),

  getAll: () =>
    apiClient.get('/readings').then((r) => r.data),

  getById: (id: string) =>
    apiClient.get(`/readings/${id}`).then((r) => r.data),

  delete: (id: string) =>
    apiClient.delete(`/readings/${id}`).then((r) => r.data),
}