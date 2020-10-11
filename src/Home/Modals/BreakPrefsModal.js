import React from 'react';


const BreakPrefsModal = ({ handleClose, showPrefs, children }) => {
    const showHideClassName = showPrefs ? "break-modal display-block" : "break-modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-break-main">
        <button className="modal-close-button" onClick={handleClose}>x</button>
        <div className="modal-content">
                    <h2 className="break-modal-header">Break Preferences</h2>
                            <h3 className="prefs-label">Cycle: Break Time</h3>
                            <ul className="projects-list">
                        <li className="pref-li">89 min: <input type="integer" readOnly="13" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li">55 min: <input type="integer" readOnly="8" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li">34 min: <input type="integer" readOnly="5" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li">21 min: <input type="integer" readOnly="3" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li">13 min: <input type="integer" readOnly="0" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li"> 08 min: <input type="integer" readOnly="0" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li"> 05 min: <input type="integer" readOnly="0" className="edit-break" name="edit-break"></input>min</li>
                        <li className="pref-li"> 03 min: <input type="integer" readOnly="0" className="edit-break" name="edit-break"></input>min</li>
                        </ul>
                      
                            <h3 className="prefs-label">Break Sound</h3>
                            <select>
                                    <option>Bird Tweet</option>
                                    <option>Bell</option>
                                </select>
                                <h3 className="prefs-label">Resume Sound</h3>
                                <select>
                                    <option>Dog Bark</option>
                                    <option>Whistle</option>
                                </select>
                            <h3 className="gong-checkbox">Opening Gong <input type="checkbox" onChange={()=> console.log("value changed")} checked="checked"></input></h3>
                            <button className="save-break-prefs-button">SAVE</button>                 
                    </div>
        </section>
      </div>
    );
  };

  export default BreakPrefsModal;