import { getProducts } from '@/actions/get-products'
import { useQuery } from '@tanstack/react-query'

export function useGetProducts(searchQuery: string) {
  const { data: filteredProducts = [], isLoading: isLoadingProducts } =
    useQuery({
      queryKey: ['products', searchQuery],
      queryFn: () => getProducts(searchQuery),
      enabled: !!searchQuery,
    })

  return {
    filteredProducts,
    isLoadingProducts,
  }
}
