// api/chats.ts

import axios, { axiosClassic } from "@/api/interceptors";
import { API_URL } from "@/config/api.config";

export const ChatsService = {
  async getChats(id: string) {
    try {
      const response = await axiosClassic.get(`${API_URL}/chat/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw error;
    }
  },
  async createChat({
    senderId,
    receiverId
 
  }: {
    
    senderId: string;
    receiverId:string
  }) {
    try {
      const response = await axiosClassic.post(`${API_URL}/chat`, {
       
        senderId,
        receiverId,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  },
};
