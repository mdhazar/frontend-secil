import { CollectionApiResponse } from "@/types/collection-response";

const API_BASE_URL = "https://maestro-api-dev.secil.biz";

export interface GetCollectionsParams {
  accessToken: string;
  page?: number;
  pageSize?: number;
}

export const getCollections = async ({
  accessToken,
  page = 1,
  pageSize = 5,
}: GetCollectionsParams): Promise<CollectionApiResponse> => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/Collection/GetAll?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch collections: ${res.status} ${res.statusText}`
      );
    }

    const data: CollectionApiResponse = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Collections API error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching collections");
  }
};

export interface GetProductsForConstantsParams {
  accessToken: string;
  collectionId: number;
  page?: number;
  pageSize?: number;
  additionalFilters?: Array<{
    id: string;
    value: string;
    comparisonType: number;
  }>;
}

export interface ProductForConstants {
  imageUrl: string;
  name: string;
  productCode: string;
}

export const getProductsForConstants = async ({
  accessToken,
  page = 1,
  pageSize = 50,
  additionalFilters = [],
}: GetProductsForConstantsParams): Promise<{ data: ProductForConstants[] }> => {
  try {
    const requestBody = {
      additionalFilters,
      page,
      pageSize,
    };

    const res = await fetch(
      `${API_BASE_URL}/Collection/72/GetProductsForConstants`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
    }

    const response = await res.json();

    if (
      response.status === 200 &&
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data)
    ) {
      const dataArray = response.data.data;

      const transformedData = dataArray.map(
        (item: { imageUrl: string; name: string; productCode: string }) => ({
          imageUrl: item.imageUrl,
          name: item.name ? item.name.split(" ").pop() : "Unknown Product",
          productCode: item.productCode || "Unknown Code",
        })
      );

      return { data: transformedData };
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Products API error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching products");
  }
};

export interface GetFiltersForConstantsParams {
  accessToken: string;
  collectionId: number;
}

export interface FilterValue {
  value: string;
  valueName: string | null;
}

export interface Filter {
  id: string;
  title: string;
  values: FilterValue[];
  currency: string | null;
  comparisonType: number;
}

export const getFiltersForConstants = async ({
  accessToken,
  collectionId,
}: GetFiltersForConstantsParams): Promise<{ data: Filter[] }> => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/Collection/${collectionId}/GetFiltersForConstants`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch filters: ${res.status} ${res.statusText}`
      );
    }

    const response = await res.json();

    if (
      response.status === 200 &&
      response.data &&
      Array.isArray(response.data)
    ) {
      return { data: response.data };
    } else {
      throw new Error("Invalid filters response structure");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Filters API error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching filters");
  }
};

export const getComprehensiveFilters = async ({
  accessToken,
}: GetFiltersForConstantsParams): Promise<{ data: Filter[] }> => {
  try {
    const apiResponse = await getFiltersForConstants({
      accessToken,
      collectionId: 72,
    });
    const apiFilters = apiResponse.data;

    const comprehensiveWarehouseFilter: Filter = {
      id: "warehouse",
      title: "Depo",
      currency: null,
      comparisonType: 0,
      values: [
        { value: "14102", valueName: "ALEMDAR" },
        { value: "10604", valueName: "ANK IZMIR CAD" },
        { value: "13408", valueName: "ATLASPARK" },
        { value: "20602-1", valueName: "BGR TEKSTİL BALGAT ARA DEPO" },
        { value: "80601-4", valueName: "ÇEKİM DEPO" },
        { value: "22501-1", valueName: "ERBOL ERZURUM ARA DEPO" },
        { value: "20603", valueName: "GIMSA PARK" },
        { value: "22801", valueName: "GIRESUN" },
        { value: "1-3-105", valueName: "GÜRSES KONSİNYE DEPO" },
        { value: "22702", valueName: "IBRAHIMLI" },
        { value: "22401-1", valueName: "İSHAK AKBİNA ERZİNCAN" },
        { value: "1-3-250", valueName: "JEFER KONSİNYE DEPO" },
        { value: "20601-1", valueName: "KARUM İLMİO EMİNE ORAN" },
        { value: "KY001", valueName: "Kayıp Depo" },
        { value: "1-M-1", valueName: "Merkez Ofis Deposu 1" },
        { value: "23701-1", valueName: "MODA MAĞAZA ARA DEPO" },
        { value: "10603-C", valueName: "PODIUM ÇADIR" },
        { value: "13405", valueName: "SANTRAL" },
        { value: "20701-1", valueName: "SELF DANIŞMANLIK ALANYA ARA DEPO" },
        { value: "80601-6", valueName: "TADİLAT DEPO" },
        { value: "13401", valueName: "UMRANIYE" },
        { value: "16501", valueName: "VAN AVM" },
        { value: "26501-1C", valueName: "VAN MALL ÇADIR ARA DEPO" },
        { value: "20701", valueName: "YEKTAMALL" },
        { value: "G0002", valueName: "Gölbaşı Abiye Depo" },
        { value: "G0001", valueName: "Gölbaşı Merkez Depo" },
      ],
    };

    const comprehensiveFilters = apiFilters.map((filter) => {
      if (filter.id === "warehouse") {
        return comprehensiveWarehouseFilter;
      }
      return filter;
    });

    const hasWarehouseFilter = apiFilters.some((f) => f.id === "warehouse");
    if (!hasWarehouseFilter) {
      comprehensiveFilters.push(comprehensiveWarehouseFilter);
    }

    return { data: comprehensiveFilters };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Comprehensive filters error: ${error.message}`);
    }
    throw new Error(
      "An unknown error occurred while creating comprehensive filters"
    );
  }
};
