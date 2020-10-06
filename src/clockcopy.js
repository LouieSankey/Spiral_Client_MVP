import React from 'react'
import { SkipNext, Stop, PausePresentation, PlayCircleOutline} from '@material-ui/icons';
import './Clock.css'
import useSound from 'use-sound';
import bark from './dog_bark.wav';
import tweet from './bird-tweet.mp3';

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
      timeEqualsTimeRemaning: true
    })


let breakDurations = {
  89: 13,
  55: 8,
  34: 5,
  21: 3,
  13: 0,
  8: 0,
  5: 3,
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

    const timeReset = () => {
        if(timer.time === timer.timeRemaining){
            return true
        }else{
            return false
        }
    }


    React.useEffect(() => {
        console.log("useEffect 1")

                if(!timer.pauseForModal){
                console.log("timer set from 1")
                setTimer((timer) => ({
                  ...timer, 
                  time: props.cycle,
                  timeRemaining: props.cycle,
                  cycle: props.cycle,
                  onBreak: false
                }));
               
            }
            if(timer.isPaused){
                timer.isPaused = false;
            }
            }, [props])

    React.useEffect(() => {

        if(timer.time === 0 && !timer.firstStart){
            console.log("every start but the first one")
        setTimeout(function () {
        if(timer.onBreak){

            playBark() 
            console.log(" the end of a break, so onBreak gets reset to false " )
          timer.onBreak = false
        }else{
           
          const breakDuration = breakDurations[timer.cycle] 
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
        }
       // props.postTask(timer.cycle)
        }

      }, 1000);

      }else{
       console.log("only the first start")
        if(timer.time === timer.timeRemaining){
        
        timer.firstStart = false
      handleStart()
        }

      }

    }, [timer.time, timer.time === timer.timeRemaining])

    React.useEffect(() => {

        if(props.pauseForModal){
            timer.pauseForModal = true
            handlePause()
        }else{
            timer.pauseForModal = false
             handleStart()    
        }
        
    }, [props.pauseForModal])
    
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
        console.log("something paused")
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

  const clickStop = () => {

}

const clickSkip = () => {

}

const [playBark] = useSound(bark, 
  { volume: 0.35 }
);

const [playTweet] = useSound(tweet, 
  { volume: 0.20 }
);
    return <React.Fragment>
 
        {<div>
        {timer.isPaused &&  <div className="floatLeft"><i className="material-icons pause"><PlayCircleOutline onClick={handleStart}></PlayCircleOutline></i></div>}
        {!timer.isPaused &&  <div className="floatLeft"><i className="material-icons pause"><PausePresentation onClick={handlePause}></PausePresentation></i></div>}
   
        {`Remaining: ${timeFormat(timer.timeRemaining)}`}
      </div>}

    </React.Fragment>
  }




class Clock extends React.Component {

render(){
        return(
            <>
                <div className="floatLeft"><i className="material-icons bottom-toolbar stop"><Stop onClick={this.clickStop}></Stop></i></div>
                <div className="floatLeft"><i className="material-icons bottom-toolbar skip_next"><SkipNext onClick={this.clickSkip}></SkipNext></i></div>
                <div className="floatLeft"><div id="timer"><Countdown postTask={this.props.postTask} pauseForModal={this.props.pauseForModal} cycle={this.props.cycle}></Countdown></div></div>
              
            </> 
        );
    }

}


export default Clock;