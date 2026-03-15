"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { propertySchema, PropertyFormData } from "@/lib/validations/propertySchema";
import { useCreateProperty, useUpdateProperty } from "@/hooks/useProperties";
import { useAuth } from "@/hooks/useAuth";
import { Property } from "@/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const typeOptions = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
  { value: "penthouse", label: "Penthouse" },
];

const statusOptions = [
  { value: "available", label: "Available" },
  { value: "rented", label: "Rented" },
  { value: "maintenance", label: "Under Maintenance" },
];

export function PropertyForm({ existing }: { existing?: Property }) {
  const { user } = useAuth();
  const router = useRouter();
  const createMutation = useCreateProperty();
  const updateMutation = useUpdateProperty();
  const isEditing = !!existing;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<PropertyFormData>({
    resolver: yupResolver(propertySchema) as any,
    defaultValues: existing
      ? {
          title: existing.title,
          description: existing.description,
          type: existing.type,
          status: existing.status,
          price: existing.price,
          bedrooms: existing.bedrooms,
          bathrooms: existing.bathrooms,
          area: existing.area,
          address: existing.location.address,
          city: existing.location.city,
          state: existing.location.state,
          zip: existing.location.zip,
          country: existing.location.country,
          amenities: existing.amenities.join(", "),
          featured: existing.featured,
        }
      : { type: "apartment", status: "available", country: "USA", featured: false },
  });

  const onSubmit = async (data: PropertyFormData) => {
    const propertyData = {
      title: data.title,
      description: data.description,
      type: data.type,
      status: data.status,
      price: data.price,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      area: data.area,
      location: {
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
      },
      amenities: data.amenities ? data.amenities.split(",").map((a) => a.trim()).filter(Boolean) : [],
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"],
      createdBy: user?.id ?? "",
      featured: data.featured ?? false,
    };

    if (isEditing) {
      await updateMutation.mutateAsync({ id: existing.id, data: propertyData });
    } else {
      await createMutation.mutateAsync(propertyData);
    }
    router.push("/admin/properties");
  };

  const loading = isSubmitting || createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Basic Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
        <h3 className="font-semibold text-gray-900">Basic Information</h3>
        <Input label="Property Title" error={errors.title?.message} {...register("title")} placeholder="e.g. Luxury Downtown Apartment" />
        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Describe the property..."
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-400 bg-red-50" : "border-gray-300"}`}
          />
          {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select label="Property Type" options={typeOptions} error={errors.type?.message} {...register("type")} />
          <Select label="Status" options={statusOptions} error={errors.status?.message} {...register("status")} />
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
        <h3 className="font-semibold text-gray-900">Property Details</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Input label="Price ($/month)" type="number" error={errors.price?.message} {...register("price")} placeholder="3500" />
          <Input label="Bedrooms" type="number" error={errors.bedrooms?.message} {...register("bedrooms")} placeholder="2" />
          <Input label="Bathrooms" type="number" error={errors.bathrooms?.message} {...register("bathrooms")} placeholder="2" />
          <Input label="Area (sqft)" type="number" error={errors.area?.message} {...register("area")} placeholder="1200" />
        </div>
        <Input
          label="Amenities (comma-separated)"
          error={errors.amenities?.message}
          {...register("amenities")}
          placeholder="Pool, Gym, Parking, Laundry"
        />
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" {...register("featured")} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
          Mark as Featured Property
        </label>
      </div>

      {/* Location */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
        <h3 className="font-semibold text-gray-900">Location</h3>
        <Input label="Street Address" error={errors.address?.message} {...register("address")} placeholder="123 Main Street" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Input label="City" error={errors.city?.message} {...register("city")} placeholder="New York" />
          <Input label="State" error={errors.state?.message} {...register("state")} placeholder="NY" />
          <Input label="ZIP Code" error={errors.zip?.message} {...register("zip")} placeholder="10001" />
          <Input label="Country" error={errors.country?.message} {...register("country")} placeholder="USA" />
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" loading={loading}>
          {isEditing ? "Update Property" : "Add Property"}
        </Button>
      </div>
    </form>
  );
}
