type Product ={
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isFavorite: boolean,
  price?: number,
  availabilityStatus?: string;
  category?: string;
  tags?: string[];
  rating?: number;
  images?: string[];
}


type ServerProduct = {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  isFavorite: boolean;
  availabilityStatus: string;
  category: string;
  tags: string[];
  rating: number;
};

export type {Product, ServerProduct};