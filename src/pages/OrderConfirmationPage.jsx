import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { formatPrice, formatDate } from '../utils/formatters';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order] = useState(() => {
    try {
      const raw = sessionStorage.getItem(`order:${orderId}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order not found</h1>
        <p className="text-gray-600 mb-6">It looks like this order does not exist or has expired.</p>
        <Link to="/products" className="btn-primary inline-block">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl p-8 shadow border border-gray-100">
        <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
        <p className="text-gray-600">Order <span className="font-semibold">{order.id}</span> placed on {formatDate(order.placedAt)}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.productName} className="w-16 h-16 rounded object-cover border" />
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-600">x{item.quantity} • {item.variantName}</p>
                    </div>
                  </div>
                  <div className="text-right font-semibold">{formatPrice(item.subtotal, 'PKR')}</div>
                </div>
              ))}
            </div>
          </div>

          <aside>
            <div className="border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(order.amounts.subtotal, 'PKR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{order.amounts.shipping ? formatPrice(order.amounts.shipping, 'PKR') : 'Free'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatPrice(order.amounts.tax, 'PKR')}</span>
                </div>
                <hr />
                <div className="flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">{formatPrice(order.amounts.total, 'PKR')}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold mb-2">Customer</h3>
            <p>{order.customer.name}</p>
            <p className="text-gray-600">{order.customer.email}</p>
            <p className="text-gray-600">{order.customer.phone}</p>
          </div>
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.city} {order.shipping.postalCode}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link to="/products" className="btn-secondary">Continue Shopping</Link>
          <a href="/" className="btn-primary">Go to Home</a>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;



