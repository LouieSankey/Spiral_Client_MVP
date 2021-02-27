import React from 'react';
import ApiContext from '../../ApiContext'
import { useContext } from 'react';
import '../TaskEntryBar/TaskEntryBar.css'
import skip from '../../Img/skip_next.png'
import folder from '../../Img/folder_icon.png'


const WorkflowModal = ({ handleClose, showWorkflow, children }) => {

  const context = useContext(ApiContext)
  const showHideClassName = showWorkflow ? "workflow-modal display-block" : "workflow-modal display-none";

  return (

    <div className={showHideClassName}>
      <section className="modal-workflow-main">
        <button className="modal-close-button" onClick={handleClose}>x</button>
        <div className="modal-content">
          <h2 className="break-modal-header">Welcome!</h2>
          <ol className="workflow-list">

            <li className="workflow-item">To use Spiral, keep it open in a browser tab while you work.</li>
            <li className="workflow-item">To give yourself a timeframe for a task you're working on, select from any of the minute durations in the rectangle.</li>
            <li className="workflow-item">Spiral will alert you with a bird chirp when your time is up.</li>
            <li className="workflow-item">If you've set a break period, Spiral will automatically start a second countdown, and alert you with a dog bark when your break is over.</li>
            <li className="workflow-item">If you use Spiral consistently, you can take advantage of its time tracking features.</li>
            <li className="workflow-item">Enjoy!</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default WorkflowModal;