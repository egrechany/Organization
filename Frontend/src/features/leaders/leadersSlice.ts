import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { fetchLeadersCall, fetchSupportersByLeaderCall } from "./leadersApi";

export interface Leader {
  name: string;
  score: number;
  supporters?: Leader[];
}

export interface Supporters {
  supporters: Leader[];
  supportedLeaderName: string;
}

interface LeaderSliceState {
  supportersLoading: string
  loading: boolean;
  leaders: Leader[];
  supportersList: Supporters[];
  error?: string;
}

const initialState: LeaderSliceState = {
  supportersLoading: "",
  loading: false,
  leaders: [],
  supportersList: [],
  error: undefined,
};

const leadersSlice = createSlice({
  name: "leaders",
  initialState,
  reducers: {
    fetchLeadersStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchLeadersSuccess(state, action: PayloadAction<Leader[]>) {
      state.loading = false;
      state.leaders = action.payload;
      state.error = undefined;
    },
    fetchLeadersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setLeaders(state, action: PayloadAction<Leader[]>) {
      state.leaders = action.payload;
    },
    fetchSupportersStart(state, action: PayloadAction<string>) {
      state.supportersLoading = action.payload;
      state.error = undefined;
    },
    fetchSupportersSuccess(state, action: PayloadAction<Supporters[]>) {
      state.supportersLoading = "";
      state.supportersList = action.payload;
      state.error = undefined;
    },
    fetchSupportersFailure(state, action: PayloadAction<string>) {
      state.supportersLoading = "";
      state.error = action.payload;
    },
  },
});

// Fake API call to fetch leaders
export const fetchLeaders = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchLeadersStart());
    // Simulate API delay

    // Dummy data
    const leaders = await fetchLeadersCall();

    dispatch(fetchLeadersSuccess(leaders));
  } catch (e) {
    dispatch(fetchLeadersFailure("Failed to fetch leaders"));
  }
};

export const fetchSupportersByLeader =
  (leaderName: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(fetchSupportersStart(leaderName));
      // Simulate API delay

      // Dummy data
      const supportersList = await fetchSupportersByLeaderCall(leaderName);

      dispatch(
        fetchSupportersSuccess([
          ...getState().leaders.supportersList,
          { supporters: supportersList, supportedLeaderName: leaderName },
        ])
      );
    } catch (e) {
      dispatch(fetchSupportersFailure("Failed to fetch supporters"));
    }
  };

export const {
  fetchLeadersStart,
  fetchLeadersSuccess,
  fetchLeadersFailure,
  setLeaders,
  fetchSupportersStart,
  fetchSupportersSuccess,
  fetchSupportersFailure,
} = leadersSlice.actions;

export default leadersSlice.reducer;
