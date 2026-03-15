import * as yup from "yup";

export const propertySchema = yup.object({
  title: yup.string().min(5, "Title must be at least 5 characters").required("Title is required"),
  description: yup
    .string()
    .min(20, "Description must be at least 20 characters")
    .required("Description is required"),
  type: yup
    .mixed<"apartment" | "house" | "villa" | "studio" | "penthouse">()
    .oneOf(["apartment", "house", "villa", "studio", "penthouse"])
    .required("Property type is required"),
  status: yup
    .mixed<"available" | "rented" | "maintenance">()
    .oneOf(["available", "rented", "maintenance"])
    .required("Status is required"),
  price: yup
    .number()
    .positive("Price must be positive")
    .min(100, "Minimum price is $100")
    .required("Price is required"),
  bedrooms: yup.number().min(0, "Bedrooms cannot be negative").required("Bedrooms is required"),
  bathrooms: yup
    .number()
    .min(1, "At least 1 bathroom required")
    .required("Bathrooms is required"),
  area: yup.number().positive("Area must be positive").required("Area is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("ZIP code is required"),
  country: yup.string().required("Country is required"),
  amenities: yup.string().optional(),
  featured: yup.boolean().optional(),
});

export type PropertyFormData = yup.InferType<typeof propertySchema>;
