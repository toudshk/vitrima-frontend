import SocketApi from '@/api/socket';
import { useEffect, useState } from 'react';

export const useChat = (chatId: string) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!chatId) return;

    SocketApi.socket?.emit('join-chat', { chatId });

    SocketApi.socket?.on('new-message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    SocketApi.socket?.on('messages-read', (data) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.chatId === data.chatId && msg.receiver === data.userId
            ? { ...msg, status: 'read' }
            : msg,
        ),
      );
    });

    return () => {
        SocketApi.socket?.off('new-message');
        SocketApi.socket?.off('messages-read');
    };
  }, [chatId]);

  const sendMessage = (message: any) => {
    SocketApi.socket?.emit('send-message', message);
  };

  const markAsRead = (chatId: string, userId: string) => {
    SocketApi.socket?.emit('read-messages', { chatId, userId });
  };

  return { messages, sendMessage, markAsRead };
};
