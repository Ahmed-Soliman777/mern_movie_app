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
            const response = await axios.post(`https://aiflex-six.vercel.app/api/register`, {
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
            const response = await axios.post(`https://aiflex-six.vercel.app/api/login`, {
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


    /// there is time handling error

    fetchUser: async () => {
        set({ fetchingUser: true, error: null });

        try {
            const response = await axios.get(`https://aiflex-six.vercel.app/api/profile`)
            set({ user: response.data.user, fetchingUser: false });
            // console.log(response);
            
        } catch (error) {
            set({
                fetchingUser: false,
                error: null,
                user: null,
            });

            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null, message: null })
        try {
            const response = await axios.post(`https://aiflex-six.vercel.app/api/logout`)
            const { message } = response.data
            set({ message, isLoading: null, user: null, error: null })
            return { message }
        } catch (error) {
            set({ isLoading: false, fetchingUser: false, error: error.response.data.message })
            throw error
        }
    }
}))