"use client";

import { useCollectionStore } from "@/store/collections";
import { useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { Meta } from "@/types/collection-response";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/ui/pagination";
import { getCollections } from "@/app/lib/collections-api";
import CollectionTable from "@/app/ui/dashboard/collection-table";

function CollectionPageContent() {
  const { collections, setCollections } = useCollectionStore();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (session?.accessToken) {
      const fetchCollections = async () => {
        try {
          setLoading(true);
          const { data, meta } = await getCollections({
            accessToken: session.accessToken!,
            page: currentPage,
            pageSize: 5,
          });

          const transformedCollections = data.map((collection) => ({
            id: collection.id,
            title: collection.info.name,
            productConditions: collection.filters.filters.map(
              (filter) =>
                `Ürün ${filter.title} bilgisi şuna eşit: ${filter.valueName}`
            ),
            salesChannel: `Satış Kanalı - ${collection.salesChannelId}`,
          }));

          setCollections(transformedCollections);
          setMeta(meta);
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          } else {
            setError("An unknown error occurred.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchCollections();
    }
  }, [session, setCollections, currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-full flex-col px-2 mt-4">
      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-300 p-4 md:h-40"></div>
      <CollectionTable collections={collections} />

      <div className=" pt-4 pb-6 flex w-full justify-end bg-gray-50  ">
        <Pagination totalPages={meta?.totalPages || 0} />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CollectionPageContent />
    </Suspense>
  );
}
