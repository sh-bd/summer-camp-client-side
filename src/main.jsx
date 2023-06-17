import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ApprovedClass from './components/ApprovedClass/ApprovedClass';
import ManageClass from './components/Dashboard/AdminDashboard/ManageClass/ManageClass';
import ManageUsers from './components/Dashboard/AdminDashboard/ManageUsers/ManageUsers';
import AddClass from './components/Dashboard/InstructorDashboard/AddClass';
import MyClass from './components/Dashboard/InstructorDashboard/MyClass';
import UpdateClass from './components/Dashboard/InstructorDashboard/UpdateClass';
import MyEnrolledClass from './components/Dashboard/StudentDashoard/MyEnrolledClass';
import MySelectedClass from './components/Dashboard/StudentDashoard/MySelectedClass';
import PaymentHistory from './components/Dashboard/StudentDashoard/StudentPayment/PaymentHistory';
import StudentPayment from './components/Dashboard/StudentDashoard/StudentPayment/StudentPayment';
import Home from './components/Home/Home';
import Instructors from './components/Instructors/Instructors';
import Login from './components/Login/Login';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Register from './components/Register/Register';
import './index.css';
import Dashboard from './layout/Dashboard';
import Main from './Layout/Main';
import AuthProvider from './providers/AuthProvider';
import AdminRoute from './route/AdminRoute';
import InstructorRoute from './route/InstructorRoute';
import PrivateRoute from './route/PrivateRoute';




const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/instructors',
        element: <Instructors></Instructors>,
      },
      {
        path: '/classes',
        element: <ApprovedClass></ApprovedClass>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'student/mySelectedClass',
        element: <MySelectedClass></MySelectedClass>,
      },
      {
        path: 'student/myEnrolledClass',
        element: <MyEnrolledClass></MyEnrolledClass>,
      },
      {
        path: 'student/paymentHistory',
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: 'student/payment/:id',
        element: <StudentPayment></StudentPayment>,
        loader: ({ params }) => fetch(`https://summer-camp-server-sh4mim.vercel.app/carts/${params.id}`)
      },
      {
        path: 'admin/manageClass',
        element: <AdminRoute><ManageClass></ManageClass></AdminRoute>,
      },
      {
        path: 'admin/manageUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'instructor/addClass',
        element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
      },
      {
        path: 'instructor/myClass',
        element: <InstructorRoute><MyClass></MyClass></InstructorRoute>
      },
      {
        path: 'instructor/update/:id',
        element: <InstructorRoute><UpdateClass /></InstructorRoute>,
        loader: ({ params }) => fetch(`https://summer-camp-server-sh4mim.vercel.app/class/${params.id}`)
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage></NotFoundPage>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
)
