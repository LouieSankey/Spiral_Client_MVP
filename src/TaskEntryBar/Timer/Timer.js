import React, { Component, useState } from 'react'
import { PausePresentation, SkipNext, Stop, PlayCircleOutline} from '@material-ui/icons';

import './Timer.css'



function Countdown(props) {

    const [timer, setTimer] = useState({
      name: 'timer',
      onBreak:false,
      firstStart:true,
      isPaused: true,
      time: 0,
      timeRemaining: 0,
      timerHandler: null,
      cycle: 0
    })


let breakDurations = {
  89: 13,
  55: 8,
  34: 5,
  21: 3,
  13: 0,
  8: 0,
  5: 5,
  3: 0,
  2: 0

}


    const handleTimeChange = e => {

      setTimer({
        ...timer,
        time: Number(e.target.value),
        timeRemaining: Number(e.target.value),
      })
    }

    React.useEffect(() => {
      timer.onBreak = false
      console.log("effect 1")
      setTimer((timer) => ({
        ...timer, 
        time: props.cycleTimeSelected,
        timeRemaining: props.cycleTimeSelected,
        cycle: props.cycleTimeSelected
        // isPaused:false
      }));
     
    }, [props])
    
      React.useEffect(() => {
        console.log("effect 2")
      if (timer.timeRemaining === 0) {
        clearInterval(timer.timerHandler)
        setTimer((timer) => ({
          ...timer,
          time: 0, 
          isPaused: true
        }));
       
      }
    }, [timer.timeRemaining])

    React.useEffect(() => {

      console.log("effect 3")
      if(timer.time === 0 && !timer.firstStart){
        setTimeout(function () {

 
        if(timer.onBreak){
          console.log("finished a break")
          timer.onBreak = false

        }else{
          console.log("set break")
          const breakDuration = breakDurations[timer.cycle]

          setTimer((timer) => ({
            ...timer, 
            onBreak:true,
            time: breakDuration,
            timeRemaining: breakDuration

          }));
        }
        
      }, 1000);

      }else{
        timer.firstStart = false
      console.log("handle start")
      handleStart()
      }
    
   
    }, [timer.time])

    const updateTimeRemaining = e => {
      setTimer(prev => {
        return { ...prev, timeRemaining: prev.timeRemaining - 1 }
      })
    }
    const handleStart = e => {

      if(timer.time !== 0){
        clearInterval(timer.timerHandler)
      const handle = setInterval(updateTimeRemaining, 1000);
      setTimer({ ...timer, isPaused: false, timerHandler: handle })
      }
    }
    const handlePause = e => {
      clearInterval(timer.timerHandler)
      setTimer({ ...timer, isPaused: true })
    }

     const timeFormat = (duration) => {   
      // Hours, minutes and seconds
      var hrs = ~~(duration / 3600);
      var mins = ~~((duration % 3600) / 60);
      var secs = ~~duration % 60;
  
      // Output like "1:01" or "4:03:59" or "123:03:59"
      var ret = "";
  
      if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
  
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
  }
    return <React.Fragment>
 
        {<div>
        {timer.isPaused &&  <div className="floatLeft"><i className="material-icons pause"><PlayCircleOutline onClick={handleStart}></PlayCircleOutline></i></div>}
        {!timer.isPaused &&  <div className="floatLeft"><i className="material-icons pause"><PausePresentation onClick={handlePause}></PausePresentation></i></div>}
   
        {`Remaining: ${timeFormat(timer.timeRemaining)}`}
      </div>}

    </React.Fragment>
  }



class Timer extends React.Component {

render(){

        return(
            <>
                <div className="floatLeft"><i className="material-icons bottom-toolbar stop"><Stop onClick={this.clickStop}></Stop></i></div>
                <div className="floatLeft"><i className="material-icons bottom-toolbar skip_next"><SkipNext onClick={this.clickSkip}></SkipNext></i></div>
                <div className="floatLeft"><div id="timer"><Countdown cycleTimeSelected={this.props.cycleTimeSelected}></Countdown></div></div>
              
            </>
        );
    }

}


export default Timer;

