import { TASK_APP_QUERY_KEYS } from "@constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Category } from "@shared/types";
import { categoryApi } from "@api/client.api";

export const useCategories = () =>
  useQuery<Category[], Error>({
    queryKey: [TASK_APP_QUERY_KEYS.CATEGORIES],
    queryFn: () => categoryApi.getAll(),
  });

export const useCategory = (categoryId: number) =>
  useQuery<Category, Error>({
    queryKey: [TASK_APP_QUERY_KEYS.CATEGORY, categoryId],
    queryFn: () => categoryApi.getById(categoryId),
    enabled: !!categoryId,
  });

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Category>({
    mutationFn: (category: Category) => categoryApi.delete(category.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_APP_QUERY_KEYS.CATEGORIES],
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Category>({
    mutationFn: (category: Category) =>
      categoryApi.update(category.id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_APP_QUERY_KEYS.CATEGORIES],
      });
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Omit<Category, "id">>({
    mutationFn: (category: Omit<Category, "id">) =>
      categoryApi.create(category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_APP_QUERY_KEYS.CATEGORIES],
      });
    },
  });
};
