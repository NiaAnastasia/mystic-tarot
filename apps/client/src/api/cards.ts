import { apiClient } from './client'

export const cardsApi = {
  getAll: (params?: { suit?: string; arcana?: string; page?: number }) =>
    apiClient.get('/cards', { params }).then((r) => r.data),

  getById: (id: string) =>
    apiClient.get(`/cards/${id}`).then((r) => r.data),

  getRandom: (count: number) =>
    apiClient.get(`/cards/random`, { params: { count } }).then((r) => r.data),

  search: (q: string) =>
    apiClient.get(`/cards/search`, { params: { q } }).then((r) => r.data),
}