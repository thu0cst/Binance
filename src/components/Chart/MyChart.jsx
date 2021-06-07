import { Select, Tabs } from "antd";
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

  const { data: listPrices } = useQuery(
    ["listPrices", filter],
    () => getDataPrice(filter),
    { refetchInterval: 60000, onSuccess: (data) => setData(data) }
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
      text: "Fundamental Analysis of Coin",
      align: "left",
    },
  };
  const series = [
    {
      name: "price",
      data: formatData(data, typeBar),
    },
  ];

  const handleChangeType = (value) => {
    setTypeBar(value);
  };

  const handleChangeInterval = (value) => {
    setFiler({ ...filter, interval: value });
  };

  return (
    <div className={style.chart_container}>
      <div>
        <Select
          onChange={handleChangeType}
          className={style.option_type_bar}
          defaultValue={"candlestick"}
        >
          <Select.Option value="candlestick">Candlestick</Select.Option>
          <Select.Option value="line">Line</Select.Option>
        </Select>
        <Select
          onChange={handleChangeInterval}
          className={style.option_type_bar}
          defaultValue={"1m"}
        >
          <Select.Option value="1m">1 minute</Select.Option>
          <Select.Option value="1h">1 hour</Select.Option>
          <Select.Option value="1d">1 day</Select.Option>
        </Select>
      </div>
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
    </div>
  );
}
