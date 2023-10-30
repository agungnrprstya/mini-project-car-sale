import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import products from "./productsSlice";
import product from "./productSlice";
import invoices from "./invoicesSlice";
import invoice from "./invoiceSlice";
import profiles from "./profilesSlice";
import profile from "./profileSlice";

const reducers = combineReducers({
  products,
  product,
  invoices,
  invoice,
  profiles,
  profile,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
