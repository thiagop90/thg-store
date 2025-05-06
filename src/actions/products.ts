import axios from 'axios'

type SearchProductsParams = {
  lastCursor?: string
  searchQuery?: string
  sortQuery?: string
}

export async function searchProducts({
  lastCursor = '',
  searchQuery = '',
  sortQuery = '',
}: SearchProductsParams) {
  const response = await axios.get('/api/search', {
    params: {
      lastCursor,
      query: searchQuery,
      sort: sortQuery,
    },
  })
  return response.data
}

export type Product = {
  name: string
  id: string
  slug: string
  category: {
    id: string
    slug: string
  }
}

export async function fetchAllProducts(): Promise<Product[]> {
  const response = await axios.get<Product[]>('/api/products')
  return response.data
}
