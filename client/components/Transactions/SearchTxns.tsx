export default function SearchTxns() {
  return (
    <div className="mb-4 flex space-x-4 items-center">
      <input
        type="text"
        placeholder="Search transactions..."
        className="flex-grow rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
