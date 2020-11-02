import React from 'react'
import './Clock.css'
import useSound from 'use-sound';
import bark from './dog_bark.wav';
import tweet from './bird-tweet.mp3';
import gong from './opening_gong.wav'
import { SkipNext, Stop, PausePresentation, PlayCircleOutline} from '@material-ui/icons';
import ApiContext from '../../../ApiContext'


//the countdown timer itself uses a hook, the class that implements it is at the bottom
function Countdown(props) {

    const [timer, setTimer] = React.useState({
      name: 'timer',
      onBreak:false,
      firstStart:true,
      isPaused: true,
      pauseForModal: false,
      time: 0,
      timeRemaining: 0,
      timerHandler: null,
      cycle: 0,
      timeEqualsTimeRemaning: true,
      showToolbar: false
    
    })

    const [taskBarCounter] = React.useState({
      counter: 0
    })

    
    let taskBarProps = props.taskBarCounter
    let allowCountdownRestart = (taskBarCounter.counter !== taskBarProps) ? true : false


// let breakDurations1 = {
//   89: 13,
//   55: 8,
//   34: 5,
//   21: 3,
//   13: 2,
//   8: 0,
//   5: 0,
//   3: 0,
//   2: 0
// }

const context = React.useContext(ApiContext);
let breakDurations = context.prefs

// console.log("bread durations1 " + JSON.stringify(breakDurations1))

console.log("break durations " + JSON.stringify(breakDurations))

React.useEffect(() => { 

  console.log(taskBarProps, taskBarCounter.counter, allowCountdownRestart)

if(allowCountdownRestart){
  taskBarCounter.counter = taskBarCounter.counter + 1
  allowCountdownRestart = false
}else{

  allowCountdownRestart = true

}

}, [props, allowCountdownRestart])




      React.useEffect(() => {

        if(props.pauseForModal){
            timer.pauseForModal = true
            handlePause()
        }else{
        setTimeout(() => {
            timer.pauseForModal = false

             handleStart()  
        }, 300);
            
        }
        
    }, [props.pauseForModal])


    React.useEffect(() => {

      if(allowCountdownRestart){
            if(!timer.pauseForModal){
            console.log("timer is being reset with props")
            setTimer((timer) => ({
              ...timer, 
              time: props.cycle * 60,
              timeRemaining: props.cycle * 60,
              cycle: props.cycle,
              onBreak: false
            }));
            
          }
            if(timer.isPaused){
               console.log("if timer is paused, it is being unpaused")
                timer.isPaused = false;
                
            }
          }

            }, [props])



    React.useEffect(() => {

        if(timer.time === 0 && !timer.firstStart){
            console.log("start for breaks (automatic start)")
        setTimeout(function () {
        if(timer.onBreak){

            playBark() 
            timer.showToolbar = false
            if(timer.cycle !== 0){
              props.updateDB(timer.cycle) 
            }
            

            console.log(" the end of a break, so onBreak gets reset to false " )
          timer.onBreak = false
        }else{

          //access prop or context here for break prefs
           
          const breakDuration = breakDurations[timer.cycle] * 60 

          if(breakDuration !== 0){
            playTweet()
            console.log(" starts a break, after breakduration is check and > 0 " )

          setTimer((timer) => ({
            ...timer, 
            onBreak:true,
            time: breakDuration,
            timeRemaining: breakDuration
          }));
        }else{
            playBark() 
            timer.showToolbar = false
        }
       
        props.updateDB(timer.cycle) 
        }
   
      }, 1000);

      }else{
      
        if(timer.time === timer.timeRemaining){
         console.log("called for non breaks (regular start)")
       
        timer.firstStart = false
        timer.showToolbar = true
      handleStart()
        }

      }

    }, [timer.time, timer.time === timer.timeRemaining])

   
    
      React.useEffect(() => {

      if (timer.timeRemaining === 0) {
        clearInterval(timer.timerHandler)
        setTimer((timer) => ({
          ...timer,
          time: 0, 
          isPaused: true
        }));
       
      }

    }, [timer.timeRemaining])

   

    

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
        console.log("paused")
      clearInterval(timer.timerHandler)
      setTimer({ ...timer, isPaused: true })
    }

     const timeFormat = (duration) => { 
       
      if(duration > 0){
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
    }else{
      return "00:00"
    }
  }

  const handleSkip = () => {

    clearInterval(timer.timerHandler)
    setTimer({ ...timer, timeRemaining: 0 })
}

const handleStop = () => {

  clearInterval(timer.timerHandler)
  // props.updateDB(timer.cycle)
  setTimer({ ...timer, onBreak:true, cycle:0, timeRemaining: 0 })

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


    return <React.Fragment>


          {timer.onBreak ? 
          <h2>On Break: {timeFormat(timer.timeRemaining)}</h2>
          :  <h2> Time Left: {timeFormat(timer.timeRemaining)}</h2>}

        

          {timer.showToolbar &&
          <div className="toolbar-container">
                

                <div className="toolbar-icons">

                  <i className="tooltip"><Stop className="toolbar-icon" onClick={handleStop}></Stop>
                  <span class="tooltiptext">Stop</span></i>

                  <i className="tooltip"><SkipNext className="toolbar-icon" onClick={handleSkip} ></SkipNext>
                  <span class="tooltiptext">Skip to Break</span></i>

                  {!timer.isPaused ?
                    <i className="tooltip"><PausePresentation className="toolbar-icon" onClick={handlePause}></PausePresentation>
                    <span class="tooltiptext">Pause</span></i>
                    :
                    <i className="tooltip"><PlayCircleOutline className="toolbar-icon" onClick={handleStart}></PlayCircleOutline>
                    <span class="tooltiptext">Play</span></i>
                  }
                  </div>
               

               
                </div>}
    
  
    </React.Fragment>
  }


class Clock extends React.Component {

render(){
        return(
            <>

                <div className="floatLeft"><div id="timer"><Countdown updateDB={this.props.updateDB} pauseForModal={this.props.pauseForModal} cycle={this.props.cycle} taskBarCounter={this.props.taskBarCounter}></Countdown></div></div>

            </> 
        );
    }

}


export default Clock;