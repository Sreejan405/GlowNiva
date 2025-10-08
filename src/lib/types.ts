export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  currency: string;
  images: string[];
  ingredients: string[];
  benefits: string[];
  skinTypes: ('oily' | 'dry' | 'sensitive' | 'combination' | 'normal')[];
  tags: ('organic' | 'brightening' | 'hydrating' | 'anti-aging' | 'exfoliating' | 'vegan')[];
  stock: number;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
};
