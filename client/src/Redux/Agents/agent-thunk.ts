import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
type AgentThunkType = {
  bodyObj: any;
  token: string;
  profilePicture: Blob;
};

type DeleteAgentType = {
  id: string;
  token: string;
};
export const CreateAgnet = createAsyncThunk(
  "createagent/post",
  async (obj: AgentThunkType) => {
    const { fullName, email, phoneNumber, description } = obj.bodyObj;
    const formData = new FormData();

    formData.append("picture", obj.profilePicture);
    formData.append("fullName", fullName);
    formData.append("Email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("Description", description);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}realtor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${obj.token}`,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
        }
      );

      return res.data;
    } catch (error) {
      throw new Error("ERROR");
    }
  }
);

export const GetAgents = createAsyncThunk("agentdata/get", async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}realtor`);

    return res.data;
  } catch (error) {
    throw new Error("ERROR");
  }
});

export const DeleteAgent = createAsyncThunk(
  "remove agent/delete",
  async (obj: DeleteAgentType) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_API_URL}realtor/${obj.id}`,
        {
          headers: {
            Authorization: `Bearer ${obj.token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw new Error("ERROR");
    }
  }
);
