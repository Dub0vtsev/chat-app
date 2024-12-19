import { create } from 'zustand';

const useConversations = create((set) => ({
    selectedConv: null,
    setSelectedConv: (selectedConv) => set({ selectedConv }),
    messages: [],
    setMessages: (update) =>
        set((state) => ({
            messages: typeof update === 'function' ? update(state.messages) : update,
        })),
    conversations: [],
    setConversations: (update) =>
        set((state) => ({
            conversations: typeof update === 'function' ? update(state.conversations) : update,
        })),
}))

export default useConversations;