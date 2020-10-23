import React from 'react';
import ApiContext from '../../ApiContext'
import { useContext } from 'react';
import '../TaskEntryBar/TaskEntryBar.css'
import skip from '../../Img/skip_next.png'
import folder from '../../Img/folder_icon.png'


const WorkflowModal = ({ handleClose, showWorkflow, children }) => {

  const context = useContext(ApiContext)

 console.log(showWorkflow)

  const showHideClassName = showWorkflow ? "workflow-modal display-block" : "workflow-modal display-none";

    return (
      
      <div className={showHideClassName}> 
        <section className="modal-workflow-main">
        <button className="modal-close-button" onClick={handleClose}>x</button>
        <div className="modal-content">
                    <h2 className="break-modal-header">Example Workflow</h2>

                    <ol className="workflow-list">
                    <li className="workflow-item">Keep Spiral open in a browser tab, and size up a task (or subtask) you'd like to accomplish.</li>
                    <li className="workflow-item">Use the provided minute values to estimate a timeframe for completion, and don't be afraid to challenge yourself!</li>
                    <li className="workflow-item">If you finish the task before your estimate expires, you can skip to your break period with the skip button. <img className="skip-img" src={skip}></img>  </li>
                    <li className="workflow-item">If your estimate expires and you're still working, take your break then return to Spiral and make another estimate to finish off your task.</li>
                    <li className="workflow-item">Create a new project using the folder icon <img className="folder-img" src={folder}></img> , and name your tasks to keep a detailed accounting of your work history. </li>
                    <li className="workflow-item">Make sure your volume is up - a bird chirp signifies the beginning of a break, and a dog bark means get back to work! </li>

                    </ol>

                  </div>
        </section>
      </div>
    );
  };

  export default WorkflowModal;