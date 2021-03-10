import React from 'react';
import ApiContext from '../../ApiContext'
import { useContext } from 'react';
import '../TaskEntryBar/TaskEntryBar.css'



const HelpModal = ({ handleClose, showHelp, children }) => {

  const context = useContext(ApiContext)
  const showHideClassName = showHelp ? "help-modal display-block" : "help-modal display-none";

  return (

    <div className={showHideClassName}>
      <section className="modal-help-main">
        <button className="modal-close-button" onClick={handleClose}>x</button>
        <div className="modal-content">
          <h2 className="break-modal-header">Welcome!</h2>
          <ol className="help-list">

            <li className="help-item">To use Spiral, keep it open in a browser tab while you work.</li>
            <li className="help-item">To give yourself a timeframe for a task you're working on, select from any of the minute durations in the rectangle.</li>
            <li className="help-item">Spiral will alert you with a bird chirp when your time is up.</li>
            <li className="help-item">If you've set a break period, Spiral will automatically start a second countdown, and alert you with a dog bark when your break is over.</li>
            <li className="help-item">If you use Spiral consistently, you can take advantage of its time tracking features.</li>
            <li className="help-item">Enjoy!</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default HelpModal;