import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import service from "../api/service";
import "./Profile.css";


class Profile extends Component {
  state = {
    username: "",
    image: "",
    phone: "",
  };


  handleFileUpload = async (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    try {
      const res = await service.handleFileUpload(uploadData);
      this.setState({ image: res.secure_url });
    } catch (error) {
      console.log("Error while uploading the file: ", error);
    }
  };


  editProfile = async (id, username, image, phone) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: process.env.REACT_APP_API_URL + `/profile/edit/${id}`,
        withCredentials: true,
        data: { id, username, image, phone }
      })
    } catch (error) {
      console.log(error);
    }
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { username, image, phone } = this.state
    const id = this.props.user._id
    this.editProfile(id, username, image, phone)
    this.props.history.push('/profile')

  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="page profile">
        <div className="cover">
          {/* <button onClick={this.props.history.goBack}><img src="./../images/bacwk.png"></img></button> */}
          
        </div>
        <div className="profile-container-flex">
          <div className="profile-items">
            <div className="edit-div edit-profile-form">
              <h4>Edit your profile</h4>
              <form onSubmit={this.handleFormSubmit} >
                <label htmlFor="username">Name:</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={this.username}
                  onChange={this.handleChange}
                />

                <label htmlFor="image"> Image: </label>
                <input
                  id="image"
                  type="file"
                  name="image"
                  onChange={this.handleFileUpload}
                />

                <label htmlFor="phone">Edit phone</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={this.phone}
                  onChange={this.handleChange}
                />
                <div>
                  <input type="submit" value="SAVE PROFILE"className="input-button edit-profile" onClick={this.props.history.goBack} />
                </div>
              </form>
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    );
  }
}
export default withAuth(Profile);
