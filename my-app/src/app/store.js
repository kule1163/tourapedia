"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const tourappSlice_1 = __importDefault(require("../features/tourapp/tourappSlice"));
const authSlice_1 = __importDefault(require("../features/auth/authSlice"));
const postsSlice_1 = __importDefault(require("../features/posts/postsSlice"));
const commentSlice_1 = __importDefault(require("../features/comment/commentSlice"));
const likeSlice_1 = __importDefault(require("../features/like/likeSlice"));
const redux_persist_1 = require("redux-persist");
const storage_1 = __importDefault(require("redux-persist/lib/storage")); // defaults to localStorage for web
const reducers = (0, toolkit_1.combineReducers)({
    auth: authSlice_1.default,
    posts: postsSlice_1.default,
    comment: commentSlice_1.default,
    tourapp: tourappSlice_1.default,
    like: likeSlice_1.default,
});
const persistConfig = {
    key: "root",
    storage: storage_1.default,
};
const persistedReducer = (0, redux_persist_1.persistReducer)(persistConfig, reducers);
exports.store = (0, toolkit_1.configureStore)({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [redux_persist_1.FLUSH, redux_persist_1.REHYDRATE, redux_persist_1.PAUSE, redux_persist_1.PERSIST, redux_persist_1.PURGE, redux_persist_1.REGISTER],
        },
    }),
});
