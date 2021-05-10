import React from 'react'

export default React.createContext({
  project: "",
  tasks: "",
  tasksRes: [],
  currentProject: {}, 
  chartData: [],
  prefs: {},
  
  setBreakTimeElapsed: () => {},
  changeBreakPrefs: () => {},
  handleAPIRequest: () => {},
  setCurrentProject: () => {},
  setSelectedCycle: () => {},
  handleAddProject: () => {},
  handleAddTask: () => {},
  updatePrefs: () => {},
})
