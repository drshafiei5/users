import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { setupListeners } from "@reduxjs/toolkit/query"
import { apiSlice } from "../utils/api-service"
import { usersSlice } from "../features/users/usersSlice"

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
}

// Combine slices into a root reducer
const rootReducer = combineSlices(apiSlice, usersSlice)

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
})

// Create a persistor for the store
export const persistor = persistStore(store)

// Set up listeners for RTK Query
setupListeners(store.dispatch)

// Type definitions for the store and state
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>
