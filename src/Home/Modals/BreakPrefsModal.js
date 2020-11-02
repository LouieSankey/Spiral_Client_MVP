import React, { useState } from 'react';
import ApiContext from '../../ApiContext'
import { useContext } from 'react';


const BreakPrefsModal = ({ handleClose, showPrefs, children }) => {

const context = useContext(ApiContext)

  const newPrefs = {
    "89": null,
    "55": null,
    "34": null,
    "21": null,
    "13": null,
    "8": null,
    "5": null,
    "3": null,
    "2": null,
    "gong": null
  }

const showHideClassName = showPrefs ? "break-modal display-block" : "break-modal display-none";

const updateBreakPrefs = () => {
  context.changeBreakPrefs(newPrefs) 
  
}

const changePreferenceValue = event => {
  newPrefs[event.target.getAttribute('name')] = event.target.value
};

const updateGongValue  = event => {
  if(event.target.checked){
    newPrefs["gong"] = false
  }else{
    newPrefs["gong"] = true
  }
}

const dontSave = () => {
  handleClose()
}

    return (
      
      <div className={showHideClassName}> 
        <section className="modal-break-main">
        <button className="modal-close-button" onClick={dontSave}>x</button>
        <div className="modal-content">
                    <h2 className="break-modal-header">Break Preferences</h2>
                            <h3 className="prefs-label">Cycle: Break Time</h3>

                            { context.prefs &&
                            <>
                            <ul className="projects-list">
                              
                        <li  className="pref-li">89 min: <input type="integer" onChange={changePreferenceValue} defaultValue={context.prefs['89']} name="89"  className="edit-break"></input>min</li>
                        <li className="pref-li">55 min: <input type="integer" onChange={changePreferenceValue}  defaultValue={context.prefs['55']} name="55" className="edit-break" ></input>min</li>
                        <li className="pref-li">34 min: <input type="integer" onChange={changePreferenceValue}  defaultValue={context.prefs['34']} name="34" className="edit-break" ></input>min</li>
                        <li className="pref-li">21 min: <input type="integer" onChange={changePreferenceValue}  defaultValue={context.prefs['21']} name="21" className="edit-break" ></input>min</li>
                        <li className="pref-li">13 min: <input type="integer" onChange={changePreferenceValue}  defaultValue={context.prefs['13']} name="13" className="edit-break" ></input>min</li>
                        <li className="pref-li"> 08 min: <input type="integer" onChange={changePreferenceValue}  defaultValue={context.prefs['8']} name="8" className="edit-break" ></input>min</li>
                        <li className="pref-li"> 05 min: <input type="integer" onChange={changePreferenceValue}  defaultValue={context.prefs['5']} name="5" className="edit-break" ></input>min</li>
                        <li className="pref-li"> 03 min: <input type="integer" onChange={changePreferenceValue}  defaultValue={context.prefs['3']} name="3" className="edit-break" ></input>min</li>
                        <li className="pref-li"> 02 min: <input type="integer" onChange={changePreferenceValue}  defaultValue={context.prefs['2']} name="2" className="edit-break" ></input>min</li>
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
                            <h3 className="gong-checkbox">Opening Gong <input type="checkbox" onChange={updateGongValue} name="gong" defaultChecked={context.prefs.gong}></input></h3>
                            </>
                            }
                            <button onClick={updateBreakPrefs} className="save-break-prefs-button splash-button" >SAVE</button>                 
                    </div>
        </section>
      </div>
    );
  };

  export default BreakPrefsModal;