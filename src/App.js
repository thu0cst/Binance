import "./App.css";
import Chart from "react-apexcharts";
import "antd/dist/antd.css";
import HeaderApp from "components/Header/HeaderApp";
import React, { useState } from "react";
import MyChart from "components/Chart/MyChart";

import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000, // cache for 1 day
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="page-wrapper">
        <HeaderApp />
        <div className="main-wrapper">
          <MyChart />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
