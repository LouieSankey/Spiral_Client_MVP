import React, { useEffect, useState, useRef, useContext } from 'react'
import './Clock.css'
import useSound from 'use-sound';
import bark from '../../Sounds/dog_bark.wav';
import tweet from '../../Sounds/bird-tweet.mp3';
import gong from '../../Sounds/opening_gong.wav'
import SkipNext from '@material-ui/icons/SkipNextOutlined';
import Stop from '@material-ui/icons/StopOutlined';
import PausePresentation from '@material-ui/icons/PauseOutlined';
import PlayCircleOutline from '@material-ui/icons/PlayArrowOutlined';
import ApiContext from '../../ApiContext'
import  myWorker  from '../../test.worker';


class Clock extends React.Component {

  render() {
    return (
      <>
        <div className="floatLeft">
          <div id="timer">
            <Countdown updateDBWithTask={this.props.updateDBWithTask} noClockStop={this.props.noClockStop} cycle={this.props.cycle}>
            </Countdown>
          
          </div>
        </div>
      </>
    );
  }

}



function Countdown(props) {

  const [timer, setTimer] = useState({
    onBreak: false,
    firstPageLoad: true,
    isPaused: true,
    time: 0,
    timeRemaining: 0,
    timerHandler: null,
    cycle: 0,
  })

  const context = useContext(ApiContext)
  let breakPrefs = context.prefs


const worker = useRef()

useEffect(() => {
  worker.current = new myWorker()

  return () => {
    worker.current.terminate();
  }
}, [])



useEffect(() => {
  const eventHander = e => {
    
  setTimer(prev => {
      return { ...prev, timeRemaining: e.data}
    })
    console.log('Countdown from worker ' + e.data);
  }

  worker.current.addEventListener('message', eventHander)
  return () => {
    worker.current.removeEventListener('message', eventHander)
  }
}, [])






  
  //allowCountdownRestart manages state updates
  //when 'break prefs' or 'project selection' change mid cycle
  //it will only be true when a valid cycle is selected.
  let allowCountdownRestart = false

  useEffect(() => {
    if (allowCountdownRestart) {
      allowCountdownRestart = false
    } else {
      allowCountdownRestart = true
    }
  }, [props, allowCountdownRestart])

  


  useEffect(() => {
    allowCountdownRestart = false
  }, [breakPrefs, props.noClockStop, context.handleAddProject, context.currentProject]);



  // useEffect(() => {

  //   if (allowCountdownRestart) {

  //       setTimer((timer) => ({
  //         ...timer,
  //         time: props.cycle * 60,
  //         // timeRemaining: props.cycle * 60,
  //         cycle: props.cycle,
  //         onBreak: false
  //       }));
 
  //   }

  // }, [props])


  useEffect(() => {
    if (allowCountdownRestart) {
  
      worker.current.postMessage({message: "start", "time": props.cycle * 60 + 1})

    setTimer((timer) => ({
      ...timer,
      time: props.cycle * 60,
      timeRemaining: props.cycle * 60,
      cycle: props.cycle,
      onBreak: false
    }));
  }

}, [props])



  useEffect(() => {
   
    if (timer.time === 0 && !timer.firstPageLoad) {

        if (timer.onBreak) {
          playBark()

          timer.onBreak = false

        } else {
          const breakDuration = breakPrefs[timer.cycle] * 60

          playTweet()

          if (breakDuration !== 0) {


            worker.current.postMessage({message: "break", "time": breakDuration})

            setTimer((timer) => ({
              ...timer,
              onBreak: true,
              time: breakDuration,
              // timeRemaining: breakDuration
            }));

          } 

          props.updateDBWithTask(timer.cycle)
        }
      // }, 0);

    } else {

      if (timer.time === timer.timeRemaining) {

        //first page load is true here, then immediatly set to false
        timer.firstPageLoad = false
        handleResume()
      }
    }

  }, [timer.time, timer.time === timer.timeRemaining])


  //resets timer to intial state
  useEffect(() => {

    if (timer.timeRemaining === 0) {
      // clearInterval(timer.timerHandler)

            worker.current.postMessage({message: "stop", "time": 0})

      setTimer((timer) => ({
        ...timer,
        time: 0,
        isPaused: true
      }));

    }

  }, [timer.timeRemaining])




  const handleResume = e => {
    if (timer.time !== 0) {
      // clearInterval(timer.timerHandler)

      // worker.postMessage(timer.timeRemaining)
    
      setTimer({ 
        ...timer, 
        isPaused: false, 
        timerHandler: setInterval(updateTimeRemaining, 1000)
        //timerHandler: worker.postMessage(timer.timeRemaining)
      
      })

    }
  }

  const updateTimeRemaining = e => {
    setTimer(prev => {
      return { ...prev, timeRemaining: prev.timeRemaining - 1 }
    })
  }

  const handleSkip = () => {

    worker.current.postMessage({message: "skip", "time": 0})



    // clearInterval(timer.timerHandler)
    // setTimer({ ...timer, timeRemaining: 0 })

  }

  const handleStop = () => {

    worker.current.postMessage({message: "stop", "time": 0})

    clearInterval(timer.timerHandler)
    setTimer({ 
      ...timer, 
      onBreak: true, 
      cycle: 0, 
      // timeRemaining: 0 
    })
  }

  const handlePause = e => {

    // clearInterval(timer.timerHandler)
    setTimer({ 
      ...timer, 
      isPaused: true 
    })

  }

  const [playBark] = useSound(bark,
    { volume: 0.35 }
  );

  const [playTweet] = useSound(tweet,
    { volume: 0.20 }
  );

  const [playGong] = useSound(gong,
    { volume: 0.20 }
  );

  const timeFormat = (duration) => {

    if (duration > 0) {
      var hrs = ~~(duration / 3600);
      var mins = ~~((duration % 3600) / 60);
      var secs = ~~duration % 60;
      var ret = "";
      if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    } else {
      return "00:00"
    }
  }


  return <React.Fragment>

    {timer.onBreak ?
      <div><h2 className="display-timer-header">On Break </h2> <h2 className="display-timer">{timeFormat(timer.timeRemaining)}</h2></div>
      : <div><h3 className="display-timer-header"> Time Left </h3> <h3 ref={context.timerRef} className="display-timer">{timeFormat(timer.timeRemaining)}</h3></div>} 

   
      <div className="toolbar-container">
        <div className={`toolbar-icons ${props.taskBarOpen ? "taskbar-open" : ""}`}>
          <i className="tooltip"><Stop className="toolbar-icon" onClick={handleStop}></Stop>
            <span className="tooltiptext">Stop</span></i>
            {!timer.isPaused ?
            <i className="tooltip pause"><PausePresentation className="toolbar-icon" onClick={handlePause}></PausePresentation>
              <span className="tooltiptext pause-tooltip">Pause</span></i>
            :
            <i className="tooltip pause"><PlayCircleOutline className="toolbar-icon" onClick={handleResume}></PlayCircleOutline>
              <span className="tooltiptext">Resume</span></i>
          }
          <i className="tooltip"><SkipNext className="toolbar-icon" onClick={handleSkip} ></SkipNext>
            <span className="tooltiptext">Skip to Break</span></i>
         
        </div>
      </div>

  </React.Fragment>
}




export default Clock;