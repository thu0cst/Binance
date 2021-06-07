import "./App.css";
import Chart from "react-apexcharts";
import "antd/dist/antd.css";
import HeaderApp from "components/Header/HeaderApp";
import React, { useState } from "react";
import MyChart from "components/Chart/MyChart";

import { QueryClientProvider, QueryClient } from "react-query";
import WebSocket from "components/WebSocket/WebSocket";
import { Select, Tabs } from "antd";
const { TabPane } = Tabs;

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000, // cache for 1 day
    },
  },
});
function App() {
  const [typeDisplay, setTypeDisplay] = useState("1");
  return (
    <QueryClientProvider client={client}>
      <div className="page-wrapper">
        <HeaderApp />
        <div className="main-wrapper">
          <Tabs defaultActiveKey="1" onChange={(key) => setTypeDisplay(key)}>
            <TabPane tab="Call API" key="1">
              {typeDisplay === "1" && <MyChart />}
            </TabPane>
            <TabPane tab="Web Socket" key="2">
              {typeDisplay === "2" && <WebSocket />}
            </TabPane>
          </Tabs>
          {/* <Select
            onChange={(value) => {
              // @ts-ignore
              setTypeDisplay(value);
            }}
            className="option"
            defaultValue={1}
          >
            <Select.Option value={1}>Call Api</Select.Option>
            <Select.Option value={2}>Use web socket</Select.Option>
          </Select>
          {typeDisplay === 1 && <MyChart />}
          {typeDisplay === 2 && <WebSocket />} */}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
