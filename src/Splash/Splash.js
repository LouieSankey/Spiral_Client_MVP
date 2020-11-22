import React, { Component } from 'react';
import './Splash.css'
import fibSpiral from '../Img/55golden.png'
import spiralIcon from '../Img/spiral-icon.png'
import { Redirect, withRouter } from 'react-router-dom'
import ApiContext from '../ApiContext';
import ApiServices from '../api-services'
import LoginModal from '../Login/Login.js'


class Splash extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
  }

  state = {
    showModal: false,
    redirect: false,
    account_id: null,
    incorrect_password: false

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
        this.context.handleAPIRequest(account.id)
        this.setRedirect()
      })
      .catch(error => {
        if (error.error.message === "Incorrect Password") {
          this.setState({
            incorrect_password: true
          })
          console.log("incorrect password")
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

        ApiServices.createProject(project)
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
    document.body.classList.remove('body-margin-left')
    return (
      <>
        {this.renderRedirect()}
        <div className="content">
          <div className=" first-block">
            <div className="first-block-content two-column-split">
              <div className="align-left heading">
                {this.state.showModal &&
                  <LoginModal
                    handleClose={this.handleCloseModal}
                    handleSignup={this.handleSignupByEmail}
                    handleLogin={this.handleLoginWithEmail}
                    showPasswordError={this.state.incorrect_password}>
                  </LoginModal>
                }

                <h1 className="spiral-productivity">Spiral</h1>
                <p className="p-large">Spiral is a mindfulness tool for office work with built in time tracking and break taking reminders. </p>
                <button className="splash-button" onClick={this.handleOpenModal}>SIGN UP</button>
              </div>
              <div className="align-right">
                <div className="intro-image">
                  <div className="img-wrapper">
                    <img className="galexy-image" src={require('../Img/splashspiral.png')} alt="a spiral galexy"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="two-column-split benefits">
              <div className="align-left">
                <h2 className="spiral-diff">Productivity Benefits</h2>
                <h3>Spiral improves your productivity by:</h3>
                <ul className="bullet-list">
                  <li className="bullet">
                    <div>Encouraging you to think about the task you want to accomplish before beginning.</div>
                  </li>
                  <li className="bullet">
                    <div>Adding a time factor that encourages you to move through tasks more quickly.</div>
                  </li>
                  <li className="bullet">
                    <div>Helping you break apart difficult or tedius tasks.</div>
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
              <h2 className="spiral-diff">Backed by Science (and Sacred Geometry)</h2>
              <p className="p-heading">As the time it takes to complete a task grows, small additions in time become less consequential (think 1 minute added to 5 minutes, vs 1 minute added to an hour). This is described by a scientific principal know as Webber's Law.</p>
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
                    <div>While for larger tasks (like writting an estimate for a client) you can choose from larger values with more differentiation, i.e. 21, 34, or 55.</div>
                  </li>
                  <li >
                    <div className="bullet">How you break apart your work for maximum benefit is up to you!</div>
                  </li>
                </ul>
                <button className="splash-button" onClick={this.handleOpenModal}>YES, TRY SPIRAL!</button>

              </div>
            </div>
         
          </div>

          {/* <div className="second-section">
            <div className="centered-text">
              <h2 className="fails-for"> Why Traditional "Stop Watch Style" Time Tracking Fails. </h2>
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
          </div> */}
        </div>
      </>
    );
  }
}

export default withRouter(Splash)