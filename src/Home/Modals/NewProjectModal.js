import React, { Component } from 'react'
import ApiContext from '../../ApiContext'
import config from '../../config'

class NewProjectModal extends Component {

  static contextType = ApiContext;
  
  setProjectNameLocally = event => {
    this.setState({
      projectName: event.target.value
    })
  };

postNewProject = e => {
  
  const { account_id } = this.context
  const project = {
    "project": this.state.projectName,
    "account": account_id
  }

  console.log("new project " + JSON.stringify(project))
 
  fetch(`${config.API_ENDPOINT}/project`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(project),
  })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(project => {
       this.context.handleAddProject(project)
       this.context.setCurrentProject(project)
      //  this.props.history.push(`/folder/${folder.id}`)
    })
    .catch(error => {
      console.error({ error })
    })

  this.props.handleClose()
}

render(){
        const showHideClassName = this.props.show ? "add-project-modal display-block" : "add-project-modal display-none";
        return (
          <div className={showHideClassName}>
            <section className="add-project-modal-main">
            <button className="modal-close-button" onClick={this.props.handleClose}>x</button>
                  <div className="project-modal-content">
                        <h2 className="create-project-header">Create Project</h2>
                        <input  type="text" name="project" onChange={this.setProjectNameLocally} className="create-project-input"></input>
                    </div>
              <button onClick={this.postNewProject} className="save-project-button">CREATE</button>
            </section>
          </div>
        );
      };
}

export default NewProjectModal;