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
    console.log("the file to be uploadesd is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    try {
      const res = await service.handleFileUpload(uploadData);
      console.log("response is", res);
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
      console.log(res.data, "resp")
    } catch (error) {
      console.log(error);
    }
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { username, image, phone } = this.state
    console.log(username, "usern")
    const id = this.props.user._id
    this.editProfile(id, username, image, phone)

  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log(this.props, "props")
    console.log(this.state, "state")
    return (
      <div className="page profile">
        <div className="cover-edit" style={{ backgroundImage: `url(./../images/gradient.jpg)` }}>
          <button onClick={this.props.history.goBack}><img src="./../images/bacwk.png"></img></button>

        </div>
        <div className="profile-container-flex">
          <div className="profile-items">
            <div className="edit-div-edit">
              <h4>Edit your profile</h4>
              <form onSubmit={this.handleFormSubmit}>
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
                  <input type="submit" value="SAVE PROFILE"className="input-button" onClick={this.props.history.goBack} />
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
