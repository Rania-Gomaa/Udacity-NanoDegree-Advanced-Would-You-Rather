import React from "react"
import Nav from "./Nav"
import { connect } from "react-redux"

class LeaderBoard extends React.Component {
    render(){
        const {users} = this.props;
        users.sort((a,b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length))
        
        return(
            <React.Fragment>
                <Nav/>
                <div className="leader-board">
                    
                   
                    <div className= "board-body">
                        {
                            users.map(user => (
                                
                                <div key={user.id} className="board-body">
                                    <p><img 
                                        src ={user.avatarURL}
                                        alt = {user.name}
                                        width="80" height="65"
                                    /></p>
                                    <p>Name: {user.name}</p> 
                                    <p>Created Questions: {user.questions.length}</p>
                                    <p>Answered Questions: {Object.keys(user.answers).length} </p>
                                    <p>Score: {Object.keys(user.answers).length + user.questions.length} </p>
                                </div>

                            ))
                        }
                    </div>
                   
                    
                </div>
            </React.Fragment>
            

        )
    }


}

function mapStateToProps ({ users, authedUser }) {
    const user = users[authedUser];
    return {
      users: Object.values(users),
      user
            
    }
}


export default connect(mapStateToProps)(LeaderBoard)