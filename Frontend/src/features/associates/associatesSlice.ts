import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { fetchAssociateByNameCall, modifyAssociateCall } from "./associatesApi";

export interface Associate {
  name: string;
  score: number;
  registeredDate: string;
  supports: string;
  connections: [
    Connection | null,
    Connection | null,
    Connection | null,
    Connection | null
  ];
}

export interface Connection {
  name: string;
  score: number;
  mutual: boolean;
}

export interface ConnectionModified {
  name: string;
  password: string;
}

export interface AssociateModified {
  name: string;
  supports: string;
  connections: [
    ConnectionModified | null,
    ConnectionModified | null,
    ConnectionModified | null,
    ConnectionModified | null
  ];
  modifiedIndex: number;
}

interface AssociateSliceState {
  associate: Associate;
  loading: boolean;
  error?: string;
}

const initialState: AssociateSliceState = {
  associate: {
    name: "",
    score: 0,
    registeredDate: "",
    supports: "",
    connections: [null, null, null, null],
  },
  loading: false,
  error: undefined,
};

const associatesSlice = createSlice({
  name: "associates",
  initialState,
  reducers: {
    fetchAssociateStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchAssociateSuccess(state, action: PayloadAction<Associate>) {
      state.loading = false;
      state.associate = action.payload;
      state.error = undefined;
    },
    fetchAssociateFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    modifyAssociateStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    modifyAssociateSuccess(state) {
      state.loading = false;
      // state.associate = action.payload;
      state.error = undefined;
    },
    modifyAssociateFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setAssociate(state, action: PayloadAction<Associate>) {
      state.associate = action.payload;
    },
  },
});

// Fake API call to fetch associate
export const fetchAssociate =
  (name: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchAssociateStart());
      // Simulate API delay

      // Dummy data
      const associate = await fetchAssociateByNameCall(name);

      dispatch(fetchAssociateSuccess(associate));
    } catch (e) {
      dispatch(fetchAssociateFailure("Failed to fetch associate"));
    }
  };

export const modifyAssociate =
  (modifiedAssociate: AssociateModified): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(modifyAssociateStart());
      // Simulate API delay

      // Dummy data
      const associate = await modifyAssociateCall(modifiedAssociate);

      dispatch(modifyAssociateSuccess());
    } catch (e) {
      dispatch(modifyAssociateFailure("Failed to modify associate"));
    }
  };

export const {
  fetchAssociateStart,
  fetchAssociateSuccess,
  fetchAssociateFailure,
  modifyAssociateStart,
  modifyAssociateSuccess,
  modifyAssociateFailure,
  setAssociate,
} = associatesSlice.actions;

export default associatesSlice.reducer;
