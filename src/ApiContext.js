import React from 'react'

export default React.createContext({
  project: "",
  tasks: "",
  currentProject: [],
  chartData: [],

  setCurrentProject: () => {},
  setSelectedCycle: () => {},
  handleAddProject: () => {},
  handleAddTask: () => {},
  updatePrefs: () => {},
})
