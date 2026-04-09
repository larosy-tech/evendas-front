
export interface Product {
  id: string;
  name: string;
  colors: Color[];
}

export interface Color {
  id: number;
  name: string;
  sizes: Size[];
}

export interface Size {
  id: number;
  name: string;
  sku: string;
}