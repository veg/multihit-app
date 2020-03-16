import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, useLocation, Redirect } from "react-router-dom";

import { Home } from "./multihit-home.jsx";
import { MultiHit } from "hyphy-vision";
import { NavBar } from "./components/navbar.jsx";

const path = require("path");
const href = window.location.href;
const is_electron = href.slice(0, 4) == "file";
const base_url = is_electron ? path.dirname(path.dirname(href)) : "";
const base_dir = "/data/json_files/multihit/"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MultiHitParams() {
  let query = useQuery();
  return(<Route
            path="/multihit"
            component={() => (
              <MultiHit
                data={
                  base_url + base_dir + query.get("name") ||
                  base_url + base_dir + "yokoyama.rh1.cds.mod.1-990.nex.FITTER.json"
                }
              />
            )}
          />)
}



/**
 * HyPhyVision is the main component of the stand-alone HyPhy-Vision application (both web and electron).
 * This component is primarily responsible for:
 *    1. Rendering the application (render_app is called from index.js).
 *    2. Routing between pages.
 */
class HyPhyVision extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: false
    };
  }

  componentDidMount() {
    // Corrects navbar offset when clicking anchor hash
    var shiftWindow = function() {
      scrollBy(0, -40);
    };
    if (location.hash) shiftWindow();
    window.addEventListener("hashchange", shiftWindow);
  }

  onFileChange = e => {
    var self = this;
    var files = e.target.files; // FileList object

    if (files.length == 1) {
      var f = files[0];
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          var data = JSON.parse(this.result);
          self.setDataToState(data);
        };
      })(f);
      reader.readAsText(f);
    }
    e.preventDefault();
  };

  changeMethod = () => {
    // Change state.data to false when the method is changed so that the default results file is loaded.
    var self = this;
    self.setState({ data: false });
  };

  setDataToState = data => {
    var self = this;
    self.setState({
      data: data
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar
            onFileChange={this.onFileChange}
            changeMethod={this.changeMethod}
          />
          <div style={{ paddingTop: "70px" }}>
            <Route exact path="/" component={() => <Home />} />
            <MultiHitParams />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default function render_app() {
  ReactDOM.render(
    <HyPhyVision />,
    document.body.appendChild(document.createElement("div"))
  );
}
