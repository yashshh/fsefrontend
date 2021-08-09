import React, { Component } from "react";
import "../Stylesheets/Mystyle.css";
import "../Stylesheets/Login.css";
import AuthenticationService from './AuthenticationService.js'
import { BrowserRouter as Router, Link } from "react-router-dom";
import CompanyListService from '../api/CompanyListService.js';
import axios from "axios";

class Loginnew extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      upassword: "",
      hasloginfailed: false,
      showsuccess: false,
      emptyvalue1: false,
      emptyvalue2: false
    };
  }

  handleClick = () => {
    let user = {
      userid: this.state.username,
      upassword: this.state.upassword,
    };

    if (this.state.username === "") {
      this.setState({
        emptyvalue1: true,
      });
    }
    if ( this.state.upassword === "") {
      this.setState({
        emptyvalue2: true,
      });
    }

    CompanyListService.findUsers(user)
            .then(response=>this.login(response)
            ).catch(error=>{console.log(error)
                this.setState({hasloginfailed:true,showsuccess:false})})

    }

    login(response) {
        console.log(response)
        AuthenticationService.registerSuccessfulLogin(response.data.userid,response.data.authToken,response.data.urole)
        this.setState({hasloginfailed:false,showsuccess:true})
        this.props.history.push("/companies")
        window.location.reload()
}  

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="container mb-4 fixedMenuFix">
        <link
          href="https://fonts.googleapis.com/css?family=Indie+Flower|Overpass+Mono"
          rel="stylesheet"
        />
        <div style={{ marginLeft: "400px" }}>
          <h5 style={{ marginTop: "50px", color:"#f08b38"}}>Login to your My Stocks Account!</h5>
        </div>
        <div id="wrapper">
          <div class="main-content">
            <h3 style={{ color: "orange",marginLeft:"100px" }}>
              <b>Login</b>
            </h3>
            <div class="l-part">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                class="input-1"
              />
              <div class="overlap-text">
                <input
                  type="password"
                  name="upassword"
                  placeholder="Password"
                  value={this.state.upassword}
                  onChange={this.handleChange}
                  class="input-2"
                />
              </div>
              <input
                type="button"
                value="Log in"
                className="btn btn-block"
                style={{ backgroundColor: "#ff253a", color: "white" }}
                onClick={this.handleClick}
              />
            </div>
          </div>
          {this.state.emptyvalue1 && (
          <div style={{ color: "red", marginLeft:"120px" }}>
            <ul>
              <li>Email is required</li>
            </ul>
          </div>
        )}
        {this.state.emptyvalue2 && (
          <div style={{ color: "red", marginLeft:"120px" }}>
            <ul>
              <li>Password is required</li>
            </ul>
          </div>
        )}
        {this.state.hasloginfailed && (
          <div>
            <h3 style={{ color: "red", marginLeft:"120px" }}>Invalid credentials</h3>
          </div>
        )}
          <div class="sub-content">
            <div class="s-part">
              Don't have an account?
              <Link className="nav-link" to="/signup">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loginnew;
