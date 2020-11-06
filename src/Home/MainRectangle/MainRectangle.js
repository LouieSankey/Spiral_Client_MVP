import React, { Component } from 'react'
import './MainRectangle.css'


export default class MainRectangle extends Component {

    state = {

        sets: [[34, 21, 13, 8, 5, 3], [21, 13, 8, 5, 3, 2], [89, 55, 34, 21, 13, 8], [55, 34, 21, 13, 8, 5]],
        setIndex: 3,
        pauseForModal: false
    }

    changeSpiralNumbers() {
        if (this.state.setIndex === 3) {
            this.setState(prevState => {
                return { setIndex: 0 }
            })
        } else {
            this.setState(prevState => {
                return { setIndex: prevState.setIndex + 1 }
            })
        }

    }

    render() {
        const currentIndex = this.state.sets[this.state.setIndex]

        return (
            <>
                <div className="container">
                    <div className="item box7">
                        <button className="clickable" onClick={() => this.props.updateCycle(currentIndex[0])}>{currentIndex[0]}</button>
                    </div>
                    <div className="item box6"><button className="clickable" onClick={() => this.props.updateCycle(currentIndex[1])}>{currentIndex[1]}</button></div>
                    <div className="item box5"><button className="clickable" onClick={() => this.props.updateCycle(currentIndex[2])}>{currentIndex[2]}</button></div>
                    <div className="item box3"><button className="clickable" onClick={() => this.props.updateCycle(currentIndex[3])}>{currentIndex[3]}</button></div>
                    <div className="item box2"><button className="clickable" onClick={() => this.props.updateCycle(currentIndex[4])}>{currentIndex[4]}</button></div>
                    <div className="item box1"><button className="clickable" onClick={() => this.props.updateCycle(currentIndex[5])}>{currentIndex[5]}</button></div>
                    <div className="item box0"><button className="clickable" onClick={() => this.changeSpiralNumbers()}>
                        <p className="plus-minus">+/-</p></button>
                    </div>
                </div>
            </>
        )
    }

}