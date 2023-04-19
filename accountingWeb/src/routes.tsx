import {
  Cash,
  Manage,
  ManageList,
  OilSale,
  Reserves,
  AntG2,
  Dashboard,
  Login
} from './pages'
interface IRoutesType {
  id: string,
  element: JSX.Element,
  path: string,
  isPublic?: boolean,
  text?: string,
  icon?: JSX.Element
}
export const routesArr: IRoutesType[] = [
  {
    id: 'cash',
    element: <Cash />,
    path: '/cash',

  },
  {
    id: 'oilSale',
    element: <OilSale />,
    path: '/oilSale',
  },
  {
    id: 'reserves',
    element: <Reserves />,
    path: '/reserves',
  },
  {
    id: 'antG2',
    element: <AntG2 />,
    path: '/antG2',
  },
  {
    id: 'manage',
    element: <Manage />,
    path: '/manage',
  },
  {
    id: 'manageList',
    element: <ManageList />,
    path: '/manageList',
  },
  {
    id: 'login',
    element: <Login />,
    path: '/login',
  },
  {
    id: 'dashboard',
    element: <Dashboard />,
    path: '/dashboard',
  }

]

