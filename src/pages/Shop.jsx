import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function Shop({ onAddToCart } = {}) {
  const sampleProducts = [
    {
      id: 1,
      title: "Ram Mandir 3D Model",
      price: 1499,
      img: "/shop/Ram-mandir.png",
    },
    {
      id: 2,
      title: "Ram Mandir",
      price: 999,
      img: "/shop/Ram-mandir.png",
    },
    {
      id: 3,
      title: "Smart Phone Stand",
      price: 3499,
      img: "/shop/mobile-stand.png",
    },
    {
      id: 4,
      title: "Mobile Phone Stands",
      price: 7999,
      img: "/shop/mobile-stans.png",
    },
    {
      id: 5,
      title: "Ram Mandir 3D Model",
      price: 1499,
      img: "/shop/Ram-mandir.png",
    },
    {
      id: 6,
      title: "Ram Mandir",
      price: 999,
      img: "/shop/Ram-mandir.png",
    },
    {
      id: 7,
      title: "Smart Phone Stand",
      price: 3499,
      img: "/shop/mobile-stand.png",
    },
    {
      id: 8,
      title: "Mobile Phone Stands",
      price: 7999,
      img: "/shop/mobile-stans.png",
    },
  ];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [visibleImage, setVisibleImage] = useState(null); // product id of modal

  // Cart state (local to this page). Each item: { product, qty }
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // categories derived
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(sampleProducts.map((p) => p.category))),
    ],
    []
  );

  // filtered + sorted list
  const filtered = useMemo(() => {
    let items = sampleProducts.filter((p) => {
      const matchQuery = p.title.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category === "All" ? true : p.category === category;
      return matchQuery && matchCategory;
    });

    if (sort === "price-low") items = items.sort((a, b) => a.price - b.price);
    else if (sort === "price-high")
      items = items.sort((a, b) => b.price - a.price);
    // "popular" - keep original order

    return items;
  }, [query, category, sort]);

  const openLightbox = (productId) => setVisibleImage(productId);
  const closeLightbox = () => setVisibleImage(null);

  const currentIndex = visibleImage
    ? filtered.findIndex((p) => p.id === visibleImage)
    : -1;

  const showNext = () => {
    if (currentIndex === -1) return;
    const next = filtered[(currentIndex + 1) % filtered.length];
    setVisibleImage(next.id);
  };

  const showPrev = () => {
    if (currentIndex === -1) return;
    const prev =
      filtered[(currentIndex - 1 + filtered.length) % filtered.length];
    setVisibleImage(prev.id);
  };

  // CART helpers
  const findCartIndex = (productId) =>
    cartItems.findIndex((ci) => ci.product.id === productId);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx === -1) return [...prev, { product, qty }];
      // already in cart -> increase qty
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
      return copy;
    });

    // open sidebar when adding
    setCartOpen(true);

    // external callback
    if (typeof onAddToCart === "function") onAddToCart(product);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQty = (productId, qty) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty } : i))
    );
  };

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.qty * i.product.price, 0);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <main className="max-w-[1400px] mx-auto p-6 m-20 relative bg-gray-500 rounded-2xl">
      
      <section>
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-600">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <article
                key={product.id}
                className="bg-gray-200 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative group">
                  <button
                    onClick={() => openLightbox(product.id)}
                    className="w-full  overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center"
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.png";
                      }}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                  </button>

                  <div className="absolute top-3 right-3 hidden group-hover:flex">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-2 py-1 rounded-full bg-emerald-600 text-white text-xs"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate-900">
                      {product.title}
                    </h3>
                  </div>
                  <div className="text-sm font-semibold">₹{product.price}</div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-xs px-3 py-2 rounded-lg border border-slate-200 text-slate-700"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="text-xs px-3 py-2 rounded-lg bg-emerald-600 text-white"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox modal */}
      {visibleImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="max-w-[1000px] w-full">
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="relative">
                <button
                  onClick={closeLightbox}
                  className="absolute top-3 right-3 bg-white/80 rounded-full p-2"
                >
                  ✕
                </button>
                <button
                  onClick={showPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                >
                  ‹
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                >
                  ›
                </button>

                <div className="w-full  bg-slate-100 flex items-center justify-center">
                  {(() => {
                    const product =
                      filtered.find((p) => p.id === visibleImage) ||
                      sampleProducts.find((p) => p.id === visibleImage);
                    return (
                      <img
                        src={product?.img || "/images/placeholder.png"}
                        alt={product?.title}
                        className="max-h-[70vh] object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/images/placeholder.png";
                        }}
                      />
                    );
                  })()}
                </div>

                <div className="p-4 md:p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {filtered.find((p) => p.id === visibleImage)?.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {filtered.find((p) => p.id === visibleImage)?.category}
                    </p>
                  </div>
                  <div className="text-lg font-bold">
                    ₹{filtered.find((p) => p.id === visibleImage)?.price}
                  </div>
                </div>

                <div className="p-4 md:p-6 border-t border-slate-100 flex items-center gap-3">
                  <button
                    onClick={() =>
                      addToCart(
                        filtered.find((p) => p.id === visibleImage),
                        1
                      )
                    }
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white"
                  >
                    Add to cart
                  </button>
                  <Link
                    to={`/product/${visibleImage}`}
                    className="px-4 py-2 rounded-lg border border-slate-200"
                  >
                    Open product page
                  </Link>
                  <button
                    onClick={closeLightbox}
                    className="ml-auto text-sm text-slate-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-[420px] z-60 transform transition-transform ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-white shadow-xl flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Cart</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">{cartCount} items</span>
              <button
                onClick={() => setCartOpen(false)}
                className="px-2 py-1 rounded bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>

          <div className="p-4 flex-1 overflow-auto">
            {cartItems.length === 0 ? (
              <div className="text-center text-slate-500 py-20">
                Your cart is empty.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cartItems.map(({ product, qty }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) =>
                        (e.currentTarget.src = "/images/placeholder.png")
                      }
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{product.title}</h4>
                      <p className="text-xs text-slate-500">
                        ₹{product.price} each
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => updateQty(product.id, qty - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded border"
                        >
                          −
                        </button>
                        <input
                          value={qty}
                          onChange={(e) => {
                            const val = parseInt(e.target.value || "0", 10);
                            if (!isNaN(val) && val >= 1)
                              updateQty(product.id, val);
                          }}
                          className="w-12 text-center rounded border px-1"
                        />
                        <button
                          onClick={() => updateQty(product.id, qty + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded border"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="ml-auto text-sm text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-600">Subtotal</span>
              <span className="font-semibold">₹{cartTotal}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 text-white">
                Checkout
              </button>
              <button
                onClick={() => {
                  setCartItems([]);
                  setCartOpen(false);
                }}
                className="px-4 py-2 rounded-lg border"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
