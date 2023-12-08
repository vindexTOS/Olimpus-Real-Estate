import { createSlice } from "@reduxjs/toolkit";
import { CreateAgnet, DeleteAgent, GetAgents } from "./agent-thunk";
import { AgentType } from "../../Types/AgentType";
type InitialPropertyStateType = {
  data: AgentType[];

  error: string;
  succsess: string;
  loading: boolean;
};
const initialState: InitialPropertyStateType = {
  data: [],
  error: "",
  succsess: "",
  loading: false,
};

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateAgnet.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(CreateAgnet.fulfilled, (state, action) => {
        state.loading = false;
        state.succsess = "Agent has been created";
      })
      .addCase(CreateAgnet.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong ";
      })
      .addCase(GetAgents.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong";
      })
      .addCase(DeleteAgent.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(DeleteAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.succsess = "Agent has been deleted";
      })
      .addCase(DeleteAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});

export const {} = agentSlice.actions;
export default agentSlice.reducer;
