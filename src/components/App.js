import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Home from "./Home"
import "../App.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import Question from './Question'
import Nav from './Nav'


export const NotFound = () => ( 
  <div className='not-found'>
    <Nav/>
    <h3> 404! Cannot find this page at the moment.</h3>
  </div>
);


class App extends Component {

  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  };

 
  render() {
    //console.log(this.props.loggedOut)
    return (
      <Router>
        <div>
          {
            this.props.loggedOut? (
              <div>
               
                  <Route path="/" component={Login}/>
              
                  
              
                
                
                
             
              </div>
            
            ):
            (<React.Fragment>
              
               <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/leaderboard' component={LeaderBoard} />
                <Route exact path='/add' component={NewQuestion} />
                <Route exact path = "/questions/:qid" render={(props) => <Question{...props}/>}/>
                <Route component={NotFound} />
              </Switch>
            </React.Fragment>
             
             
              
            )
          }
         
        </div>

      </Router>
      
    )
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    loggedOut: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
