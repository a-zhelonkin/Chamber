import { DynamicPricingPage } from "components/dynamic-pricing/DynamicPricingPage";
import { PrinterPage } from "components/printer/PrinterPage";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";

const container = window.document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <HashRouter>
      <Routes>
        <Route path={"/printer"} element={<PrinterPage />} />
        <Route path={"/dynamic-pricing"} element={<DynamicPricingPage />} />
      </Routes>
    </HashRouter>
  );
}
