import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { notesApi } from "../API/notesApi";

const rootReducer = combineReducers({
    [notesApi.reducerPath]: notesApi.reducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware)
})

export default store
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch