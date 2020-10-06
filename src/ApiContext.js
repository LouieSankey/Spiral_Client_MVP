import React from 'react'

export default React.createContext({
  project: "",
  tasks: "",

  setCurrentProject: () => {},
  setSelectedCycle: () => {},
  handleAddProject: () => {},
  handleAddTask: () => {},
  updatePrefs: () => {},
})
