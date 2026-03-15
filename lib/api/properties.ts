import { mockProperties, mockBookings } from "@/data/mockData";
import { Property, PropertyFilters, Booking } from "@/types";

// Simulates network delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchProperties(filters?: PropertyFilters): Promise<Property[]> {
  await delay(500);
  let properties = [...mockProperties];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    properties = properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }
  if (filters?.type && filters.type !== "all") {
    properties = properties.filter((p) => p.type === filters.type);
  }
  if (filters?.status && filters.status !== "all") {
    properties = properties.filter((p) => p.status === filters.status);
  }
  if (filters?.minPrice) {
    properties = properties.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters?.maxPrice) {
    properties = properties.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters?.bedrooms) {
    properties = properties.filter((p) => p.bedrooms >= filters.bedrooms!);
  }
  if (filters?.city) {
    properties = properties.filter((p) =>
      p.location.city.toLowerCase().includes(filters.city!.toLowerCase())
    );
  }

  return properties;
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  await delay(300);
  return mockProperties.find((p) => p.id === id) ?? null;
}

export async function createProperty(data: Omit<Property, "id" | "createdAt" | "updatedAt">): Promise<Property> {
  await delay(800);
  const newProperty: Property = {
    ...data,
    id: `prop-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProperties.push(newProperty);
  return newProperty;
}

export async function updateProperty(id: string, data: Partial<Property>): Promise<Property> {
  await delay(600);
  const index = mockProperties.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Property not found");
  mockProperties[index] = { ...mockProperties[index], ...data, updatedAt: new Date().toISOString() };
  return mockProperties[index];
}

export async function deleteProperty(id: string): Promise<void> {
  await delay(400);
  const index = mockProperties.findIndex((p) => p.id === id);
  if (index !== -1) mockProperties.splice(index, 1);
}

export async function fetchBookings(): Promise<Booking[]> {
  await delay(400);
  return [...mockBookings];
}
