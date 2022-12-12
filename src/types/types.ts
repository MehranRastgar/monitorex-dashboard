export interface GetProductsArray {
  info: Info | null | undefined;
  results: Product[];
}

export interface ProductsSearch {
  Products: ProductInterface[];
  Total: number;
  filterItems: any;
}

export interface ProductInterface {
  category: Category;
  expert_reviews: ExpertReviews;
  main: Main;
  review: Review;
  seo: SEO;
  _id: string;
  imid: number;
  status: string;
  attributes: Attribute[];
  primary_variant: number;
  variants: Variant[];
  __v: number;
  tags: any[];
  updatedAt: Date;
  attributext: Attributext;
}

export interface MinifyProduct {
  _id: string;
  primaryAttribute: Attribute;
  imid: number;
  Price: Price;
  color?: Color[];
  title_fa: string;
  title_en: string;
  image: string;
  sku: string;
}

export interface Info {
  count: number;
  pages: number;
  next: number;
  prev: null;
}

export interface Product {
  category: Category;
  expert_reviews: ExpertReviews;
  main: Main;
  review: Review;
  seo: SEO;
  _id: string;
  imid: number;
  status: string;
  attributes: Attribute[];
  primary_variant: number;
  variants: Variant[];
  __v: number;
  tags: any[];
  updatedAt: Date;
  attributext: Attributext;
}

export interface Attribute {
  title: string;
  values: string[];
  _id: string;
}

export interface Attributext {
  وزن: string;
  ابعاد: string;
  "سازنده پردازنده": string;
  "سری پردازنده": string;
  "مدل پردازنده": string;
  "محدوده سرعت پردازنده": string;
  "فرکانس پردازنده": string;
  "حافظه Cache": string;
  "سایر توضیحات پردازنده مرکزی (CPU)": string;
  "ظرفیت حافظه RAM": string;
  "نوع حافظه RAM": string;
  "سایر توضیحات حافظه RAM": string;
  "ظرفیت حافظه داخلی": string;
  "نوع حافظه داخلی": string;
  "مشخصات حافظه داخلی": string;
  "سایر توضیحات حافظه داخلی": string;
  "سازنده پردازنده گرافیکی": string;
  "مدل پردازنده گرافیکی": string;
  "حافظه اختصاصی پردازنده گرافیکی": string;
  "سایر توضیحات پردازنده گرافیکی": string;
  "اندازه صفحه نمایش": string;
  "نوع صفحه نمایش": string;
  "دقت صفحه نمایش": string;
  "توضیحات صفحه نمایش": string;
  "قابلیت\u200cهای دستگاه": string;
  "درایو نوری": string;
  "مشخصات تاچ پد": string;
  "درگاه\u200cهای ارتباطی": string;
  مودم: string;
  "تعداد پورت USB 3.0": string;
  "تعداد پورت USB Type-C": string;
  "طبقه\u200cبندی": string;
  "نوع باتری": string;
  "توضیحات باتری": string;
  "شارژدهی باتری": string;
  "سیستم عامل": string;
  "توضیحات سیستم عامل": string;
  "اقلام همراه": string;
}

export interface Category {
  L4: string;
  L1: string;
  L2: string;
  L3: string;
}

export interface ExpertReviews {
  technical_properties: TechnicalProperties;
  attributes: any[];
  description: string;
  short_review: string;
  admin_rates: any[];
  review_sections: any[];
}

export interface TechnicalProperties {
  advantages: any[];
  disadvantages: any[];
}

export interface Main {
  rating: MainRating;
  dkp: string;
  sku: string;
  uri: string;
  title_fa: string;
  title_en: string;
  short_desc: string;
  long_desc: string;
  brand: string;
  images: string[];
}

export interface MainRating {
  rate: number;
  count: number;
}

export interface Review {
  description: string;
}

export interface SEO {
  title: string;
  description: string;
  markup_schema: Array<PurpleMarkupSchema[] | FluffyMarkupSchema>;
}

export interface PurpleMarkupSchema {
  "@context": string;
  "@type": string;
  itemListElement: ItemListElement[];
}

export interface ItemListElement {
  "@type": string;
  position: number;
  name: string;
  item?: ItemClass | string;
}

export interface ItemClass {
  "@type": string;
  "@id": string;
}

export interface FluffyMarkupSchema {
  "@context": string;
  "@type": string;
  name: string;
  alternateName: string;
  image: string[];
  description: string;
  mpn: number;
  sku: number;
  category: string;
  brand: Brand;
  offers: Offers;
}

export interface Brand {
  "@type": string;
  name: string;
  url: string;
  "@id": string;
}

export interface Offers {
  "@type": string;
  priceCurrency: string;
  price: number;
  itemCondition: string;
  availability: string;
}

