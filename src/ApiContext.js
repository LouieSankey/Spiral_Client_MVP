import React from 'react'

export default React.createContext({
  project: "",
  tasks: "",
  currentProject: [],
  chartData: [],

  handleAPIRequest: () => {},
  setCurrentProject: () => {},
  setSelectedCycle: () => {},
  handleAddProject: () => {},
  handleAddTask: () => {},
  updatePrefs: () => {},
})
