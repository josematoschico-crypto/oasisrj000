export type ViewType = 'HOME' | 'LOGIN' | 'MARKETPLACE' | 'TRADING' | 'WALLET' | 'ASSET_DETAIL' | 'TOKENIZE' | 'CATALOG' | 'PROFILE' | 'ADMIN' | 'ADMIN_LOGIN' | 'CUSTODY_GALLERY' | 'INSURANCE_DOCUMENT';

export enum InsuranceStatus {
  SECURED = 'SECURED',
  WARNING = 'WARNING',
  EXPIRED = 'EXPIRED'
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  year: string;
  totalValue?: number;
  fractionPrice?: number;
}

export interface ArtAsset {
  id: string;
  title: string;
  artist: string;
  year: string;
  totalValue: number;
  fractionPrice: number;
  totalFractions: number;
  availableFractions: number;
  imageUrl: string; // Acts as the Cover
  gallery: GalleryItem[]; // Collection of other artworks
  insuranceStatus: InsuranceStatus;
  insuranceCompany: string;
  policyNumber: string;
  insuranceExpiry: string; // ISO date
  technicalReportUrl: string;
  description: string;
  isCatalogOnly?: boolean;
}

export interface UserHolding {
  assetId: string;
  fractionsOwned: number;
  averagePrice: number;
}

export interface Transaction {
  id: string;
  type: 'BUY' | 'SELL' | 'SWAP' | 'DEPOSIT' | 'WITHDRAW';
  assetId?: string;
  amount: number;
  timestamp: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}