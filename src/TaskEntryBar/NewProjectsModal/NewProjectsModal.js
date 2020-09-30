import React, { Component } from 'react'

class NewProjectModal extends Component {
render(){
        const showHideClassName = this.props.show ? "add-project-modal display-block" : "add-project-modal display-none";
        
        return (
          <div className={showHideClassName}>
            <section className="add-project-modal-main">
            <button className="modal-close-button" onClick={this.props.handleClose}>x</button>
              {this.props.children}
              <button onClick={this.props.handleClose} className="save-project-button">CREATE</button>
            </section>
          </div>
        );
      };
}

export default NewProjectModal;