export type Market = { name: string; price: number };

export type Product = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  unit: string;
  category: string;
  price: number;
  change: number; // percent, + hole barse, - hole komse
  description: string;
  tags: string[];
  min: number;
  max: number;
  avg: number;
  markets: Market[];
};

export type Category = {
  slug: string;
  name: string;
  emoji: string;
};