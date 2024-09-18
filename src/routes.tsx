import App from "./components/App/App";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";

interface Route {
  path: string;
  element: React.ReactNode;
  routeName?: string;
  children?: Route[];
  showInNavigation?: false;
}

export const paths = {
  root: "/",
  home: "/home",
  profile: "/profile/:id",
};

export const dynamicPaths = {
  profile: (id: number) => paths.profile.replace(":id", id.toString()),
};

const routes: Route[] = [
  {
    path: paths.root,
    element: <App />,
    children: [
      { path: paths.home, routeName: "home", element: <Home /> },
      {
        path: paths.profile,
        routeName: "profile",
        element: <Profile />,
        showInNavigation: false,
      },
    ],
  },
];

export const getRoutes = () => routes[0].children;

export default routes;
