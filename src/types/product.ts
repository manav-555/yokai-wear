export interface Product {
  id: string;
  sku: string;
  title: string;
  kanjiTitle: string;
  collection: string;
  dropNumber: string;
  pieceNumber: string;
  basePrice: number;
  gsm: number;
  fit: "OVERSIZED BOXY" | "HEAVYWEIGHT REGULAR" | "RELAXED DROP-SHOULDER";
  frontImage: string;
  backImage: string;
  lore: string;
  limitedPieces: number;
  remainingPieces: number;
  sizes: ("S" | "M" | "L" | "XL" | "XXL")[];
  features: string[];
}

export interface CartItem {
  product: Product;
  size: "S" | "M" | "L" | "XL" | "XXL";
  quantity: number;
  reservedUntil: number; // Timestamp for 10-minute hold
}
