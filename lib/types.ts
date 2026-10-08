export type Market = {
  name: string;
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

  // Percentage change
  change: number; // + hole barse, - hole komse

  description: string;
  tags: string[];

  // Market price range
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