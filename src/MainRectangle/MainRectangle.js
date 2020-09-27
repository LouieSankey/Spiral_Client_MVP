import React, { Component } from 'react'
import './MainRectangle.css'

export default class MainRectangle extends Component {
    static defaultProps = {}

    render() {
        // const {  } = this.props
        return (
            <div className="container">
                <div className="item box7"><a className="clickable">55</a></div>
                <div className="item box6"><a className="clickable">34</a></div>
                <div className="item box5"><a className="clickable">21</a></div>
                <div className="item box3"><a className="clickable">13</a></div>
                <div className="item box2"><a className="clickable">8</a></div>
                <div className="item "><a className="clickable">5</a></div>
                <div className="item box0"><a className="clickable">
                    <img id="spiral_image" src="./plus_minus.png" width="14px" alt=""></img></a>
                </div>
            </div>
        )}

}