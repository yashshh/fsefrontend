import "../Stylesheets/Sidenav.css";
import React, { Component } from "react";
// import Avatar from "@material-ui/core/Avatar";
import AuthenticationService from "./AuthenticationService";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Sidenav extends React.Component {
  
  handleClick=()=>{
    AuthenticationService.logout()
    this.props.history.push("/login")
    window.location.reload()
  }

  render() {
    let bool = AuthenticationService.isUserLoggedin();
    let name = AuthenticationService.getUserIdLoggedin();
    let names=[]
    let nameuser=""
    if(name!=null) {
    names=name.split('@');
    nameuser=names[0].toUpperCase()
    }
    return (
      <div className="sidenav bg-light" style={{ paddingLeft: "10px", backgroundImage:"https://media.istockphoto.com/photos/financial-and-technical-data-analysis-graph-showing-stock-market-picture-id943292690?k=6&m=943292690&s=612x612&w=0&h=AqwqtxoCVyAmgi1sYfGwsYKHpb_6pT19AVHmzmGg-a4="}}>
        <img
          alt="Remy Sharp"
          src="https://media.istockphoto.com/photos/financial-and-technical-data-analysis-graph-showing-stock-market-picture-id943292690?k=6&m=943292690&s=612x612&w=0&h=AqwqtxoCVyAmgi1sYfGwsYKHpb_6pT19AVHmzmGg-a4="
          style={{ height: "200px", width: "200px", borderRadius:"10px", marginBottom:"10px" }}
        />
        <h3 style={{color:"#ff253a"}}>{nameuser}</h3>
          <Link className="nav-link" to="/companies">
            Home
          </Link>
          <Link className="nav-link" to="/addcompany">
            Add Company
          </Link>
          <Link
            className="nav-link"
            to="/addstocks"
          >
            Add Stocks
          </Link>
          <Link
            className="nav-link"
            to="/companystocksByDate"
          >
            Company Stocks By Date
          </Link>
          <Link
            className="nav-link"
            to="/loginuser"
            onClick={this.handleClick}
          >
            Logout
          </Link>
      </div>
    );
  }
}
export default withRouter(Sidenav);
