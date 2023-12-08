import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Pages/Admin/Login";
import Home from "./Pages/Home/Home";
import SingePage from "./Pages/SinglePage/SingePage";
import Admin from "./Pages/Admin/Admin";
import PropertyEdit from "./Pages/Admin/views/PropertyEdit/PropertyEdit";
import PropertyMoreInfo from "./Pages/Admin/views/PropertyEdit/PropertyMoreInfo";
import PropertyAdd from "./Pages/Admin/views/PropertyAdd/PropertyAdd";
import AgentAdd from "./Pages/Admin/views/AgentAdd/AgentAdd";
function App() {
  const router = [
    {
      path: "/",
      element: <Home />,
      outlet: [],
    },
    
    { path: "/property/:id", element: <SingePage /> },
    { path: "/admin", element: <Login /> },
    {
      path: "/admin-dashboard",
      element: <Admin />,
      outlet: [
        { path: "property", element: <PropertyEdit /> },
        { path: ":singleId", element: <PropertyMoreInfo /> },
        { path: "property_add", element: <PropertyAdd /> },
        { path: "agent_add", element: <AgentAdd /> },
      ],
    },
  ];

  type ReactRouteType = {
    path: string;
    element: JSX.Element;
    outlet?: ReactRouteType[];
  };

  return (
    <Layout>
      <Routes>
        {router.map((route: ReactRouteType) => {
          const { path, element, outlet } = route;
          if (outlet) {
            return (
              <Route key={path} path={path} element={element}>
                {outlet.map((outletRoute) => {
                  const { path, element } = outletRoute;
                  return <Route key={path} path={path} element={element} />;
                })}
              </Route>
            );
          } else {
            return <Route key={path} path={path} element={element} />;
          }
        })}
      </Routes>
    </Layout>
  );
}

export default App;
