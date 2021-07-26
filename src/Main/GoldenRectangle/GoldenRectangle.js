import React, { Component } from 'react'
import './GoldenRectangle.css'
import MainContext from '../../MainContext'
import { TramOutlined } from '@material-ui/icons'
const birdTweet = require('../../Img/white-gong.png').default
const dogBark = require('../../Img/dogbark1.png').default


export default class GoldenRectangle extends Component {

  static contextType = MainContext;

    state = {

        sets: [[34, 21, 13, 8, 5, 3], [21, 13, 8, 5, 3, 2], [13, 8, 5, 3, 2, 1], [89, 55, 34, 21, 13, 8], [55, 34, 21, 13, 8, 5]],
        setIndex: 4,
        pauseForModal: false,
        alarmIcon: "",
        hoverSelection: false,
        firstStart: true
     
    }

    changeSpiralNumbers() {
        if (this.state.setIndex === 4) {
            this.setState(prevState => {
                return { setIndex: 0 }
            })
        } else {
            this.setState(prevState => {
                return { setIndex: prevState.setIndex + 1 }
            })
        }

    }

    SetAlarmIcon = (selectedValue) => {
        //this needs to check if its currenctly on a break period, you could check the dom text
        // const breakValue = this.context.prefs[selectedValue]
        this.setState(prevState => {
            return { alarmIcon: birdTweet}
        })
        // if(breakValue > 0){

        //     this.setState(prevState => {
        //         return { alarmIcon: birdTweet}
        //     })

        // }else{
        //     this.setState(prevState => {
        //         //this will be dog bark on break
        //         return { alarmIcon: birdTweet}
        //     })
        // }
    }

    
        handleSelection = (index) => {
            const currentIndex = this.state.sets[this.state.setIndex]
            this.props.updateCycle(currentIndex[index])
            this.SetAlarmIcon(currentIndex[index])
        }

        handleBreakSelected = () => {
            this.setState(prevState => {return { hoverSelection: false }})
            this.props.takeBreak()
            this.props.updateCycle(this.context.prefs['break_duration'])

              this.setState(prevState => {
            return { alarmIcon: birdTweet}
        })

        }
        
      

    render() {
        const currentIndex = this.state.sets[this.state.setIndex]

        return (
            <>
            {this.state.hoverSelection && 
            <div className="break-message"
               onMouseEnter={() => this.setState(prevState => {return { hoverSelection: true }})}
               onMouseLeave={() => this.setState(prevState => {return { hoverSelection: false }})}
             onClick={() => this.handleBreakSelected()}>Break First?</div>}
                <div className="container" >

                    {this.state.alarmIcon !== "" ?
                    <img className="alarm-sound" src={this.state.alarmIcon} alt=""/> :
                    <img className="alarm" src={require('../../Img/whitealarm2.png').default} alt=""/>
                    }

                    <div className="item box7"
                    onMouseEnter={ currentIndex[0] > this.props.timeRemainingUntilBreak ? () => this.setState(prevState => {return { hoverSelection: true }}) : () => this.setState(prevState => {return { hoverSelection: false }})}  
                    onMouseLeave={() => this.setState(prevState => {return { hoverSelection: false }})}
                    ><button className="clickable" 
                        
                        onClick={() => this.handleSelection(0)}>  
                        {currentIndex[0]}
                    </button></div>

                    <div className="item box6"><button className="clickable" 
                        onMouseEnter={ currentIndex[1] > this.props.timeRemainingUntilBreak ?  () => this.setState(prevState => {return { hoverSelection: true }}) : () => this.setState(prevState => {return { hoverSelection: false }})}  
                        onMouseLeave={() => this.setState(prevState => {return { hoverSelection: false }})}
                        onClick={() => this.handleSelection(1)}> 
                        {currentIndex[1]}
                    </button></div>

                    <div className="item box5"><button className="clickable" 
                    onMouseEnter={ currentIndex[2] > this.props.timeRemainingUntilBreak ?  () => this.setState(prevState => {return { hoverSelection: true }}) : () => this.setState(prevState => {return { hoverSelection: false }})}  
                    onMouseLeave={() => this.setState(prevState => {return { hoverSelection: false }})}
                    onClick={() => this.handleSelection(2)}>
                        {currentIndex[2]}
                    </button></div>

                    <div className="item box3"><button className="clickable"
                   onMouseEnter={ currentIndex[3] > this.props.timeRemainingUntilBreak ?  () => this.setState(prevState => {return { hoverSelection: true }}) : () => this.setState(prevState => {return { hoverSelection: false }})}  
                   onMouseLeave={() => this.setState(prevState => {return { hoverSelection: false }})}
                    onClick={() => this.handleSelection(3)}>
                        {currentIndex[3]}
                    </button></div>

                    <div className="item box2"><button className="clickable"
                    onMouseEnter={ currentIndex[4] > this.props.timeRemainingUntilBreak ?  () => this.setState(prevState => {return { hoverSelection: true }}) : () => this.setState(prevState => {return { hoverSelection: false }})}  
                    onMouseLeave={() => this.setState(prevState => {return { hoverSelection: false }})}
                    onClick={() => this.handleSelection(4)}>
                        {currentIndex[4]}
                    </button></div>

                    <div className="item box1"><button className="clickable"
                    onMouseEnter={ currentIndex[5] > this.props.timeRemainingUntilBreak ?  () => this.setState(prevState => {return { hoverSelection: true }}) : () => this.setState(prevState => {return { hoverSelection: false }})}  
                    onMouseLeave={() => this.setState(prevState => {return { hoverSelection: false }})}
                    onClick={() => this.handleSelection(5)}>
                        {currentIndex[5]}
                    </button></div>

                    <div className="item box0"><button className="clickable" 
                    onClick={() => this.changeSpiralNumbers()}>
                        <span className="plus-minus">-</span></button>
                    </div>
                     </div>
               
      
            </>
        )
    }

}