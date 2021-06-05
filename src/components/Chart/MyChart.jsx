import { Select } from "antd";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import style from "./style.module.css";
import { getDataPrice } from "api/binance";
import { useQuery } from "react-query";

const formatData = (data, type) => {
  if (type === "line") {
    return data?.map((item) => item[1]);
  }
  if (type === "candlestick") {
    return data?.map((item) => {
      return {
        x: new Date(item[0]),
        y: [...item?.slice(1, 5)],
      };
    });
  }
};

const formatDate = (data) => data?.map((item) => item[0]);

export default function MyChart() {
  const [data, setData] = useState([]);
  const [filter, setFiler] = useState({
    pair: "BTCUSDT",
    limit: 240,
    interval: "1m",
  });

  const [typeBar, setTypeBar] = useState("candlestick");
  const handleChangeType = (value) => {
    setTypeBar(value);
  };
  const { data: listPrices } = useQuery(
    ["listPrices", filter],
    () => getDataPrice(filter),
    { refetchInterval: 1000, onSuccess: (data) => setData(data) }
  );
  if (!listPrices) {
    return null;
  }

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
      text: "Fundamental Analysis of Stocks",
      align: "left",
    },
  };
  const series = [
    {
      name: "price",
      data: formatData(data, typeBar),
    },
  ];

  return (
    <div className={style.chart_container}>
      <Select
        onChange={handleChangeType}
        className={style.option_type_bar}
        defaultValue={"line"}
      >
        <Select.Option value="candlestick">candlestick</Select.Option>
        <Select.Option value="line">Line</Select.Option>
      </Select>
      {typeBar === "candlestick" && (
        <Chart
          options={options}
          series={series}
          type="candlestick"
          width={800}
        />
      )}
      {typeBar === "line" && (
        <Chart options={options} series={series} type="line" width={800} />
      )}
    </div>
  );
}
