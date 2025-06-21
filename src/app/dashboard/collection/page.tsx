"use client";

import { useCollectionStore } from "@/store/collections";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Meta } from "@/types/collection-response";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/ui/pagination";
import { getCollections } from "@/app/lib/collections-api";
import { DragDropIcon } from "@/app/ui/icons";

export default function Page() {
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
      <div className="flex-1 bg-gray-50">
        <table className="min-w-full text-gray-900 mt-2">
          <thead className="rounded-lg text-left text-lg ">
            <tr>
              <th scope="col" className="px-6 py-2 font-medium ">
                Başlık
              </th>
              <th scope="col" className="px-2  font-medium">
                Ürün Koşulları
              </th>
              <th scope="col" className="px-2  font-medium">
                Satış Kanalı
              </th>
              <th scope="col" className="px-2  font-medium text-center">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 border-t">
            {collections.map((collection) => (
              <tr
                key={collection.id}
                className="w-full border-b border-gray-300 text-sm  "
              >
                <td className="py-8 pl-6 pr-3">{collection.title}</td>
                <td className="px-2 py-3">
                  {collection.productConditions.map((condition, index) => (
                    <p key={index}>{condition}</p>
                  ))}
                </td>
                <td className="px-2 py-3">{collection.salesChannel}</td>
                <td className="py-3 pl-6 pr-3">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/dashboard/collection/${collection.id}/edit`}
                      className="group relative flex items-center hover:text-blue-600"
                    >
                      <DragDropIcon className="h-5 w-5" />
                      <span className="absolute left-1/2 -translate-x-1/2 -top-8 w-max rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100">
                        Sabitleri Düzenle
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" pt-4 pb-6 flex w-full justify-end bg-gray-50  ">
        <Pagination totalPages={meta?.totalPages || 0} />
      </div>
    </div>
  );
}
