
import React, { Component } from 'react';
import './Splash.css'
import galexy from '../img/spiral-galexy-transparent.png'
import fibSpiral from '../img/55golden.png'
import spiralIcon from '../img/spiral-icon.png'

export default class Splash extends Component {
  
    render() {
        return (

<>

<div className="content">
                    <div className=" first-block">
                            <div className="first-block-content two-column-split">
                                <div className="align-left heading">

                                    <h1 className="spiral-productivity">Spiral Productivity</h1>
                                    <p className="p-large">Spiral is a simple workflow optimization tool with built in time tracking and break reminders. </p>
                                    <button>SIGN UP</button>
                               
                                </div>
                            <div className="align-right">

                                <div className="intro-image">
                                    <div className="img-wrapper">
                                        <img className="galexy-image" src={galexy} alt="alternative"></img>
                                    </div>
                                </div>

                            </div>
                            </div>
                
                    </div>


                <div className="second-section">
                        <div className="centered-text">
                            <h2 className="fails-for"> Traditional "Stop Watch Style" Time Tracking Fails for 3 reasons. </h2>
                        </div>
                    <div className="row">

                            <div className="col centered-text">
                                <div className="inner">
                                    <h4 className="card-title">Unbounded Timeframes</h4>
                                    <p>No thought is given upfront to how long a task should take. You may even forget to stop the clock when your task is finished!</p>
                                    </div>
                            </div>
                            <div className="col centered-text">
                            <div className="inner">
                                    <h4 className="card-title">Poor Incentives</h4>
                                    <p>The longer you take on a task, the more productive it looks in terms of time tracking, i.e. "Wow, you spent a lot of time on that!"</p>
                            </div>
                            </div>
                            <div className="col centered-text">
                                  <div className="inner">
                                    <h4 className="card-title">Tedious to Use</h4>
                                    
                                <p>There's no positive rewards cycle, so using it feels more like a chore than a productivity boost. </p>
                            </div>
                            </div>
                    </div>
                </div>



                <div className="third-section">
                    <div className="centered-text">
                            <h2 className="spiral-diff">The Spiral Difference</h2>
                            <p className="p-heading">Based on the Fibonnaci series, Spiral provides a simple framework for estimating how long a task will take before getting started on it.</p>
                    </div>
                    <div className="two-column-split">
                                        <div className="align-left">
                                            <div className="image-container">
                                                <img className="fib-spiral" src={fibSpiral} alt="alternative"></img>
                                            </div>
                                        </div>
                                        <div className="align-right">
                                        <h2>Why Spiral Works</h2>
                                        <p>As the time it takes to complete a task grows, small additions in time become less consequential (think 1 minute added to 5 minutes, vs 1 minute added to an hour). <br></br><br></br>Spiral accounts for this with a porortional framework where smaller estimates
                                            are closer together, and larger estimates are spaced farther apart.</p>
                                                <ul className="bullet-list">
                                                    <li className="bullet">
                                                        <div>For small tasks (like reading a page in a textbook, for example) you have minute values that are closer together, i.e. 3, 5 and 8. </div>
                                                    </li>
                                                    <li className="bullet">
                                                        <div>While for larger tasks (like reading an entire chapter) you can choose from minute values that are further apart, i.e. 21, 34, or 55.</div>
                                                    </li>
                                                    <li >
                                                    <div className="bullet">How you break apart your work for maximum benefit is up to you!</div>
                                                </li>

                                                </ul>
                                                <button>TRY IT!</button>
                                            
                                        </div>
                                        </div>

                                        <div className="two-column-split benefits">
                                    
                                                <div className="align-left">
                                                    <h2>Productivity Benefits</h2>
                                                    <p>Spiral improves your workflow and productivty by:</p>
        
                                                    <ul className="bullet-list">
                                                        <li className="bullet">
                                                            <div>Encouraging you to think about the task you want to accomplish before beginning.</div>
                                                        </li>
        
                                                        <li className="bullet">
                                                            <div>Adding a time factor that encourages you to move through tasks more quickly.</div>
                                                        </li>
                                                        <li className="bullet">
                                                            <div>Helping you break apart difficult or tedious tasks.</div>
                                                        </li>
                                                        <li className="bullet">
                                                            <div>Encouraging you to take more meaningful breaks.</div>
                                                        </li>
                                                       
        
                                                        <p>Plus, it's easy - just keep it open in a browser window while studying or doing computer work and it takes one click to begin a cycle.</p>
                                                    </ul>

                                                    <button>YES, TRY SPIRAL!</button>

                                                </div>
                                         

                                          <div className="align-right">

                                                <div className="image-container">
                                                    <img className="spiral-icon" src={spiralIcon} alt="alternative"></img>
                                                </div>

                                             </div>


                    </div>
                </div>
                </div>      
                        
                           
                       
        </>
        );
    }
}