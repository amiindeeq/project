import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router";

const App = () => {
  return (
    <div className="procon">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
