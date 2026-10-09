
export type Market = {
  name: string;
  division: string;
  min: number;
  max: number;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  unit: string;
  category: string;

  // Price information
  price: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  // Percentage change: positive = increased, negative = decreased
  change: number;

  description: string;
  tags: string[];

  // Overall market price range
  min: number;
  max: number;
  avg: number;

  // Market-wise prices
  markets: Market[];
};

export type Category = {
  slug: string;
  name: string;
  emoji: string;
};