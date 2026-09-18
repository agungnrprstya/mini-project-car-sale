import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGetProducts } from "../../store/productsSlice";
import ProductImage from "../ProductImage";

function ProductCard({ product, emptyMessage }) {
  const dispatch = useDispatch();
  const { message = "", status = "idle", data = null } = product || {};
  const cars = data || [];

  if (status === "idle" || status === "loading") {
    return (
      <div>
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg border border-paper-line bg-white"
        >
          <svg className="animate-spin h-6 w-6 text-ink-mute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-sm text-ink-mute">Loading cars</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div>
        <div role="alert" className="rounded-lg border border-paper-line bg-white p-8 text-center">
          <p className="font-medium text-ink">Could not load the cars</p>
          <p className="mt-2 text-sm text-ink-mute">{message}</p>
          <button
            type="button"
            onClick={() => dispatch(fetchGetProducts())}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-signal px-5 text-sm font-semibold text-white hover:bg-signal-strong"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!cars.length) {
    return (
      <div>
        <div className="rounded-lg border border-paper-line bg-white p-8 text-center">
          <p className="font-medium text-ink">{emptyMessage || "No cars to show yet."}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {cars.map((car, index) => {
          // carPrice bisa null atau string kosong pada data lama, dan Number(null) menghasilkan 0
          const rawPrice = car.carPrice;
          const price = rawPrice === null || rawPrice === undefined || rawPrice === "" ? NaN : Number(rawPrice);
          const priceLabel = Number.isFinite(price) ? price.toLocaleString("en-US") : null;

          return (
            <Link
              key={`${car.id}_${index}`}
              to={`/product/${car.id}`}
              state={{ product: car }}
              className="group flex flex-col overflow-hidden rounded-lg border border-paper-line bg-white transition-colors duration-200 hover:border-ink/30"
            >
              <ProductImage src={car.carImage} alt={car.carName} className="aspect-[4/3] w-full border-b border-paper-line bg-paper object-cover" />
              <div className="flex flex-1 flex-col gap-4 p-5">
                <h3 className="text-lg font-semibold text-ink">{car.carName}</h3>
                <dl className="mt-auto rounded-md border border-paper-line bg-paper px-4 py-2 text-sm">
                  <div className="flex items-center justify-between gap-4 py-1">
                    <dt className="text-ink-mute">Category</dt>
                    <dd className="font-medium text-ink">{car.carCategory}</dd>
                  </div>
                  {priceLabel !== null && (
                    <div className="flex items-center justify-between gap-4 py-1">
                      <dt className="text-ink-mute">Price</dt>
                      <dd className="font-semibold tabular-nums text-signal">${priceLabel}</dd>
                    </div>
                  )}
                </dl>
                <span className="text-sm font-medium text-ink-soft underline decoration-ink-mute underline-offset-4">
                  View details
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCard;
