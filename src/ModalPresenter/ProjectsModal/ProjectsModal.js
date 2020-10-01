import React, { Component } from 'react'


class AllProjectsModal extends React.Component {
    render() {
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
        <button className="modal-close-button" onClick={this.props.handleClose}>x</button>
          {this.props.children}
          <button onClick={(event) => {
        this.props.handleClose(); this.props.showAdd();
     }} className="add-project-button">Create Project</button>
        </section>
      </div>
    );
    }
  };

  export default AllProjectsModal