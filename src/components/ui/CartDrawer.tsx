import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const freeShippingThreshold = 500;
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Your Cart</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button onClick={closeCart} className="btn-icon w-8 h-8">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-slate-950/80 px-6 py-3 border-b border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-400 font-medium">
                {remainingForFreeShipping <= 0 ? (
                  <span className="text-emerald-400 font-bold">🎉 You unlocked FREE Express Shipping!</span>
                ) : (
                  <span>Add <strong className="text-cyan-400">${remainingForFreeShipping.toFixed(0)}</strong> for Free Express Shipping</span>
                )}
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.id}`}
                  className="glass-panel p-4 flex items-center gap-4 relative border border-slate-800 hover:border-slate-700"
                >
                  {/* Color Swatch Icon */}
                  <div
                    className="w-14 h-14 rounded-xl border flex-shrink-0 flex items-center justify-center font-bold text-xs text-white"
                    style={{
                      backgroundColor: item.selectedColor.hex,
                      borderColor: 'rgba(255,255,255,0.2)',
                    }}
                  >
                    3D
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{item.product.name}</h4>
                    <p className="text-xs text-slate-400 mb-2">
                      Finish: <span className="text-cyan-300 font-medium">{item.selectedColor.name}</span>
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-slate-950/80 rounded-lg border border-slate-800 px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedColor.id, item.quantity - 1)
                          }
                          className="text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedColor.id, item.quantity + 1)
                          }
                          className="text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-extrabold text-white">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id, item.selectedColor.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-400">Add products from the catalog to get started.</p>
              </div>
            )}
          </div>

          {/* Checkout Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/90">
              <div className="space-y-2 mb-4 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-400 font-semibold">
                    {remainingForFreeShipping <= 0 ? 'FREE' : '$15.00'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total</span>
                  <span className="text-cyan-400 text-lg">${(subtotal + (remainingForFreeShipping <= 0 ? 0 : 15)).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => alert('Proceeding to 3D Spatial Secure Checkout demo!')}
                className="w-full btn-primary text-base py-3.5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Encrypted 256-Bit Spatial Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
