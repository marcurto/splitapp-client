import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";	
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import auth from "../lib/auth-service";
import EachGroup from "../components/EachGroup";
import Navbar from "../components/Navbar"
import "./Groups.css";



class Groups extends Component {

 state = {
    listOfGroups: [],
  }

  getAllGroups = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URL + '/groups', 
            withCredentials: true
        })

         this.setState({
            listOfGroups: res.data
        });
      } catch (error) {
      console.log(error, 'GET expenses error')
    }
  }

  createEmptyGroup = async(e) => {
    e.preventDefault();
    console.log('hola')
    try{
        const res = await axios({
            method: 'POST',
            url: process.env.REACT_APP_API_URL + `/groups/add`, 
            withCredentials: true,
           
        })
        window.location = `/groups/edit/${res.data._id}`

    } catch (error) {
        console.log(error, 'POST expenses error')
    }
  }

  componentDidMount() {
        this.getAllGroups();
    }

    render() {
        return (
            <div className="groups-page">
              <div className="groups-header">
                <img src="./../images/group-big.png"></img>
                <h3>What are you <br></br>sharing today?</h3>
                <button onClick={this.createEmptyGroup}>Create Group</button>
              </div>
              <div className="group-list-button">
                      <div>
                      {this.state.listOfGroups.map(eachGroup => {
                          console.log(eachGroup, "cada grup")
                          return (
                            <EachGroup key={eachGroup._id} groups={eachGroup}/>
                          )
                        })}
                      </div>
              </div>
              <Navbar/> 
            </div>
        )
    }
}

export default withAuth(Groups);
