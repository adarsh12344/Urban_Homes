export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  description: string;
}