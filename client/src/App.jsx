import Homepage from './pages/Homepage'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Moviepage from './pages/Moviepage'
import Layout from './layout/Layout'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import AiRecommendations from './pages/AiRecommendations'

export default function App() {

  const { fetchUser, fetchingUser } = useAuthStore()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (fetchingUser) {
    return <p>Loading...</p>
  }

  const routes = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { path: "/", element: <Homepage /> },
        { path: "/movie/:id", element: <Moviepage /> },
        { path: "/ai-recommendations", element: <AiRecommendations /> },
      ]
    },
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
  ])

  return (
    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  )
}
