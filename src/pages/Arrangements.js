import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";	
import { Link } from "react-router-dom";
import axios from 'axios';
import auth from "../lib/auth-service";
import GroupDetails from "./GroupDetails";
import Navbar from "../components/Navbar"


class Arrangements extends Component {

 state = {
    listOfArrangements: [],
  }

  getArrangements = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URL +'/arrangements', 
            withCredentials: true
        })

         this.setState({
          listOfArrangements: res.data
        });
      } catch (error) {
      console.log(error, 'GET expenses error')
    }
  }

  componentDidMount() {
        this.getArrangements();
    }
    render() {
        //console.log(this.props.user._id, "dsf")
        
        
        return (
            <div>
            <h1>Your debts and incomes</h1>

                 <div>
                 <h3>Your debts</h3>
                    {this.state.listOfArrangements.map(eachExpense => {
                    if(eachExpense.payer._id.toString() == this.props.user._id.toString()){
                        console.log("cfsfvvv")
                        return (
                            <div>
                            {eachExpense.payer.usermame}
                            <p>Hola</p>
                            </div>
                        )
                    }

                  
            
                    
                    })}
                </div> 
            
                <div>
                 <h3>Your incomes</h3>
                    {this.state.listOfArrangements.map(eachExpense => {
                        console.log(eachExpense.beneficiary._id.usermame)
                    if(eachExpense.beneficiary._id.toString() == this.props.user._id.toString()){
                        return (
                            <div>
                            
                            {eachExpense.payer.username}<p>owes</p>
                            {eachExpense.beneficiary.username}<p></p>
                            {eachExpense.expenseImport}<p>euros</p>
                            {/* <Link to = {{pathname:`/groups/${eachExpense.group._id}`, state: {groupsList: eachExpense.group, costs: eachExpense.group.costs}}} > {eachExpense.group.name} </Link> */}
                            <br></br>
                            
                            </div>
                        )
                    }

                  
            
                    
                    })}
                </div> 
                <Navbar/> 
            </div>
        )
    }
}

export default withAuth(Arrangements);
