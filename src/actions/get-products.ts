import axios from 'axios'

type GetProductsResponse = {
  name: string
  id: string
  slug: string
  category: {
    id: string
    slug: string
  }
}[]

export async function getProducts() {
  const response = await axios.get<GetProductsResponse>('/api/products')

  return response.data
}
