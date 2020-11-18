import React, { Component } from 'react';
import { startHighlight } from './highlight';


const toolbarStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: '100px',
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

class Toolbar extends Component {

  state = {
    isActive: false,
  };

  handleToggle = () => {
    this.setState(
      {
        isActive: !this.state.isActive
      });
  };

  render() {

    return (
      <div style={toolbarStyle} className="toolbar">
        {!this.state.isActive && <button onClick={this.handleToggle}><img alt="edit" style={toolbarToggleStyle} src="edit.png" className="toolbarToggle" /></button>}
        {this.state.isActive && <input type="image" alt="close" style={toolbarToggleStyle}  src="close.png" name="closeToolbar" className="toolbarToggle" onClick={this.handleToggle}/>}
        {this.state.isActive && <div style={toolbarContentStyle} className="toolbarContent">
          <input type="image" alt="highlight" style={toolbarIconStyle} src="highlight.png" name="highlighter" className="toolbarIcon" onClick={startHighlight}/>
          <input type="image" alt="pen" style={toolbarIconStyle} src="pen.png" name="pen" className="toolbarIcon" />
        </div>}
      </div>
    );
  }
}

export default Toolbar;