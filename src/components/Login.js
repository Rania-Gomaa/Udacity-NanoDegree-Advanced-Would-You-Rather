import React from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';


class Login extends React.Component {

  
  handleClick = (value) =>{
     
    let authedUser = this.props.users.filter(
      user => user.name.toLowerCase().includes(value.toLowerCase()))
      .map(u => u.id)
    let [authedUserID] =  authedUser
    this.props.dispatch(setAuthedUser(authedUserID));
  }

  render(){

    const {users} = this.props;
    return(
        <React.Fragment>
            <div className = "login-form">
              <h1>Would You Rather?</h1>
              <img 
                src = "/index.jpeg"
                alt = "Your Choice"
                
              />
              <h2>Login as..</h2>
                             
              <select id="users" defaultValue = "choose" onChange = { (e) => this.handleClick(e.target.value)} >
                <option value="choose" disabled>
                  Login as..
                </option>
                      
                {users.map((user) => (
                     
                    <option 
                      key= {user.id}
                      
                    >{user.name}</option>
                                                                                                            
                ))
                }
              </select>
                              
            </div>

        </React.Fragment>
    )

}
};

function mapStateToProps ({ users }) {
  return {
    users: Object.values(users)
          
  }
};

export default connect(mapStateToProps)(Login)