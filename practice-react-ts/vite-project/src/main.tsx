import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ProductContext } from "./hooks/useProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductContext>
      <App />
    </ProductContext>
  </React.StrictMode>
);
