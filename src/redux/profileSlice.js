import { createSlice } from "@reduxjs/toolkit";

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

const saved = safeParse(localStorage.getItem("profile_data")) || {
  name: "",
  email: "",
  phone: "",
  address: "",
  location: "",
  loggedIn: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: saved,
  reducers: {
    saveProfile: (state, action) => {
      const { name, email, phone, address, location } = action.payload;
      state.name = name || state.name;
      state.email = email || state.email;
      state.phone = phone || state.phone;
      state.address = address || state.address;
      state.location = location || state.location;
      state.loggedIn = true;
      localStorage.setItem("profile_data", JSON.stringify(state));
    },

    updateAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem("profile_data", JSON.stringify(state));
    },

    setLocation: (state, action) => {
      state.location = action.payload;
      localStorage.setItem("profile_data", JSON.stringify(state));
    },

    resetProfile: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.location = "";
      state.loggedIn = false;
      localStorage.removeItem("profile_data");
    },
  },
});

export const { saveProfile, updateAddress, setLocation, resetProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
