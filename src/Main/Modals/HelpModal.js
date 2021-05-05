import React from 'react';
import MainContext from '../../MainContext'
import { useContext } from 'react';
import '../TaskEntryBar/TaskEntryBar.css'

const splashImage = require('./../../Landing/images/blue-spiral.png').default



const HelpModal = ({ handleClose, showHelp, children }) => {

  const context = useContext(MainContext)
  const showHideClassName = showHelp ? "help-modal display-block" : "help-modal display-none";

  return (

    <div className={showHideClassName}>
      <section className="modal-help-main">
        <button className="modal-close-button" onClick={handleClose}>x</button>
        <div className="modal-content">
        <img class="help-modal-spiral-img" src={splashImage} alt=""/>

          <h2 className="break-modal-header">Welcome!</h2>
          <ol className="help-list">
          

            <li className="help-item">Keep Spiral open in a browser tab while you work.</li>
            <li className="help-item">To start tracking, select a time frame for a task (or subtask) you're working on.</li>
            <li className="help-item">When your time is up you'll hear a bird chip, which means return to Spiral and select again.</li>
            <li className="help-item">Keep Spiraling until you reach your break period (which you can customize in the sidebar).</li>
            <li className="help-item">After you break period you'll hear a dog bark, which means it's time to start again.</li>
            <li className="help-item">Enjoy!</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default HelpModal;