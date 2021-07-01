import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import Login from './Login';

class Nav extends React.Component {
  

  handleLogOut = () => {
   
    this.props.dispatch(setAuthedUser(null))
  };

 
  
  render () {
    //console.log(this.props.loggedOut)
  return (
    <div className="nav-bar">
        <span>
            <Link  to="/">Home</Link>
        </span>
        <span>   
            <Link to ="/leaderboard">Leader Board</Link>
        </span>
        <span>   
            <Link to ="/add">Create Question</Link>
        </span>
        <span className="user-name"> Hello, {this.props.authedName} &nbsp;&nbsp;
          <img 
            src ={this.props.authedAvatar}
            alt = {this.props.authedName}
            width="30" height="25"
          />
           
        </span> 
        <Link to="/"> 
          <button className="logout" onClick = {()=> this.handleLogOut()}
          > Log Out</button>
        </Link>
        
     

    {this.props.loggedOut&& <Login/>}    
      
    </div> 
  )
}
};

const mapStateToProps = ({ users, authedUser }) => {
    const user = users[authedUser];
    return {
      authedName: user ? user['name'] : '',
      authedAvatar: user ? user['avatarURL'] : '',
      loggedOut:  authedUser === null
    }
};

export default connect(mapStateToProps)(Nav)