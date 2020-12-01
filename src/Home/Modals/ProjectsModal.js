import React from 'react'
import ApiContext from '../../ApiContext'
import '../MainRectangle/MainRectangle.css'
const trash = require('../../Img/trash.png')

class AllProjectsModal extends React.Component {

  static contextType = ApiContext;
  
  setCurrentProject(project) {
    this.context.setCurrentProject(project)
  }

  deleteProject(project){
    console.log(project)
  }

  render() {
    const { projects = [] } = this.context
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <button className="modal-close-button" onClick={this.props.handleClose}>x</button>
          <div className="modal-content">
            <h3>Current Project: {this.context.currentProject && this.context.currentProject.project}</h3>
            <ul className="projects-list">
              {projects.map((project, i) =>
                <li className="project-list-item" key={i}><p className="project-list-name" onClick={() => { this.setCurrentProject(project); this.props.handleClose(); }}>{project.project} </p>
                <img className="trashIcon" onClick={() => this.deleteProject(project)} src={trash} alt="a button to delete the corresponding project"/>
                </li>
              )}

            </ul>
          </div>
          <button onClick={(event) => {
            this.props.handleClose(); this.props.showAdd();
          }} className="add-project-button">Create Project</button>
        </section>
      </div>
    );
  }
};

export default AllProjectsModal