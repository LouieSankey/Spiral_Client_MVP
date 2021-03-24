import React from 'react'
import MainContext from '../../MainContext'
import '../GoldenRectangle/GoldenRectangle.css'

class AllProjectsModal extends React.Component {

  static contextType = MainContext;
  
  setCurrentProject(project) {
    this.context.setCurrentProject(project)
  }

  deleteProject(project){
  }

  render() {
    const { projects = [] } = this.context
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="modal-content">
            <ul className="projects-list">
              {projects.map((project, i) =>
                <li className="project-list-item" onClick={() => { this.setCurrentProject(project); this.props.handleClose()}}  key={i}><p className="project-list-name">{project.project} </p>
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