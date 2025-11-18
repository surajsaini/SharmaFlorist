import { Bouquet, Occasion, Size } from './types';

export const WHATSAPP_NUMBER = '919716615316';

export const BOUQUETS: Bouquet[] = [
  {
    id: 'RNP-001',
    name: 'Classic Red Romance',
    price: 899,
    description: 'A timeless bunch of 12 premium red roses wrapped in cellophane. Perfect for expressing deep love.',
    flowers: ['Red Roses'],
    colors: ['Red'],
    occasion: [Occasion.Love, Occasion.Anniversary],
    size: Size.Medium,
    imageUrl: 'https://picsum.photos/id/106/400/400'
  },
  {
    id: 'RNP-002',
    name: 'Sunshine Marigold Mix',
    price: 450,
    description: 'Traditional yellow and orange marigolds (Genda) suitable for pooja or festive greetings.',
    flowers: ['Marigold'],
    colors: ['Yellow', 'Orange'],
    occasion: [Occasion.Pooja, Occasion.Congrats],
    size: Size.Small,
    imageUrl: 'https://picsum.photos/id/204/400/400'
  },
  {
    id: 'RNP-003',
    name: 'Pink Lily Elegance',
    price: 1250,
    description: 'Exotic oriental pink lilies wrapped in premium pink paper. Sophisticated and fragrant.',
    flowers: ['Lilies'],
    colors: ['Pink'],
    occasion: [Occasion.Birthday, Occasion.Anniversary],
    size: Size.Large,
    imageUrl: 'https://picsum.photos/id/306/400/400'
  },
  {
    id: 'RNP-004',
    name: 'Orchid Opulence',
    price: 1500,
    description: 'Purple orchids arranged in a basket. Long-lasting and royal look.',
    flowers: ['Orchids'],
    colors: ['Purple'],
    occasion: [Occasion.Congrats, Occasion.Wedding],
    size: Size.Premium,
    imageUrl: 'https://picsum.photos/id/406/400/400'
  },
  {
    id: 'RNP-005',
    name: 'White Peace Rajnigandha',
    price: 600,
    description: 'Fresh Tuberoses (Rajnigandha) stems. Known for their mesmerizing fragrance.',
    flowers: ['Tuberose'],
    colors: ['White'],
    occasion: [Occasion.Pooja, Occasion.Sympathy],
    size: Size.Medium,
    imageUrl: 'https://picsum.photos/id/506/400/400'
  },
  {
    id: 'RNP-006',
    name: 'Mixed Gerbera Joy',
    price: 750,
    description: 'Colorful Gerberas in yellow, red, and pink. Adds cheer to any room.',
    flowers: ['Gerberas'],
    colors: ['Multi'],
    occasion: [Occasion.GetWellSoon, Occasion.Birthday],
    size: Size.Medium,
    imageUrl: 'https://picsum.photos/id/606/400/400'
  },
  {
    id: 'RNP-007',
    name: 'Velvet Rose Basket',
    price: 2100,
    description: '50 Red Roses arranged in a heart-shaped basket.',
    flowers: ['Red Roses'],
    colors: ['Red'],
    occasion: [Occasion.Anniversary, Occasion.Wedding],
    size: Size.Premium,
    imageUrl: 'https://picsum.photos/id/706/400/400'
  },
  {
    id: 'RNP-008',
    name: 'Sunny Carnations',
    price: 550,
    description: 'Bright yellow carnations representing friendship and joy.',
    flowers: ['Carnations'],
    colors: ['Yellow'],
    occasion: [Occasion.Birthday, Occasion.Congrats],
    size: Size.Small,
    imageUrl: 'https://picsum.photos/id/806/400/400'
  },
  {
    id: 'RNP-009',
    name: 'Lavender Dreams',
    price: 1800,
    description: 'Imported purple blooms and filler flowers wrapped in jute.',
    flowers: ['Mixed', 'Lavender'],
    colors: ['Purple'],
    occasion: [Occasion.Anniversary],
    size: Size.Large,
    imageUrl: 'https://picsum.photos/id/106/400/400'
  },
  {
    id: 'RNP-010',
    name: 'Pure White Roses',
    price: 950,
    description: '15 White Roses representing purity and new beginnings.',
    flowers: ['White Roses'],
    colors: ['White'],
    occasion: [Occasion.Wedding, Occasion.Sympathy],
    size: Size.Medium,
    imageUrl: 'https://picsum.photos/id/206/400/400'
  },
  {
    id: 'RNP-011',
    name: 'Chocolate & Rose Combo',
    price: 1400,
    description: '10 Red Roses with a box of Ferrero Rocher.',
    flowers: ['Red Roses'],
    colors: ['Red'],
    occasion: [Occasion.Love, Occasion.Birthday],
    size: Size.Large,
    imageUrl: 'https://picsum.photos/id/309/400/400'
  },
  {
    id: 'RNP-012',
    name: 'Blue Orchid Exotic',
    price: 1600,
    description: 'Rare blue dyed orchids for a unique statement.',
    flowers: ['Orchids'],
    colors: ['Blue'],
    occasion: [Occasion.Congrats],
    size: Size.Large,
    imageUrl: 'https://picsum.photos/id/409/400/400'
  },
  {
    id: 'RNP-013',
    name: 'Wedding Special Garland',
    price: 3500,
    description: 'Premium heavy Varmala made of red roses and jasmine.',
    flowers: ['Roses', 'Jasmine'],
    colors: ['Red', 'White'],
    occasion: [Occasion.Wedding],
    size: Size.Premium,
    imageUrl: 'https://picsum.photos/id/509/400/400'
  },
  {
    id: 'RNP-014',
    name: 'Baby Breath Bouquet',
    price: 1100,
    description: 'A cloud of white Gypsophila (Baby Breath). Minimalist and chic.',
    flowers: ['Gypsophila'],
    colors: ['White'],
    occasion: [Occasion.Love, Occasion.Birthday],
    size: Size.Medium,
    imageUrl: 'https://picsum.photos/id/609/400/400'
  },
  {
    id: 'RNP-015',
    name: 'Blush Pink Roses',
    price: 999,
    description: 'Soft pink roses wrapped in white tissue.',
    flowers: ['Roses'],
    colors: ['Pink'],
    occasion: [Occasion.GetWellSoon, Occasion.Love],
    size: Size.Medium,
    imageUrl: 'https://picsum.photos/id/709/400/400'
  },
  {
    id: 'RNP-016',
    name: 'Mixed Seasonal Basket',
    price: 650,
    description: 'Best seasonal flowers available in the Ghaziabad market today.',
    flowers: ['Mixed'],
    colors: ['Multi'],
    occasion: [Occasion.Birthday],
    size: Size.Small,
    imageUrl: 'https://picsum.photos/id/809/400/400'
  },
  {
    id: 'RNP-017',
    name: 'Royal Tulip Bunch',
    price: 2500,
    description: '10 Imported Tulips (Seasonal availability).',
    flowers: ['Tulips'],
    colors: ['Yellow', 'Red'],
    occasion: [Occasion.Love],
    size: Size.Medium,
    imageUrl: 'https://picsum.photos/id/119/400/400'
  },
  {
    id: 'RNP-018',
    name: 'Sunflower Radiance',
    price: 800,
    description: 'Bright sunflowers wrapped in brown kraft paper.',
    flowers: ['Sunflowers'],
    colors: ['Yellow'],
    occasion: [Occasion.GetWellSoon, Occasion.Congrats],
    size: Size.Medium,
    imageUrl: 'https://picsum.photos/id/219/400/400'
  },
  {
    id: 'RNP-019',
    name: 'Grand 100 Rose Stand',
    price: 5000,
    description: 'Tall standing arrangement of 100 roses for grand events.',
    flowers: ['Roses'],
    colors: ['Red', 'Pink'],
    occasion: [Occasion.Wedding, Occasion.Anniversary],
    size: Size.Premium,
    imageUrl: 'https://picsum.photos/id/319/400/400'
  },
  {
    id: 'RNP-020',
    name: 'Simple Jasmine Strings',
    price: 300,
    description: 'Fragrant Jasmine strings (Gajra) for hair or pooja.',
    flowers: ['Jasmine'],
    colors: ['White'],
    occasion: [Occasion.Pooja, Occasion.Wedding],
    size: Size.Small,
    imageUrl: 'https://picsum.photos/id/419/400/400'
  },
];