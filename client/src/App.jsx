import Homepage from './pages/Homepage'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Moviepage from './pages/Moviepage'
import Layout from './layout/Layout'

export default function App() {

  const routes = createBrowserRouter([
    { path: "/", element: <Layout />, children:[
      { path: "/", element: <Homepage /> },
      { path: "/movie/:id", element: <Moviepage /> },
    ] },
  ])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}
