
import axios, { axiosClassic } from "@/api/interceptors";
import SocketApi from "@/api/socket";
import { API_URL } from "@/config/api.config";

export const MessagesService = {
  async getMessages(id: string) {
    try {
      const response = await axiosClassic.get(`${API_URL}/message/${id}`);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  async createMessage({
    text,
    sender,
    chatId,
  }: {
    text: string;
    sender: string;
    chatId: string;
  }) {
    try {
      const response = await axiosClassic.post(`${API_URL}/message`, {
        text,
        sender,
        chatId,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  },
 
};
