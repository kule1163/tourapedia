"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSearchValue = exports.setDisplayMenu = exports.tourappSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    displayMenu: false,
    searchValue: "",
};
exports.tourappSlice = (0, toolkit_1.createSlice)({
    name: "tourapp",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setDisplayMenu: (state, action) => {
            state.displayMenu = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
    },
});
_a = exports.tourappSlice.actions, exports.setDisplayMenu = _a.setDisplayMenu, exports.setSearchValue = _a.setSearchValue;
exports.default = exports.tourappSlice.reducer;
