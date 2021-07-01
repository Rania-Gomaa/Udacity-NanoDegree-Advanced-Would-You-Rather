import React from "react";
import Nav from "./Nav";
import { Link, Redirect } from 'react-router-dom';
import { handleSaveQuestion } from "../actions/shared";
import { connect } from 'react-redux';




class NewQuestion extends React.Component{
    state = {
        optionOne:'',
        optionTwo:'',
        submit: false
    }

   updateOPtionOne = (optionOne) => {
    this.setState ({ 
        optionOne
               
        });
    };

    updateOPtionTwo = (optionTwo) => {
        this.setState ({ 
            optionTwo
                  
        });

   };

    handleNewQues = (e) => {
        this.setState({
            submit:true
        })
        e.preventDefault();
        if((this.state.optionOne === "") || (this.state.optionTwo === "") ){
            alert("Please Enter Your Options.")
            return
        }

        this.props.dispatch(handleSaveQuestion(this.state.optionOne,this.state.optionTwo))        
    }
    
    render() {
        return(
            <React.Fragment>
                <Nav/>
                <div className="add-question">
                    <form className="new-question">
                        <h1>Create New Question.</h1>
                        <img 
                            src = "/think.jpeg"
                            alt = "add question"
                            
                        />
                        <h2>Would You Rather..?</h2>
                        <p><input 
                            placeholder="Enter First Option" 
                            value={this.state.optionOne} 
                            onChange ={(evt) => this.updateOPtionOne(evt.target.value)} 
                        ></input></p>
                        <p>OR</p>
                        <p><input 
                            placeholder="Enter Second Option" 
                            value = {this.state.optionTwo}
                            onChange ={(evt) => this.updateOPtionTwo(evt.target.value)} 
                        ></input></p>
                        <Link to = "/">
                            <button className=" submit" onClick={(e)=>this.handleNewQues(e)}>
                                Submit
                            </button>
                        </Link>
                    </form>
                {this.state.submit && <Redirect to="/"/>}
                </div>
            </React.Fragment>
        )
    }

};

function mapStateToProps ({ users }) {
    return {
      users: Object.values(users)
            
    }
}


export default connect(mapStateToProps)(NewQuestion)