import { create } from 'zustand';

const useConversations = create((set) => ({
    selectedConv: null,
    setSelectedConv: (selectedConv) => set({ selectedConv }),
    messages: null,
    setMessages: (messages) => set({ messages })
}))

export default useConversations;