import React, { useEffect, useState, useRef, useContext } from 'react'
import './Clock.css'
import useSound from 'use-sound';
import bark from '../../Sounds/dog_bark.wav';
import crickets from '../../Sounds/crickets.wav';
import tweet from '../../Sounds/bird-tweet.mp3';
import gong from '../../Sounds/opening_gong.wav'
import SkipNext from '@material-ui/icons/SkipNextOutlined';
import Stop from '@material-ui/icons/StopOutlined';
import PausePresentation from '@material-ui/icons/PauseOutlined';
import PlayCircleOutline from '@material-ui/icons/PlayArrowOutlined';
import MainContext from '../../MainContext'
import myWorker from '../../test.worker';



function Clock(props) {

  const context = useContext(MainContext)
  let breakPrefs = context.prefs

  const [timer, setTimer] = useState({
    onBreak: false,
    firstPageLoad: true,
    isPaused: true,
    time: 0,
    timeRemaining: 0,
    cycle: 0,
    skipped:false
  })

  const [playBark] = useSound(bark,
    { volume: 0.65 }
  );

  const [playTweet] = useSound(tweet,
    { volume: 0.20 }
  );

  const [playGong] = useSound(gong,
    { volume: 0.20 }
  );

  const [playCrickets] = useSound(crickets,
    { volume: 0.10 }
  );

    const [playCricketsLoud] = useSound(crickets,
    { volume: 0.20 }
  );


  //sets up a worker thread to keep the clock running accurately when browser is in background
  const worker = useRef()
  useEffect(() => {
    worker.current = new myWorker()
    return () => {
      worker.current.terminate();
    }
  }, [])

  //updates time remaining in state from the worker thread every second
  useEffect(() => {
    const eventHander = e => {
      if(e.data === true){
        //here is where the sound should play
       
      }else{
        setTimer((timer) => ({
          ...timer,
          timeRemaining: e.data
        }))
      }

    }

    worker.current.addEventListener('message', eventHander)
    return () => {
      worker.current.removeEventListener('message', eventHander)
    }
  }, [])



  //stops the countdown from resetting during certain UI events 
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



  //resets the timer when the user selects a new cycle
  //couldn't pass in [props.cycle] for this because of an issue when user selects the same cycle twice
  useEffect(() => {
    if (allowCountdownRestart) {
      worker.current.postMessage({ message: "start", "time": props.cycle * 60 })

      setTimer((timer) => ({
        ...timer,
        time: props.cycle * 60,
        timeRemaining: props.cycle * 60,
        cycle: props.cycle,
        onBreak: false
      }));

    }
  }, [props])


  //starts the timer after it's reset 
  useEffect(() => {
    if (timer.time > 0) {
      worker.current.postMessage({ message: "start", "time": timer.time })
    }
  }, [timer.time])



  //handles the automatic switch to a break after a regular cycle 
  useEffect(() => {


    if (timer.time === 0 && !timer.firstPageLoad) {
      setTimeout(function () {
        if (timer.onBreak) {
          timer.onBreak = false
        } else {

          
          const breakDuration = breakPrefs[timer.cycle] * 60
          if (breakDuration !== 0) {
            worker.current.postMessage({ message: "start", "time": breakDuration })
            setTimer((timer) => ({
              ...timer,
              onBreak: true,
              time: breakDuration,
              timeRemaining: breakDuration
            }));
          }

          if(!timer.skipped){
            console.log("recorded full cycle", timer.cycle)

            props.updateDBWithTask(timer.cycle)
          }
          setTimer((timer) => ({
            ...timer,
            skipped:false
          }));
          
          
        }
      }, 1000);

    } else {
      if (timer.time === timer.timeRemaining) {
        timer.firstPageLoad = false
        handleResume()
      }
    }
  }, [timer.time, timer.time === timer.timeRemaining])


  //determines which sound to play, and resets the timer to its original state at the end of a cycle.
  useEffect(() => {

    if (timer.timeRemaining === 0) {
      if (timer.onBreak) {
        playBark()
      } else {
        playTweet()
      }

      setTimer((timer) => ({
        ...timer,
        time: 0,
        isPaused: true
      }));

    }
  }, [timer.timeRemaining])



  //listens for pause/unpause and updates timer accordingly
  useEffect(() => {
    if (timer.isPaused) {
      worker.current.postMessage({ message: "pause", "time": timer.timeRemaining })


    } else {
      worker.current.postMessage({ message: "start", "time": timer.timeRemaining })
    }
  }, [timer.isPaused])



  const handlePause = e => {
    setTimer({ ...timer, isPaused: true })
  }

  const handleResume = e => {
    if (timer.time !== 0) {
      setTimer({
        ...timer,
        isPaused: false
      })
    }
  }

  const handleSkip = () => {

   
    const elapsedMinutes = Math.floor((timer.time -  timer.timeRemaining) / 60) 
    const remainingSeconds = (timer.time -  timer.timeRemaining) - elapsedMinutes * 60;
    const roundedMinutes = remainingSeconds > 30 ? elapsedMinutes + 1 : elapsedMinutes
    props.updateDBWithTask(roundedMinutes)

    console.log("recorded partial cycle", roundedMinutes)

    setTimer({ ...timer, skipped: true, timeRemaining: 0 })
    worker.current.postMessage({ message: "stop", "time": 0 })
  }

  const handleStop = () => {
    setTimer({ ...timer, onBreak: true, cycle: 0, timeRemaining: 0 })
    worker.current.postMessage({ message: "stop", "time": 0 })
  }




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


  return <>

    <div className="floatLeft">
      <div id="timer">

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

      </div>
    </div>

  </>
}




export default Clock;