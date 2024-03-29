import axios from 'axios'

type SearchAllProductsParams = {
  pageParam: string
  encodedSearchQuery: string
  encodedSortQuery: string
}

export async function searchAllProducts({
  pageParam,
  encodedSearchQuery,
  encodedSortQuery,
}: SearchAllProductsParams) {
  const response = await axios.get(
    `/api/search?cursor=${pageParam}&query=${encodedSearchQuery}&sort=${encodedSortQuery}`,
  )
  return response.data
}
