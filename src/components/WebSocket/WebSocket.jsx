import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Chart from "react-apexcharts";
import { Select, Spin } from "antd";
import style from "./style.module.css";

const formatDate = (data) => data?.map((item) => item.time);

export default function WebSocket() {
  const [typeBar, setTypeBar] = useState("candlestick");

  const [socketUrl, setSocketUrl] = useState(
    "wss://stream.binance.com:9443/ws/btcusdt@kline_15m"
  );
  const [data, setData] = useState([]);
  const { lastJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("socket-connected"),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });
  useEffect(() => {
    if (lastJsonMessage) {
      setData([
        ...data,

        {
          time: lastJsonMessage?.E,
          x: new Date(lastJsonMessage?.E),
          y: [
            lastJsonMessage?.k.o,
            lastJsonMessage?.k.h,
            lastJsonMessage?.k.l,
            lastJsonMessage?.k.c,
          ],
        },
      ]);
    }
  }, [lastJsonMessage]);
  const options = {
    chart: {
      id: "realtime",
      height: 350,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    xaxis: {
      type: "datetime",

      categories: formatDate(data),
      tickAmount: 20, // optional tickAmount value
      labels: {
        show: true,
        rotate: 0,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
          colors: [],
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
        offsetX: 0,
        offsetY: 0,
        format: undefined,
        formatter: undefined,
        datetimeUTC: false,
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
    },

    dataLabels: {
      enabled: false,
    },

    title: {
      text: "BTCUSDT with web socket",
      align: "left",
    },
  };
  const series = [
    {
      name: "price",
      data: data,
    },
  ];

  const handleChangeType = (value) => {
    setTypeBar(value);
  };
  return (
    <div>
      {data.length !== 0 ? (
        <>
          <Select
            onChange={handleChangeType}
            className={style.option_type_bar}
            defaultValue={"candlestick"}
          >
            <Select.Option value="candlestick">Candlestick</Select.Option>
            <Select.Option value="line">Line</Select.Option>
          </Select>
          {typeBar === "candlestick" && (
            <Chart
              // @ts-ignore
              options={options}
              series={series}
              type="candlestick"
              width={700}
            />
          )}
          {typeBar === "line" && (
            // @ts-ignore
            <Chart options={options} series={series} type="line" width={700} />
          )}
        </>
      ) : (
        <Spin size="large" className={style.spin} />
      )}
    </div>
  );
}
