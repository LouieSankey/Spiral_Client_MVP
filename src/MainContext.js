import React from 'react'

export default React.createContext({
  project: "",
  tasks: "",
  tasksRes: [],
  currentProject: {}, 
  chartData: [],
  prefs: {
    elapsed_time_until_break: 120,
    break_duration: 20,
    idle_reset: 5

  },
  
  setBreakTimeElapsed: () => {},
  changeBreakPrefs: () => {},
  handleAPIRequest: () => {},
  setCurrentProject: () => {},
  setSelectedCycle: () => {},
  handleAddProject: () => {},
  handleAddTask: () => {},
  updatePrefs: () => {},
})
