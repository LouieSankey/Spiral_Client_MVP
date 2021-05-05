import React, { Component } from 'react';
import fibSpiral from '../Img/55golden.png'
import spiralIcon from '../Img/Spiral-rotated.png'
import { Redirect, withRouter } from 'react-router-dom'
import MainContext from '../MainContext';
import ApiServices from '../api-services'
import LoginModal from '../Auth/Login.js'
import ScriptTag from 'react-script-tag';

// import './Landing.css'

import './scss/reset.scoped.css'


import './scss/style.scoped.css'
import './scss/style.scoped.scss';


class Landing extends Component {
  static contextType = MainContext;

  constructor(props) {
    super(props);
  }

  state = {
    showModal: false,
    redirect: false,
    account_id: null,
    incorrect_password: false,
    displayLoader: true

  };


  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: "/",
        state: { account_id: this.state.account_id }
      }} />
    }
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    })
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }

  handleLoginWithEmail = (email, password) => {
    const credentials = {
      email: email,
      password: password
    }

    ApiServices.getAccountByEmail(credentials)
      .then(account => {
        localStorage.setItem("account_id", account.id)
        localStorage.setItem("spiral_jwt_token", account.token)

        this.context.handleAPIRequest(account.id, account.token)
        this.setRedirect()
      })
      .catch(error => {
        if (error.error.message === "Invalid Credentials" || error.error.message === "account doesn't exist") {
          this.setState({
            incorrect_password: true
          })
        } else {
          console.error({ error })
        }


      })
  }

  handleSignupByEmail = (email, password, username) => {
    const account = {
      email: email,
      account_username: "",
      password: password
    }

    ApiServices.createAccount(account)
      .then((account) => {

        const project = {
          "project": "My First Project",
          "account": account.id
        }

        ApiServices.createProject(project, account.token)
          .then(project => {
            this.context.setCurrentProject(project)
          }).then(() => {
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

            ApiServices.createUserPrefs(userPrefs, account.token)
              .then(userPrefs => {

                localStorage.setItem("account_id", account.id)
                localStorage.setItem("spiral_jwt_token", account.token)

                this.context.handleAPIRequest(account.id, account.token)
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
    // document.body.classList.remove('body-margin-left')
    return (
      <>
        {this.renderRedirect()}
        {this.state.showModal &&
                  <LoginModal
                    handleClose={this.handleCloseModal}
                    handleSignup={this.handleSignupByEmail}
                    handleLogin={this.handleLoginWithEmail}
                    showPasswordError={this.state.incorrect_password}>
                  </LoginModal>
                }

               
<body className="is-boxed has-animations">
    <div className="body-wrap boxed-container">
        <header className="site-header">
            <div className="container">
                <div className="site-header-inner">
                    <div className="brand header-brand">
                        <h1 className="m-0">
                            <a href="#">
                                <img className="header-logo-image asset-light" src={require("./images/logo-light.svg").default} alt="Logo"></img>
                                <img className="header-logo-image asset-dark" src={require("./images/logo-dark.svg").default} alt="Logo"></img>
                            </a>
                        </h1>
                    </div>
                </div>
            </div>
        </header>

        <main>
            <section className="hero">
                <div className="container">
                    <div className="hero-inner">
                        <div className="hero-copy">
                            <img className="spiral-logo" src={require("./images/spiral-logo-text.png").default}></img>
                            <p className="hero-paragraph">Spiral is Productivity Tracking for Students, Freelancers, and Creatives.</p>
                            <div className="hero-cta">
                                <a className="button button-primary" onClick={this.handleOpenModal} href="#">Sign Up</a>
                             
                            </div>
                        </div>
                        <div className="hero-media">
                            <div className="header-illustration">
                                <img className="header-illustration-image asset-light" src={require("./images/header-illustration-light.svg").default} alt="Header illustration"></img>
                                <img className="header-illustration-image asset-dark" src={require("./images/header-illustration-dark.svg").default} alt="Header illustration"></img>
                            </div>
                            <div className="hero-media-illustration">
                                <img className="hero-media-illustration-image asset-light" src={require("./images/hero-media-illustration-light.svg").default} alt="Hero media illustration"></img>
                                <img className="hero-media-illustration-image asset-dark" src={require("./images/hero-media-illustration-dark.svg").default} alt="Hero media illustration"></img>
                            </div>
                            <div className="hero-media-container">
                                <img className="hero-media-image asset-light" src={require("./images/spiral-hero-image.png").default} alt="Hero media"></img>
                                <img className="hero-media-image asset-dark" src={require("./images/spiral-hero-image.png").default} alt="Hero media"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features section">
                <div className="container">
                    <div className="features-inner section-inner has-bottom-divider">
                        <div className="features-header text-center">
                            <div className="container-sm">
                                <h2 className="section-title mt-0">Traditional 'Stop Watch Style' Time Tracking Fails for 3 Reasons.</h2>
                          
                                <br/><br/><br/>
                            </div>
                        </div>
                        <div className="features-wrap">
                            <div className="feature is-revealing">
                                <div className="feature-inner">
                                    <div className="feature-icon">
                                        <img className="asset-light caution" src={require("./images/caution-image.png").default} alt="Feature 01"></img>
                                    </div>
                                    <div className="feature-content">
                                        <h3 className="feature-title mt-0">Poor Incentives</h3>
                                        <p className="text-sm mb-0">The longer you take on a task (or the slower you work), the more time you add to tracking, which makes you look more productive than you were.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="feature is-revealing">
                                <div className="feature-inner">
                                    <div className="feature-icon">
                                        <img className="asset-light caution" src={require("./images/caution-image.png").default} alt="Feature 02"></img>
                                    </div>
                                    <div className="feature-content">
                                        <h3 className="feature-title mt-0">Unbounded Time Frames</h3>
                                        <p className="text-sm mb-0">No thought is given upfront to how long a task should take, which means some tasks drag on longer than necessary, and others don't get enough focus.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="feature is-revealing">
                                <div className="feature-inner">
                                    <div className="feature-icon">
                                        <img className="asset-light caution" src={require("./images/caution-image.png").default} alt="Feature 03"></img>
                                    </div>
                                    <div className="feature-content">
                                        <h3 className="feature-title mt-0">Tedius to Use</h3>
                                        <p className="text-sm mb-0">There's no positive rewards cycle or engaging user experience, so using it feels more like a chore than a productivity boost.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features section">
                <div className="container">
                    <div className="features-inner section-inner has-bottom-divider">
                        <div className="features-header text-center">
                            <div className="container-sm">
                                <h2 className="section-title mt-0">The Spiral Difference</h2>
                                <p className="section-paragraph">Using The Golden Ratio, Spiral provides a framework for comparing potential time estimates, then starting a countdown timer for your task.  All it take's is a click!</p>
                                <p className="section-paragraph">(The numbers below are in minutes)</p>

                                <div className="features-image">
                                    <img className="features-illustration asset-dark" src={require("./images/features-illustration-dark.svg").default} alt="Feature illustration"></img>
                                    <img className="features-box asset-dark" src={require("./images/features-box-dark.svg").default} alt="Feature box"></img>
                                    <img className="features-illustration asset-dark" src={require("./images/features-illustration-top-dark.svg").default} alt="Feature illustration top"></img>
                                    <img className="features-illustration asset-light" src={require("./images/features-illustration-light.svg").default} alt="Feature illustration"></img>
                                    <img className="features-box asset-light" src={require("./images/golden.png").default} alt="Feature box"></img>
                                    <img className="features-illustration asset-light" src={require("./images/features-illustration-top-light.svg").default} alt="Feature illustration top"></img>

                                </div>

                            

                                <p className="section-paragraph">Then after your time expires, Spiral will alert you to return and select a new time period for your next task. </p>

                            </div>
                        </div>
                    </div>
                </div>
    </section>

    <section className="features section">
        <div className="container">
            <div className="features-inner section-inner has-bottom-divider">
                <div className="features-header text-center">
                    <div className="container-sm">

                        <br/><br/>
                        <h2 className="section-title mt-0">Additional Features</h2>
                        <br/><br/>

                        <img className="clock-icon" src={require("./images/break-icon.png").default} alt=""></img>
                        <p>Spiral lets you schedule "reward" breaks for after you've been working for a certain amount of time.</p>
                        <br/><br/><br/>


                        <img className="clock-icon" src={require("./images/folder-icon.png").default} alt=""></img>
                        <p>Spiral lets you keep all your tasks organized by project.</p>
                        <br/><br/><br/><br/>
                        <img className="clock-icon" src={require("./images/chart-icon.png").default} alt=""></img>
                        <p>Spiral lets you view inghts into how you've been working to help you make performance improvments over time. </p>
                        <br/><br/><br/>
                        <a className="button button-primary" onClick={this.handleOpenModal} href="#">Try It!</a>


                    </div>
                </div>
            </div>
        </div>
    </section>


    <section className="features section">
        <div className="container">
            <div className="features-inner section-inner has-bottom-divider">
                <div className="features-header text-center">
                    <div className="container-sm">

                        <h2 className="section-title mt-0">Productivity Benefits Include...</h2>
                        <br/><br/><br/>
                    </div>
                </div>
                <div className="features-wrap">
                    <div className="feature is-revealing">
                        <div className="feature-inner">
                            <div className="feature-icon">
                                <img className="asset-light check-mark" src={require("./images/green-check.png").default} alt="Feature 02"></img>
                            </div>
                            <div className="feature-content">
                                <p className="text-sm mb-0">Encouraging you to think about each task you want to accomplish before beginning.</p>
                            </div>
                        </div>
                    </div>
                    <div className="feature is-revealing">
                        <div className="feature-inner">
                            <div className="feature-icon">
                                <img className="asset-light check-mark" src={require("./images/green-check.png").default} alt="Feature 02"></img>
                            </div>
                            <div className="feature-content">
                                <p className="text-sm mb-0">Adding a time factor that encourages you to move through tasks more quickly.</p>
                            </div>
                        </div>
                    </div>
                    <div className="feature is-revealing">
                        <div className="feature-inner">
                            <div className="feature-icon">
                                <img className="asset-light check-mark" src={require("./images/green-check.png").default} alt="Feature 02"></img>
                            </div>
                            <div className="feature-content">
                                <p className="text-sm mb-0">Helping you break apart difficult or tedious tasks.</p>
                            </div>
                        </div>
                    </div>
                 
                    <div className="feature is-revealing">
                        <div className="feature-inner">
                            <div className="feature-icon">
                                <img className="asset-light check-mark" src={require("./images/green-check.png").default} alt="Feature 02"></img>
                            </div>
                            <div className="feature-content">
                                <p className="text-sm mb-0">And improving your break taking habits to help you avoid burnout!</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>
    </section>


    <section className="cta section">
        <div className="container-sm">
            <div className="cta-inner section-inner">
                <div className="cta-header text-center">
                    <h2 className="section-title mt-0">Plus it's Easy</h2>
                    <p className="section-paragraph">Just keep Spiral open in a browser tab while you work and it takes one click to begin a cycle. </p>
                    <div className="cta-cta">
                        <a className="button button-primary"onClick={this.handleOpenModal}  href="#">Yes, Try Spiral!</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </main>

    <footer className="site-footer has-top-divider">
        <div className="container">
            <div className="site-footer-inner">
                <div className="brand footer-brand">
                    <a href="#">
                        <img className="asset-light" src={require("./images/logo-light.svg").default} alt="Logo"></img>
                        <img className="asset-dark" src={require("./images/logo-dark.svg").default} alt="Logo"></img>
                    </a>
                </div>
                <ul className="footer-links list-reset">
                    <li>
                        <a href="#">Contact</a>
                    </li>
                    <li>
                        <a href="#">About us</a>
                    </li>
                    <li>
                        <a href="#">FAQ's</a>
                    </li>
                    <li>
                        <a href="#">Support</a>
                    </li>
                </ul>
                <ul className="footer-social-links list-reset">
                    <li>
                        <a href="#">
                            <span className="screen-reader-text">Facebook</span>
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z" fill="#FFF"/>
                                </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="screen-reader-text">Twitter</span>
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" fill="#FFF"/>
                                </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="screen-reader-text">Google</span>
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" fill="#FFF"/>
                                </svg>
                        </a>
                    </li>
                </ul>
                <div className="footer-copyright">&copy; 2021 Spiral Productivity, all rights reserved</div>
            </div>
        </div>
    </footer>
    </div>

    
</body>


         {/* <div className="content">
          <div className=" first-block">
            <div className="first-block-content two-column-split">
              <div className="align-left heading">
            

                <img className="spiral-text-logo" src={require("../Img/spiral-text-logo.png").default} alt=""/>
                <p className="p-large">Spiral is time tracking wrapped up in a meditation app. </p>
                <button className="splash-button" onClick={this.handleOpenModal}>SIGN UP</button>
              </div>
              <div className="align-right">
                <div className="intro-image">
                  <div className="img-wrapper">
                    <img className="galexy-image" src={require('../Img/spiral-mockup.png')} alt="a spiral galexy"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="second-section">
            <div className="centered-text">
              <h2 className="fails-for">Traditional 'Stop Watch Style' Time Tracking Falls Short for Three Reasons.</h2>
            </div>
            <div className="row">
              <div className="col centered-text">
                <div className="inner">
                  <h3 className="card-title">Unbounded Timeframes</h3>
                  <p>No thought is given upfront to how long a task should take, which means some tasks drag on longer than necesary, while others don't get enough focus.</p>
                </div>
              </div>
              <div className="col centered-text">
                <div className="inner">
                  <h3 className="card-title">Poor Incentives</h3>
                  <p>The longer you take on a task, the more productive it looks in terms of time tracking, i.e. "Wow, you spent a lot of time on that."</p>
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

          <div className="two-column-split benefits">
              <div className="align-left">
                <h2 className="spiral-diff">The Spiral Difference</h2>
                <h3>Spiral improves your productivity by:</h3>
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
                    <div>Providing no hassle time tracking.</div>
                  </li>
                  <li className="bullet">
                    <div>And improving your break taking habits to help you avoid burnout!</div>
                  </li>
                  <p>Plus, it's easy - just keep it open in a browser window while studying or doing computer work and it takes one click to begin a cycle.</p>
                </ul>
                <button className="splash-button" onClick={this.handleOpenModal}>TRY IT!</button>
              </div>
              <div className="align-right">
                <div className="image-container">
                  <img className="spiral-icon" src={spiralIcon} alt="a spiral"></img>
                </div>
              </div>
            </div>
        
          <div className="third-section">
            <div className="centered-text">
              <h2 className="spiral-diff">Based on Webber's Law</h2>
              <p className="p-heading">As the time it takes to complete a task grows, small additions in time become less consequential (think 1 minute added to 5 minutes, vs 1 minute added to an hour). This is described by a principal know as Webber's Law.</p>
            </div>
            <div className="two-column-split">
              <div className="align-left">
                <div className="image-container">
                  <img className="fib-spiral" src={fibSpiral} alt="a rectangle with golden ratio proportions"></img>
                </div>
              </div>
              <div className="align-right">
                <h2>Why Spiral Works</h2>
                <p> <br></br>Using The Golden Ratio, Spiral accounts for Webber's Law with a proportional framework where small time estimates
                                            are closer together, and larger time estimates are farther apart.</p>
                <ul className="bullet-list">
                  <li className="bullet">
                    <div>For small tasks (like writing a thank you email, for example) you can decide how long to give yourself with more fine grained control, i.e. minute values 3, 5 and 8. </div>
                  </li>
                  <li className="bullet">
                    <div>While for larger tasks (like writing an estimate for a client) you can choose from larger values with more differentiation, i.e. 21, 34, or 55.</div>
                  </li>
                  <li >
                    <div className="bullet">How you break apart your work for maximum benefit is up to you!</div>
                  </li>
                </ul>
                <button className="splash-button" onClick={this.handleOpenModal}>YES, TRY SPIRAL!</button>

              </div>
            </div>
         
          </div>
          <br/><br/>

        
        </div>  */}
      </>
    );
  }
}

export default withRouter(Landing)