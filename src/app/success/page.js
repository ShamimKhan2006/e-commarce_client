export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100">
          <span className="text-3xl">✅</span>
        </div>

        <h1 className="text-3xl font-bold mt-6">
          Payment Successful
        </h1>

        <p className="text-gray-600 mt-3">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="mt-8">
          <a
            href="/products"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}