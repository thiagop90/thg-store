import axios from 'axios'

type GetAllProductsParams = {
  lastCursor?: string
  encodedSearchQuery?: string
  encodedSortQuery?: string
}

export async function getAllProducts({
  lastCursor,
  encodedSearchQuery,
  encodedSortQuery,
}: GetAllProductsParams) {
  const response = await axios.get(
    `/api/search?lastCursor=${lastCursor}&query=${encodedSearchQuery}&sort=${encodedSortQuery}`,
  )
  return response.data
}
