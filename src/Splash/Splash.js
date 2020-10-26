
import React, { Component } from 'react';
import './Splash.css'
import galexy from '../Img/spiral-galexy-transparent.png'
import fibSpiral from '../Img/55golden.png'
import spiralIcon from '../Img/spiral-icon.png'
import LoginModal from "react-login-modal-sm";
import { Redirect, withRouter } from 'react-router-dom'
import ApiContext from '../ApiContext';
import ApiServices from '../api-services'


class Splash extends Component {
    static contextType = ApiContext;

  constructor(props){
    super(props);
    this.handleSignupByEmail = this.handleSignupByEmail.bind(this)
  }

    state = {
        showModal: false,
        redirect: false,
        account_id: null,
      
      };

      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect  to={{
            pathname: "/",
            state: { account_id: this.state.account_id }
          }}/>
        }
      }
    
      toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
      };

      handleLoginWithEmail = (email, password) => {

      ApiServices.getAccountByEmail(email)
        .then(account => {
          localStorage.setItem("account_id", account.id)
          this.context.handleAPIRequest(account.id)
          this.setRedirect()
          })
          .catch(error => {
            console.error({ error })
          })
        }

      handleSignupByEmail = (email, username, password) => {

           const account = {
               email: email,
               account_username: username,  
               password: "no password"
           }

        ApiServices.createAccount(account)
            .then((account) => {

                  const project = {
                    "project": "My First Project",
                    "account": account.id
                  }

                ApiServices.createProject(project)
                    .then(project => {
                    console.log("posted task to db: " + JSON.stringify(project))
                 
                    this.context.setCurrentProject(project)
                  
                }).then(() =>{

                      const userPrefs = {
                        'account': account.id,
                        'gong': true, 
                        '_1': 0,
                        '_2': 0, 
                        '_3': 0, 
                        '_5': 0, 
                        '_8': 0, 
                        '_13': 2, 
                        '_21': 3, 
                        '_34': 5, 
                        '_55': 8, 
                        '_89': 13  
                      }

                      console.log(JSON.stringify(userPrefs))

                    ApiServices.createUserPrefs(userPrefs)
                        .then(userPrefs => {
                          localStorage.setItem("account_id", account.id)
                          console.log("posted user prefs to db: " + JSON.stringify(userPrefs))
                          this.context.handleAPIRequest(account.id)
                          this.setRedirect()
                    }).catch(error => {
                      console.error({ error })
                    })
                  })
            })
          .catch(error => {
            console.error({ error })
          })
      };
     
     
  
    render() { 
        const customUsernameRegex = /^[a-zA-Z0-9_]{5,}/;

      const loginModalLabels = {
        loginTitle: "Log in: guest@spiral-productivity.com w/ pass: 123456789",
        signupTitle: "Create new user",
        forgotTitle: "Reset password",
        loginFacebookButton: "Log in with Facebook",
        loginGoogleButton: "Log in with Google",
        loginEmailButton: "Log in with email",
        signupFacebookButton: "Sign up with Facebook",
        signupGoogleButton: "Sign up with Google",
        signupEmailButton: "Sign up with email",
        forgotButton: "Send new password",
        loginEmailPlaceholder: "Type email",
        loginPasswordPlaceholder: "Type password",
        signupUsernamePlaceholder: "Type username",
        signupLink: "Create new user?",
        loginLink: "Already a user?",
        forgotLink: "Forgot password?",
        orLabel: "or"
      }



        return (

<>
{this.renderRedirect()}

<div className="content">
                    <div className=" first-block">
                            <div className="first-block-content two-column-split">
                                <div className="align-left heading">
                                <LoginModal showModal={this.state.showModal}
                                toggleModal={this.toggleModal} 
                                onLoginEmail={this.handleLoginWithEmail}
                                onSignupEmail={this.handleSignupByEmail}
                                labels={loginModalLabels}

                                usernameRegex={customUsernameRegex}
                               />

                                    <h1 className="spiral-productivity">Spiral Productivity</h1>
                                    <p className="p-large">Spiral is a simple workflow optimization tool with built in time tracking and break taking reminders. </p>
                                    <button className="splash-button" onClick={this.toggleModal}>SIGN UP</button>
                              
                                    
                                </div>
                            <div className="align-right">

                                <div className="intro-image">
                                    <div className="img-wrapper">
                                        <img className="galexy-image" src={galexy} alt="a spiral galexy"></img>
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
                                    <h3 className="card-title">Unbounded Timeframes</h3>
                                    <p>No thought is given upfront to how long a task should take. You may even forget to stop the clock when your task is finished!</p>
                                    </div>
                            </div>
                            <div className="col centered-text">
                            <div className="inner">
                                    <h3 className="card-title">Poor Incentives</h3>
                                    <p>The longer you take on a task, the more productive it looks in terms of time tracking, i.e. "Wow, you spent a lot of time on that!"</p>
                            </div>
                            </div>
                            <div className="col centered-text">
                                  <div className="inner">
                                    <h3 className="card-title">Tedious to Use</h3>
                                    
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
                                                <img className="fib-spiral" src={fibSpiral} alt="a rectangle with golden ratio proportions"></img>
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
                                                        <div>While for larger tasks (like reading an entire chapter) you can choose from values that are further apart, i.e. 21, 34, or 55.</div>
                                                    </li>
                                                    <li >
                                                    <div className="bullet">How you break apart your work for maximum benefit is up to you!</div>
                                                </li>

                                                </ul>
                                                <button className="splash-button" onClick={this.toggleModal}>TRY IT!</button>
                                            
                                        </div>
                                        </div>

                                        <div className="two-column-split benefits">
                                    
                                                <div className="align-left">
                                                    <h2>Productivity Benefits</h2>
                                                    <p>Spiral improves your productivity by:</p>
        
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
                                                            <div>Tracking your time.</div>
                                                        </li>

                                                        <li className="bullet">
                                                            <div>Encouraging you to take regular breaks.</div>
                                                        </li>

                                                        <li className="bullet">
                                                            <div>And helping you avoid burnout!</div>
                                                        </li>

                                                      
    
                                                        
                                                       
        
                                                        <p>Plus, it's easy - just keep it open in a browser window while studying or doing computer work and it takes one click to begin a cycle.</p>
                                                    </ul>

                                                    <button className="splash-button" onClick={this.toggleModal}>YES, TRY SPIRAL!</button>

                                                </div>
                                         

                                          <div className="align-right">

                                                <div className="image-container">
                                                    <img className="spiral-icon" src={spiralIcon} alt="a spiral"></img>
                                                </div>

                                             </div>


                    </div>
                </div>
                </div>      
                        
                           
                       
        </>
        );
    }
}

export default withRouter(Splash)