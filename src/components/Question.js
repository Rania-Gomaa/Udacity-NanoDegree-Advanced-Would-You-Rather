import React from "react"
import { connect } from 'react-redux';
import { handleUserAnswer } from "../actions/shared";
import Nav from "./Nav";
import { NotFound } from './App';


class Question extends React.Component{
  
   
    state = {
        selectedOption:"",
        submitted: false,
       

    }
   

    onValueChange(event) {

        this.setState({
    
          selectedOption: event.target.value
    
        });
    
    };
    
    
    formSubmit(event) {
    
        event.preventDefault();
        this.setState({
            submitted:true
        })
        let answer = this.state.selectedOption
        if(!answer){
            alert("Please choose one answer.")
            return;
        }
       
        let qid = this.props.location.state.qid
        
        console.log(answer)
        this.props.dispatch(handleUserAnswer(this.props.authedUser, qid, answer))
    
    ;}

    render() {

        if(this.props.location.state === undefined){
            return <NotFound/>
        }
        if(this.props.questions[this.props.match.params.qid] === undefined){
            return <NotFound/>
        }
        let user = this.props.user;        
        let qid = this.props.location.state.qid;

        //console.log(qid)       
        let questions = this.props.questions
        
        
    
       
        return(
            <React.Fragment>
                <Nav/> 
              
                            
                {this.props.location.state.answered? (
                    <div key= {qid}>
                        <h2>Would You Rather..?</h2>
                        <p>Asked by: {questions[qid].author}</p>
                        <img 
                            src ={this.props.authedAvatar}
                            alt = {this.props.authedName}
                            width="80" height="70"
                        />
                        
                        <p id= "op1">Option One: {questions[qid].optionOne.text} &nbsp;

                            {user.answers[qid] === 'optionOne'&&
                            <img 
                            src = "/arrow.png"
                            alt = "Your Choice"
                            width="30" height="25"
                            />
                            }
                        </p>
                        <button className= "votes"> Votes: {questions[qid].optionOne.votes.length} &nbsp;&nbsp;
                        Percentage: {((questions[qid].optionOne.votes.length)/
                        ((questions[qid].optionOne.votes.length)+(questions[qid].optionTwo.votes.length)))*100}%
                        </button>
                        

                        
                        <p>Option Two: {questions[qid].optionTwo.text} &nbsp;
                            {user.answers[qid] === 'optionTwo'&&
                                <img 
                                src = "/arrow.png"
                                alt = "Your Choice"
                                width="30" height="25"
                                />
                            }
                        </p>
                        <button className= "votes">Votes: {questions[qid].optionTwo.votes.length} &nbsp;&nbsp;
                        Percentage: {((questions[qid].optionTwo.votes.length)/
                        ((questions[qid].optionOne.votes.length)+(questions[qid].optionTwo.votes.length)))*100}%
                        </button>
                        
                        
                    </div>
                ):(
                    <div className="question-card">
                        <h2>Would You Rather..?</h2>
                        <img 
                            src ={this.props.authedAvatar}
                            alt = {this.props.authedName}
                            width="80" height="70"
                        />
                        <form id= {qid} onSubmit={(e) => this.formSubmit(e)}>
                            <input 
                                type= "radio" 
                                name= "option" 
                                checked={this.state.selectedOption === "optionOne"}
                                value="optionOne"
                                onChange={(e)=>this.onValueChange(e)}/>{questions[qid].optionOne.text}
                            
                                {this.state.submitted &&

                                    (<div>
                                        <button className= "votes">
                                            <span>Votes: {questions[qid].optionOne.votes.length}</span>
                                        </button>
                                        {user.answers[qid] === 'optionOne'&&
                                            <img 
                                            src = "/arrow.png"
                                            alt = "Your Choice"
                                            width="30" height="25"
                                            />
                                        }
                                    </div>
                                    )
                                }
                            
                            <br></br>
                            <h2>OR</h2>
                            <input 
                                type= "radio" 
                                name= "option"
                                value = "optionTwo"
                                checked={this.state.selectedOption === "optionTwo"}
                                onChange={(e)=>this.onValueChange(e)} /> {questions[qid].optionTwo.text}
                            
                            {this.state.submitted &&
                            (<div>
                                <button className= "votes">
                                    <span>Votes: {questions[qid].optionTwo.votes.length}</span>
                                </button>
                                {user.answers[qid] === 'optionTwo'&&
                                    <img 
                                    src = "/arrow.png"
                                    alt = "Your Choice"
                                    width="30" height="25"
                                    />
                                }
                            </div>    
                            )
                            }
                            
                            
                            <br></br>

                            <button className= "submit" type="submit"> Submit </button>
                        </form>
                        
                    </div>

                )}


            </React.Fragment>
        )
    }
};

const mapStateToProps = ({ users, authedUser, questions }, {match}) => {
    const user = users[authedUser];
    
    return {
      authedUser,
      user,   
      authedName: user ? user['name'] : '',
      authedAvatar: user ? user['avatarURL'] : '',
      questions,
      
      
      
    }
};

export default connect(mapStateToProps)(Question)