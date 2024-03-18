import { getCategories } from '@/actions/get-categories'
import { useQuery } from '@tanstack/react-query'

export function useGetCategories(searchQuery: string) {
  const { data: filteredCategories = [], isLoading: isLoadingCategories } =
    useQuery({
      queryKey: ['categories', searchQuery],
      queryFn: () => getCategories(searchQuery),
      enabled: !!searchQuery,
    })

  return {
    filteredCategories,
    isLoadingCategories,
  }
}
