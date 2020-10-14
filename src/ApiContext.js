import React from 'react'

export default React.createContext({
  project: "",
  tasks: "",
  currentProject: {}, 
  chartData: [],
  prefs: {},

  handleAPIRequest: () => {},
  setCurrentProject: () => {},
  setSelectedCycle: () => {},
  handleAddProject: () => {},
  handleAddTask: () => {},
  updatePrefs: () => {},
})
