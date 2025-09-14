export default function Page() {
  return (
    <div className="flex h-full flex-col px-2 mt-4">
      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-300 p-4 md:h-40"></div>
      <div className="bg-gray-50 border p-4">
        <h1 className="text-2xl mb-4">Dashboard</h1>
        <p>Use the sidebar to navigate Products, Carts, and Users.</p>
      </div>
    </div>
  );
}
