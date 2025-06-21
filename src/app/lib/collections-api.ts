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
