import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "../router/index";

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(route =>
              <Route 
                  exact={route.exact}
                  path={route.path}
                  element={route.element} 
                  key={route.path}
              />
            )}
        </Routes>
    )
};

export default AppRouter;
