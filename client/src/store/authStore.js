import { create } from 'zustand'
import axios from 'axios';

axios.defaults.withCredentials = true // for headers

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,

    signup: async (username, email, password) => {
        set({ isLoading: true, message: null });
        try {
            const response = await axios.post(`http://localhost:3000/register`, {
                username,
                email,
                password
            })
            set({ user: response.data.user, isLoading: false })
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || "Error" })
            throw error
        }
    }
}))