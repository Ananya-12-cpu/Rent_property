import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProperties,
  fetchPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "@/lib/api/properties";
import { PropertyFilters, Property } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { showNotification } from "@/store/slices/uiSlice";

export const PROPERTIES_KEY = "properties";

export function useProperties(filters?: PropertyFilters) {
  return useQuery({
    queryKey: [PROPERTIES_KEY, filters],
    queryFn: () => fetchProperties(filters),
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: [PROPERTIES_KEY, id],
    queryFn: () => fetchPropertyById(id),
    enabled: !!id,
  });
}

export function useCreateProperty() {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: Omit<Property, "id" | "createdAt" | "updatedAt">) =>
      createProperty(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [PROPERTIES_KEY] });
      dispatch(showNotification({ message: "Property added successfully!", type: "success" }));
    },
    onError: (err: Error) => {
      dispatch(showNotification({ message: err.message, type: "error" }));
    },
  });
}

export function useUpdateProperty() {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Property> }) =>
      updateProperty(id, data),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: [PROPERTIES_KEY] });
      qc.setQueryData([PROPERTIES_KEY, updated.id], updated);
      dispatch(showNotification({ message: "Property updated successfully!", type: "success" }));
    },
    onError: (err: Error) => {
      dispatch(showNotification({ message: err.message, type: "error" }));
    },
  });
}

export function useDeleteProperty() {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (id: string) => deleteProperty(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [PROPERTIES_KEY] });
      dispatch(showNotification({ message: "Property deleted.", type: "info" }));
    },
  });
}
