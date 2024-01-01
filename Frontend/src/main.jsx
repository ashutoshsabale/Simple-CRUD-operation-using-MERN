import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { AllPost, Create, Update } from './components/index.js'

const router = createBrowserRouter([
  {
      path: "/",
            element: <App />,
            children: [
                  {
                        path: "/",
                        element: <Create/>,
                  },
                  {
                        path: "/all-posts",
                        element: <AllPost/>
                  },
                  {
                        path: "/:id",
                        element: <Update/>
                  }
            ],
      },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
            <RouterProvider router={router}/>
      </React.StrictMode>,
)
