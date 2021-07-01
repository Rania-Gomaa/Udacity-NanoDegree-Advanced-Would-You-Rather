
import React from 'react'
import Nav from "./Nav"
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';

class Home extends React.Component{
    state = {
        answered: false
    };
    viewAnswQues = () => {
        this.setState({ 
            answered: true,   
        });
     
    };

    viewNotAnswQues = () => {
        
        this.setState({ 
            answered: false,   
        });
    };

    render(){

        
        //let authedAnsweredQues = this.props.authedAnsweredQuesID.map(id => this.props.questions[id]).sort((a, b) => a.timestamp - b.timestamp);
        //console.log(authedAnsweredQues)      
        //let UnAnsweredQues = this.props.questionsValues.filter(q => authedAnsweredQues.indexOf(q) === -1).sort((a, b) => a.timestamp - b.timestamp);
        return(
            <React.Fragment>
                <Nav/>
                <br></br>
                <button className= "home-btn" onClick= {this.viewAnswQues} >Answered Questions</button>
                <button className= "home-btn" onClick={this.viewNotAnswQues}>Not Answered Questions</button>
                <hr></hr>
                <div className="show-ques">
                    {this.state.answered?
                     <QuestionCard questions={this.props.authedAnsweredQues} answered = {this.state.answered}/>
                    : <QuestionCard questions= {this.props.UnAnsweredQues} answered = {this.state.answered}/>
                    } 
                    

                </div>
                
            </React.Fragment>
        )
    }
};

const mapStateToProps = ({ users, authedUser, questions }) => {
    const user = users[authedUser];
    let authedName= user ? user['name'] : '';
    let authedAvatar= user ? user['avatarURL'] : '';
    let authedAnsweredQuesID = user? Object.keys(user['answers']): '';
    let questionsValues= Object.values(questions);
    let authedAnsweredQues= authedAnsweredQuesID? authedAnsweredQuesID.map(id => questions[id]).sort((a, b) => b.timestamp - a.timestamp): "";
    let UnAnsweredQues = questionsValues.filter(q => authedAnsweredQues.indexOf(q) === -1).sort((a, b) => b.timestamp - a.timestamp);
    return {
      authedName,
      authedAvatar,
      authedAnsweredQues, 
      UnAnsweredQues, 
      questions,
      questionsValues
    }
};
export default connect(mapStateToProps)(Home)