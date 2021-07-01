import React from "react"
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Question from "./Question";

class QuestionCard extends React.Component{
    state={
        view: false,
        selectedQues:""
    }
    handleViewPoll(e){
        e.preventDefault();
        this.setState({
            view:true,
            selectedQues: e.target.id
        })
        //console.log(e.target.id)
    }

    
    render(){

        let questions = this.props.questions;

        return(
            <React.Fragment>
                <div className= "question-card">
                    {questions.map(q => (
                    <div className ="question-card" key= {q.id}>
                        <h2>{q.author} asks..</h2>
                        <h3>Would You Rather..?</h3>
                        <p id = "brief">...{q.optionOne.text}... </p>
                        <button className="view-btn" id = {q.id} onClick={e=>this.handleViewPoll(e)}>View Poll</button>                        

                    </div>
                    
                ))}
              

                { this.state.view &&  <Redirect to= {{
                    pathname:`/questions/${this.state.selectedQues}`,
                    state: { qid: this.state.selectedQues,
                             answered: this.props.answered }
                }} exact><Question/></Redirect>
                
               
                }
                

                </div>

            </React.Fragment>
        )


        
    }

};

const mapStateToProps = ({ users, authedUser }) => {
    const user = users[authedUser];
    return {
      authedUser,   
      authedName: user ? user['name'] : '',
      authedAvatar: user ? user['avatarURL'] : '',
    }
};

export default connect(mapStateToProps)(QuestionCard)