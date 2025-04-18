import baseAPI from "@/redux/api/baseAPI";

interface Product {
  _id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  isRentable: boolean;
  isBuyable: boolean;
  stock: number;
  notes: string[];
  rating: number;
  createdAt: string;
  updatedAt: string;
  materials: string[];
  rentPrice?: number;
  size?: string;
  color?: string;
  category?: string;
  height?: string;
  width?: string;
  length?: string;
}

interface ProductsMeta {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    categories: string[];
    colors: string[];
    minPrice: number;
    maxPrice: number;
    sizes: string[];
    materials: string[];
    availities: string[];
  };
  current: Record<string, string | number | boolean | null>;
}

interface GetAllProductsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: ProductsMeta;
  data: Product[];
}

interface ProductQueryParams {
  categories?: string[];
  colors?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  materials?: string[];
  availities?: string[];
  sortBy?: string;
  page?: number;
  limit?: number;
}

const productAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<GetAllProductsResponse, ProductQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        // Comma-separated filters
        if (params.categories?.length) {
          queryParams.append("categories", params.categories.join(","));
        }

        if (params.colors) {
          queryParams.append("colors", params.colors);
        }

        if (params.sizes?.length) {
          queryParams.append("sizes", params.sizes.join(","));
        }

        if (params.materials?.length) {
          queryParams.append("materials", params.materials.join(","));
        }

        if (params.availities?.length) {
          queryParams.append("availities", params.availities.join(","));
        }

        // Price range
        if (params.minPrice !== undefined) {
          queryParams.append("minPrice", params.minPrice.toString());
        }
        if (params.maxPrice !== undefined) {
          queryParams.append("maxPrice", params.maxPrice.toString());
        }

        // Sorting and pagination
        if (params.sortBy) {
          queryParams.append("sortBy", params.sortBy);
        }
        if (params.page !== undefined) {
          queryParams.append("page", params.page.toString());
        }
        if (params.limit !== undefined) {
          queryParams.append("limit", params.limit.toString());
        }

        console.log("queryParams", queryParams.toString());

        return `/products?${queryParams.toString()}`;
      },
    }),

    getSingleProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productAPI;
