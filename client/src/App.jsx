import Homepage from './pages/Homepage'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Moviepage from './pages/Moviepage'
import Layout from './layout/Layout'
import Signin from './pages/Signin'

export default function App() {

  const routes = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { path: "/", element: <Homepage /> },
        { path: "/movie/:id", element: <Moviepage /> },
      ]
    },
    { path: "/signin", element: <Signin /> },
  ])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}
