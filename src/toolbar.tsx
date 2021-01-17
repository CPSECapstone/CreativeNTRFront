import React from "react";
import { startHighlight, endHighlight } from "./highlight";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import ToggleButton from "@material-ui/lab/ToggleButton";

import close_img from "./assets/images/close.png";
import highlight_img from "./assets/images/highlight.png";
import edit_img from "./assets/images/edit.png";
import pen_img from "./assets/images/pen.png";

const toolbarStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  top: "25%",
  right: "0px",
  padding: "1px",
};

const toolbarContentStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  display: "flex",
  backgroundColor: "#fafafa",
  flexDirection: "column",
  right: "0px",
  border: "1px solid #757575",
};

const toolbarToggleStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  backgroundColor: "#fafafa",
  width: "2em",
};

const toolbarIconStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  opacity: "0.5",
  width: "2em",
  height: "2em",
};

const toolbarButtonStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  borderStyle: "none",
  color: "black",
  backgroundColor: "#fafafa",
};

const toolbarToggleableStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  borderStyle: "none",
};

class Toolbar extends React.Component<
  {},
  { isActive: Boolean; isHighlighting: Boolean }
> {
  constructor({}) {
    super({});
    this.state = { isActive: false, isHighlighting: false };

    this.handleIsActive = this.handleIsActive.bind(this);
    this.handleHighlight = this.handleHighlight.bind(this);
  }

  handleIsActive() {
    this.setState((state) => ({
      isActive: !state.isActive,
    }));
  }

  handleHighlight() {
    if (this.state.isHighlighting) {
      endHighlight();
    } else {
      startHighlight();
    }
    this.setState((state) => ({
      isHighlighting: !state.isHighlighting,
    }));
  }

  render() {
    if (this.state.isActive) {
      return (
        <div style={toolbarStyle} className="toolbar">
          <Tooltip title="Close" placement="left">
            <Button onClick={this.handleIsActive} style={toolbarButtonStyle}>
              <img
                alt="close"
                style={toolbarToggleStyle}
                src={close_img}
                className="toolbarToggle"
              />
            </Button>
          </Tooltip>
          <div style={toolbarContentStyle} className="toolbarContent">
            <Tooltip title="Highlight" placement="left">
              <ToggleButton
                value="check"
                onChange={this.handleHighlight}
                selected={this.state.isHighlighting.valueOf()}
                style={toolbarToggleableStyle}
              >
                <img
                  alt="highlight"
                  style={toolbarIconStyle}
                  src={highlight_img}
                  className="toolbarIcon"
                />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Pen" placement="left">
              <Button style={toolbarButtonStyle}>
                <img
                  alt="pen"
                  style={toolbarIconStyle}
                  src={pen_img}
                  className="toolbarIcon"
                />
              </Button>
            </Tooltip>
            <Tooltip title="Pen" placement="left">
              <Button style={toolbarButtonStyle}>
                <img
                  alt="pen"
                  style={toolbarIconStyle}
                  src={pen_img}
                  className="toolbarIcon"
                />
              </Button>
            </Tooltip>
          </div>
        </div>
      );
    } else {
      return (
        <div style={toolbarStyle} className="toolbar">
          <Tooltip title="Toolbar" placement="left">
            <Button onClick={this.handleIsActive} style={toolbarButtonStyle}>
              <img
                alt="edit"
                style={toolbarToggleStyle}
                src={edit_img}
                className="toolbarToggle"
              />
            </Button>
          </Tooltip>
        </div>
      );
    }
  }
}

export default Toolbar;
