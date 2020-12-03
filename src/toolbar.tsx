import React from 'react';
import { startHighlight } from './highlight';


const toolbarStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: '25%',
  right: '0px',
  padding: '1px'
};

const toolbarContentStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  display: 'flex',
  backgroundColor: '#d3d3d3',
  flexDirection: 'column',
  right: '0px',
  border: '1px solid #757575'
};

const toolbarToggleStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  backgroundColor: '#d3d3d3',
  width: '30px',
  right: '0px',
  padding: '5px'
};

const toolbarIconStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  opacity: '0.5',
  width: '45px',
  height: '45px'
};

const toolbarButtonStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  borderStyle: "none"
};

const Toolbar = () => {

  const [isActive, changeIsActive] = React.useState(false);

  const handleToggle = () => {
    changeIsActive(!isActive);
  };

  if(isActive) {
    return (
      <div style={toolbarStyle} className="toolbar">
        <button onClick={handleToggle} style={toolbarButtonStyle}><input type="image" alt="close" style={toolbarToggleStyle}  src="close.png" name="closeToolbar" className="toolbarToggle"/></button>
        <div style={toolbarContentStyle} className="toolbarContent">
          <button onClick={startHighlight} style={toolbarButtonStyle}><input type="image" alt="highlight" style={toolbarIconStyle} src="highlight.png" name="highlighter" className="toolbarIcon"/></button>
          <button style={toolbarButtonStyle}><input type="image" alt="pen" style={toolbarIconStyle} src="pen.png" name="pen" className="toolbarIcon" /></button>
        </div>
      </div>
    );
  }
  else {
    return (
      <div style={toolbarStyle} className="toolbar">
        <button onClick={handleToggle} style={toolbarButtonStyle}><img alt="edit" style={toolbarToggleStyle} src="edit.png" className="toolbarToggle" /></button>
      </div>
    );
  }
}

export default Toolbar;