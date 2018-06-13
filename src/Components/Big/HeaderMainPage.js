import React from "react";
import { css } from "react-emotion";

import config from "../../Configs/mainConfig";
import ButtonTR from "../Small/Button/ButtonTR";

const navClass = css({
  display: "flex",
  justifyContent: "flex-end",
  "& li": {
    listStyleType: "none",
    margin: "0 10px"
  }
});

const container = css({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  backgroundColor: "rgb(166, 198, 241)"
});

const place = css({
  font: "700 20px Ubuntu, sans-serif"
});

class HeaderMainPage extends React.Component {
  render() {
    console.log(config);
    return (
      <div className={container}>
        <div className={place}>Trello by Panytsch</div>
        <div>
          <nav className={navClass}>
            <li>
              <ButtonTR link="/authorize" text="Autorize" />
            </li>
            <li>
              <ButtonTR
                link="/registration"
                text="Registration"
                color="rgb(142, 157, 218)"
                hover="rgb(103, 68, 126)"
              />
            </li>
          </nav>
        </div>
      </div>
    );
  }
}

export default HeaderMainPage;
