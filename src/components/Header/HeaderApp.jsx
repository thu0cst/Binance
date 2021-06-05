import React from "react";
import { ReactComponent as BinanceLogo } from "../../assets/img/binance.svg";
import style from "./style.module.css";

export default function HeaderApp() {
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <BinanceLogo />
      </div>
    </div>
  );
}
