import React from "react";
import { NavBar } from "./components/navbar.jsx";
import { Link } from "react-router-dom";

import MULTIHIT_thumb from "../../images/MEME-thumb.png";

const thumbs = {
  MULTIHIT: MULTIHIT_thumb
};

let resultsFiles = [
  'adh.nex.FITTER.json',
  'bglobin.nex.FITTER.json',
  'camelid.nex.FITTER.json',
  'ENCenv.nex.FITTER.json',
  'flavNS5.nex.FITTER.json',
  'HepatitisD.nex.FITTER.json',
  'HIV_RT.nex.FITTER.json',
  'HIVvif.nex.FITTER.json',
  'InfluenzaA.nex.FITTER.json',
  'lysin.nex.FITTER.json',
  'lysozyme.nex.FITTER.json',
  'yokoyama.rh1.cds.mod.1-990.nex.FITTER.json'
];

function MethodBanner(props) {

  const headerStyle = {
      fontFamily: "Montserrat",
      fontSize: "24px",
      color: "#00a99d",
      fontWeight: 600,
      lineHeight: 1
    },
    textStyle = {
      fontFamily: "Noto Sans",
      color: "#545454",
      fontSize: "18px"
    };

  return (
    <div className="row">
      <div className="col-md-12">
        <div style={{ float: "left", padding: 20 }}>
          <img
            style={{ display: "block", borderStyle: "solid", borderWidth: 1 }}
            src={thumbs[props.method]}
          />
        </div>
        <div style={{ padding: 25 }}>
          <a href="javascript:void(0);">
            <Link to={"/" + props.method + "?name=" + props.name }>
              <h3 style={headerStyle}>{props.method}</h3>
            </Link>
          </a>
          <p style={textStyle}>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

function Home(props) {
  let items = _.map(resultsFiles, d => { return <MethodBanner method="MULTIHIT" text={d} name={d} /> } )

  return (
    <div>
      <NavBar />
      <div className="container">
        {items}
      </div>
    </div>
  );
}

export { Home };
