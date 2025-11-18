export enum Occasion {
  Birthday = 'Birthday',
  Anniversary = 'Anniversary',
  Wedding = 'Wedding',
  Pooja = 'Pooja',
  Love = 'Love',
  GetWellSoon = 'Get Well Soon',
  Congrats = 'Congratulations',
  Sympathy = 'Sympathy'
}

export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  Premium = 'Premium'
}

export interface Bouquet {
  id: string;
  name: string;
  price: number;
  description: string;
  flowers: string[];
  colors: string[];
  occasion: Occasion[];
  size: Size;
  imageUrl: string;
}

export interface FilterState {
  searchTerm: string;
  occasion: string;
  sortOrder: 'asc' | 'desc' | 'default';
}

export interface AICustomRequest {
  color: string;
  flowerType: string;
  paperColor: string;
  size: string;
  occasion: string;
}