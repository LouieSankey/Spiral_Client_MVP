import React from 'react'
import ApiContext from '../../ApiContext'
import '../MainRectangle/MainRectangle.css'

class AllProjectsModal extends React.Component {

  static contextType = ApiContext;

 setCurrentProject(project){
   console.log("current project " + JSON.stringify(project))
    this.context.setCurrentProject(project)
 }

    render() {
      const { projects=[] } = this.context

    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
        <button className="modal-close-button" onClick={this.props.handleClose}>x</button>
              <div className="modal-content">
                   <h2>Current Project: {this.context.currentProject && this.context.currentProject.project}</h2>
                        <ul className="projects-list">
                          {projects.map((project, i) => 
                              <li key={i}><p className="underlined" onClick={() => {this.setCurrentProject(project); this.props.handleClose();}}>{project.project}</p></li>
                          )}
                       
                        </ul>
                    </div>
          <button   onClick={(event) => {
        this.props.handleClose(); this.props.showAdd();
     }} className="add-project-button">Create Project</button>
        </section>
      </div>
    );
    }
  };

  export default AllProjectsModal