export interface Variant {
  price: Price;
  shipment_methods: ShipmentMethods;
  color: Color;
  id: number;
  rank: number;
  rate: number;
  seller: Seller;
  warranty: string;
  other_description: any[];
  _id: string;
}

export interface Color {
  title: string;
  hex_code: string;
}

export interface Price {
  priceRef: PriceRef;
  discount_percent: number;
  is_incredible: boolean;
  is_promotion: boolean;
  marketable_stock?: number;
  order_limit: number;
  selling_price: number;
  rrp_price: number;
}

export interface PriceRef {
  rule: string;
  id: string;
  shop_names: string[];
}

export interface Seller {
  id: number;
  title: string;
  code: string;
  url: string;
  rating: SellerRating;
  properties: Properties;
  stars: number;
  registration_date: string;
}

export interface Properties {
  is_trusted: boolean;
  is_official: boolean;
  is_roosta: boolean;
  is_new: boolean;
}

export interface SellerRating {
  total_rate: number;
  total_count: number;
  commitment: number;
  no_return: number;
  on_time_shipping: number;
}

export interface ShipmentMethods {
  description: string;
  providers: any[];
}

//--------------------------------------------------------------
export interface Settings {
  _id?: string;
  name?: string;
  __v?: number;
  properties?: SettingsProperty[];
}

export interface SettingsProperty {
  _id?: string;
  name?: string;
  __v?: number;
  properties?: PropertyProperty[];
}

export interface PropertyProperty {
  L1?: L1[];
  L2?: L1[];
  L3?: L1[];
  L4?: L1[];
}

export interface L1 {
  title?: string;
  title_fa?: string;
  url?: string;
}
//--------------------------------------------------------------------
export interface SignUpRequest {
  usernamebyphone: number;
  firstname: string;
  lastname: string;
  nationalId?: string;
}
export interface OtpRequest {
  usernamebyphone: number;
}
export interface AddToCartType {
  userId: ID;
  productId: string;
  accessToken: string;
  variantId: string;
}

export interface SignInResponse {
  _id?: ID;
  usernamebyphone?: number;
  firstname?: string;
  lastname?: string;
  createdAt?: AtedAt;
  updatedAt?: AtedAt;
  __v?: number;
  nationalId?: string;
  viewCounter?: number;
  addresses?: Address[];
  cart?: Cart[];
  PrimaryAddressNumber?: number;
  accessToken: string;
}
export interface SignInRequest {
  usernamebyphone: number;
  code: number;
}
export interface SignInCheck {
  usernamebyphone: number;
  token: string;
}

export interface ClientType {
  info: Client;
  status: "loading" | "success" | "403" | "401" | "unknownError";
}

export interface Client {
  _id?: ID;
  usernamebyphone?: number;
  firstname?: string;
  lastname?: string;
  createdAt?: AtedAt;
  updatedAt?: AtedAt;
  __v?: number;
  nationalId?: string;
  viewCounter?: number;
  addresses?: Address[];
  cart?: Cart[];
  PrimaryAddressNumber?: number;
  accessToken?: string;
}

export interface ID {
  $oid?: string;
}

export interface Address {
  title?: string;
  lat?: number;
  lng?: number;
  postal_code?: number;
  province?: string;
  city?: string;
  county?: string;
  district?: string;
  region?: string;
  neighbourhood?: string;
  plaque?: number;
  unit?: number;
  loc_address?: string;
  description?: string;
  address_compact?: string;
  receiver_name?: string;
  receiver_family?: string;
  receiver_phone?: string;
  _id?: ID;
}

export interface Cart {
  productId: string;
  variantId: string;
  variant: Variant;
  quantity?: number;
  DateTime?: number;
  ImageUrl?: string;
  Price?: number;
  ProductUrl?: string;
  sku?: string;
  title_fa?: string;
}

export interface AtedAt {
  $date?: Date;
}
//--------------------------------------------------
//theme
export interface Theme {
  themeName?: string;
  DeviceType?: "android" | "ios" | "mobile" | "tablet" | "pc" | "laptop";
}
//--------------------------------------------------
export interface Sort {
  SortType: "asce" | "desc";
  SortBy: "date" | "price" | "interest" | "likes" | "ralative" | "sell";
}
//--------------------------------------------------
export interface ReverseAddress {
  address?: string;
  postal_address?: string;
  address_compact?: string;
  primary?: string;
  name?: string;
  poi?: string;
  country?: string;
  province?: string;
  county?: string;
  district?: string;
  rural_district?: string;
  city?: string;
  village?: string;
  region?: string;
  neighbourhood?: string;
  last?: string;
  plaque?: string;
  postal_code?: string;
  geom?: Geom;
}

export interface Geom {
  type?: string;
  coordinates?: string[];
}
//--------------------------------------------------
export interface Order {
  _id?: string;
  userId?: string;
  cart?: Cart[];
  price?: string;
  address?: Address;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
