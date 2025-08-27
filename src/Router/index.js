
import PrivateRouter from "../Components/PrivateRouter";
import LayoutAdmin from "../layoutAdmin";
import LayoutDefault from "../layoutDefault";
import CompanyDetail from "../Page/CompanyDetail";
import CreateJob from "../Page/CreateJob";
import CvDetail from "../Page/CvDetail";
import CvManage from "../Page/CvManage";
import DashBoard from "../Page/Dashboard";
import DetailJobAdmin from "../Page/DetailJobAdmin";
import Home from "../Page/Home";
import InfoCompany from "../Page/InfoCompany";
import JobDetail from "../Page/JobDetail";
import JobManage from "../Page/JobManage";
import Login from "../Page/Login";
import Logout from "../Page/Logout";
import Register from "../Page/Register";
import Search from "../Page/Search";



export const router = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'jobdetail/:id',
        element: <JobDetail />,
      },
      {
        path: 'companydetail/:id',
        element: <CompanyDetail />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
    ]


  },
  {
    element: <PrivateRouter />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: 'dashboard',
            element: <DashBoard />,
          },
          {
            path: 'infocompany',
            element: <InfoCompany />,
          },
          {
            path: 'jobmanage',
            element: <JobManage />,
          },
          {
            path: 'createjob',
            element: <CreateJob />,
          },
          {
            path: 'detailjobadmin/:id',
            element: <DetailJobAdmin />,
          },
          {
            path: 'cvmanage',
            element: <CvManage />,
          },
          {
            path: 'cvdetail/:id',
            element: <CvDetail />,
          },

        ]
      }
    ]
  },
];