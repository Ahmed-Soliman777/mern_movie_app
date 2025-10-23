import Homepage from './pages/Homepage'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Moviepage from './pages/Moviepage'
import Layout from './layout/Layout'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

export default function App() {

  const routes = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { path: "/", element: <Homepage /> },
        { path: "/movie/:id", element: <Moviepage /> },
      ]
    },
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
  ])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}
