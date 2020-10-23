import React from 'react'

export default React.createContext({
  project: "",
  tasks: "",
  currentProject: {}, 
  chartData: [],
  prefs: {},
  changeBreakPrefs: () => {},
  handleAPIRequest: () => {},
  setCurrentProject: () => {},
  setSelectedCycle: () => {},
  handleAddProject: () => {},
  handleAddTask: () => {},
  updatePrefs: () => {},
})
