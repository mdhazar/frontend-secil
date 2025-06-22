import Link from "next/link";
import { DragDropIcon } from "@/app/ui/icons";

interface Collection {
  id: number;
  title: string;
  productConditions: string[];
  salesChannel: string;
}

interface CollectionTableProps {
  collections: Collection[];
}

export default function CollectionTable({ collections }: CollectionTableProps) {
  return (
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
            <CollectionTableRow key={collection.id} collection={collection} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CollectionTableRow({ collection }: { collection: Collection }) {
  return (
    <tr className="w-full border-b border-gray-300 text-sm">
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
            href={`/dashboard/collection/edit/${collection.id}`}
            className="group relative flex items-center hover:text-blue-600 cursor-pointer"
          >
            <DragDropIcon className="h-5 w-5" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-8 w-max rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100">
              Sabitleri Düzenle
            </span>
          </Link>
        </div>
      </td>
    </tr>
  );
}
