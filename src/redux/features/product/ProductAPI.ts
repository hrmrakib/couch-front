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
  data: {
    _id: string;
    name: string;
    description: string;
    price: number;
    rentPrice: number;
    stock: number;
    rating: number;
    isBuyable: boolean;
    isRentable: boolean;
    category: string;
    color: string;
    size: string;
    materials: string[];
    images: string[];
    notes: string[];
    type: string;
    height: string;
    width: string;
    length: string;
  };
  meta: {
    _id: string;
    name: string;
    description: string;
    price: number;
    rentPrice: number;
    stock: number;
    rating: number;
    isBuyable: boolean;
    isRentable: boolean;
    category: string;
    related: [
      {
        _id: string;
        name: string;
        description: string;
        price: number;
        rentPrice: number;
        stock: number;
        rating: number;
        isBuyable: boolean;
        isRentable: boolean;
        category: string;
        color: string;
        size: string;
        materials: string[];
        images: string[];
        notes: string[];
        type: string;
        height: string;
        width: string;
        length: string;
      }
    ];
  };
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
  meta: {
    _id: string;

    name: string;
    description: string;
    price: number;
    rentPrice: number;
    stock: number;
    rating: number;
    isBuyable: boolean;
    isRentable: boolean;
    category: string;
    color: string;
    size: string;
    materials: string[];
    images: string[];
    notes: string[];
    type: string;
    height: string;
    width: string;
    length: string;
  };
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
  isRentable?: boolean;
  isBuyable?: boolean;
}

const productAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<GetAllProductsResponse, ProductQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params.isRentable) {
          queryParams.append("isRentable", params.isRentable.toString());
        }
        if (params.isBuyable) {
          queryParams.append("isBuyable", params.isBuyable.toString());
        }

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
          queryParams.append("sort", params.sortBy);
        }

        if (params.page !== undefined) {
          queryParams.append("page", params.page.toString());
        }
        if (params.limit !== undefined) {
          queryParams.append("limit", params.limit.toString());
        }

        return `/products?${queryParams.toString()}`;
      },
    }),

    getSingleProduct: builder.query<Product, { productId: string }>({
      query: ({ productId }) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),

    productCheckout: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/orders/checkout`,
          method: "POST",
          body: data,
        };
      },
    }),

    addToCart: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/cart/${productId}/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    getCart: builder.query({
      query: () => ({
        url: `/cart`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: ({ productId }) => ({
        url: `/cart/${productId}/remove`,
        method: "DELETE",
      }),
    }),

    getProductCategories: builder.query({
      query: () => ({
        url: `/products/categories/list`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useProductCheckoutMutation,
  useGetProductCategoriesQuery
} = productAPI;
