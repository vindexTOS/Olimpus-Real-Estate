import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/Auth-slice";
import propertyReducer from "./Property/property-slice";
import agentReducer from "./Agents/agent-slice";
const store = configureStore({
  reducer: { AuthReducer, propertyReducer, agentReducer },
});

export default store;
