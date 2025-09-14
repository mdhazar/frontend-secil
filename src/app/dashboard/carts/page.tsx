import { getAllCarts } from "@/app/lib/fakestore-api";

export default async function Page() {
  const carts = await getAllCarts();

  return (
    <div className="flex h-full flex-col px-2 mt-4">
      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-300 p-4 md:h-40"></div>
      <div className="bg-gray-50 border p-4">
        <h2 className="text-lg font-medium mb-3">Carts</h2>
        <table className="min-w-full text-gray-900">
          <thead>
            <tr>
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">User</th>
              <th className="text-left p-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((c) => {
              const items =
                c.products?.reduce((sum, it) => sum + (it.quantity || 0), 0) ??
                0;
              return (
                <tr key={c.id} className="border-t">
                  <td className="p-2">{c.id}</td>
                  <td className="p-2">{c.userId}</td>
                  <td className="p-2">{items}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
