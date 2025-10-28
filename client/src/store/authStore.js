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
    },

    login: async (username, password) => {
        set({ isLoading: true, message: null })
        try {
            const response = await axios.post(`http://localhost:3000/login`, {
                username,
                password
            })
            const { user, message } = response.data
            set({ user, message, isLoading: false })
            return { user, message }
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message })
            throw error
        }
    },

    fetchUser: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.get(`http://localhost:3000/profile`)
            set({ user: response.data.user, isLoading: false, fetchingUser: false })
        } catch (error) {
            if (
                error.response &&
                (error.response.status === 401 ||
                    error.response.data.message === "No token provided!")
            ) {
                set({ user: null, fetchingUser: false, isLoading: false });
                return null;
            }
            set({ isLoading: false, fetchingUser: false, error: error.response.data.message })
            return null
        }
    }
}))