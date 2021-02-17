import React from 'react';
import { startHighlight, endHighlight } from './highlight';
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { Doodle } from './doodles/doodleCanvas';

const toolbarStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: '25%',
  right: '0px',
  padding: '1px',
  zIndex: 1
};

const toolbarContentStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  display: 'flex',
  backgroundColor: '#fafafa',
  flexDirection: 'column',
  right: '0px',
  border: '1px solid #757575'
};

const toolbarToggleStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  backgroundColor: '#fafafa',
  width: '2em'
};

const toolbarIconStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  opacity: '0.5',
  width: '2em',
  height: '2em'
};

const toolbarButtonStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  borderStyle: "none",
  color: "black",
  backgroundColor: "#fafafa"
};

const toolbarToggleableStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  borderStyle: "none"
};


const Toolbar = () => {

  const [isActive, changeIsActive] = React.useReducer(a => !a, false);

  const [isHighlighting, changeIsHighlighting] = React.useState(false);

  const handleHighlight = () => {
    if(isHighlighting) {
      endHighlight();
    }
    else {
      startHighlight();
    }
    changeIsHighlighting(!isHighlighting);
  };

  if(isActive) {
    return (
      <div style={toolbarStyle} className="toolbar">
        <Tooltip title="Close" placement="left">
          <Button onClick={changeIsActive} style={toolbarButtonStyle}><img alt="close" style={toolbarToggleStyle}  src="close.png" className="toolbarToggle"/></Button>
        </Tooltip>
        <div style={toolbarContentStyle} className="toolbarContent">
          <Tooltip title="Highlight" placement="left">
            <ToggleButton value="check" onChange={handleHighlight} selected={isHighlighting} style={toolbarToggleableStyle}><img alt="highlight" style={toolbarIconStyle} src="highlight.png" className="toolbarIcon"/></ToggleButton>
          </Tooltip>
          <Tooltip title="Pen" placement="left">
            <Button style={toolbarButtonStyle} onClick={Doodle.startDoodle}><img alt="pen" style={toolbarIconStyle} src="pen.png" className="toolbarIcon" /></Button>
          </Tooltip>
          <Tooltip title="Pen" placement="left">
             <Button style={toolbarButtonStyle} onClick={Doodle.stopDoodle}><img alt="pen" style={toolbarIconStyle} src="pen.png" className="toolbarIcon" /></Button>
          </Tooltip>
        </div>
      </div>
    );
  }
  else {
    return (
      <div style={toolbarStyle} className="toolbar">
        <Tooltip title="Toolbar" placement="left">
          <Button onClick={changeIsActive} style={toolbarButtonStyle}><img alt="edit" style={toolbarToggleStyle} src="edit.png" className="toolbarToggle" /></Button>
        </Tooltip>
      </div>
    );
  }
}

export default Toolbar;