import * as React from "react";
import {
  createBrowserRouter
} from "react-router-dom";
import AppLayout from "../layout/AppLayout/AppLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Protected from "../components/Protected/Protected";
import BlogDetail from "../pages/BlogDetails/BlogDetails";
import EditBlog from "../pages/EditBlog/EditBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element:(
          <React.Suspense fallback={'Loading...'}>
             <Protected>
              <Home />
             </Protected>
          </React.Suspense>
        ),
      },
      {
        path: "/home",
        element:(
          <React.Suspense fallback={'Loading...'}>
            <Protected>
             <Home />
            </Protected>
          </React.Suspense>
        ),
      },
      {
        path: "/login",
        element:(
          <React.Suspense fallback={'Loading...'}>
            <Login />
          </React.Suspense>
        ),
      },
      {
        path: "/sign_up",
        element:(
          <React.Suspense fallback={'Loading...'}>
            <SignUp />
          </React.Suspense>
        ),
      },
      {
        path: "/blog_details",
        element:(
          <React.Suspense fallback={'Loading...'}>
            <Protected>
              <BlogDetail />
            </Protected>
          </React.Suspense>
        ),
      },
      {
        path: "/blog_details/:id",
        element:(
          <React.Suspense fallback={'Loading...'}>
            <Protected>
              <BlogDetail />
            </Protected>
          </React.Suspense>
        ),
      },
      {
        path: "/edit_blog/:id",
        element:(
          <React.Suspense fallback={'Loading...'}>
            <Protected>
              <EditBlog />
            </Protected>
          </React.Suspense>
        ),
      },
    ]
  }   
]);

