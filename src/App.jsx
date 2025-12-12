import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import AdminJobs from './components/admin/AdminJobs'
import Applicants from './components/admin/Applicants'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import PostJob from './components/admin/postJob'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Browse from './components/Browse'
import Home from './components/Home'
import JobDescription from './components/JobDescription'
import Jobs from './components/Jobs'
import Profile from './components/Profile'

const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  // start for admin
  {
    path:"admin/companies",
    element:<Companies/>
  },
  {
    path:"admin/companies/create",
    element:<CompanyCreate/>
  },
  {
    path:"admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"admin/jobs",
    element:<AdminJobs/>
  },
  {
    path:"admin/jobs/create",
    element:<PostJob/>
  },
  {
    path:"admin/jobs/:id/applicants",
    element:<Applicants/>
  },
  
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
