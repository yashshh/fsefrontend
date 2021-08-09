import React, { Component } from "react";
import "../Stylesheets/Mystyle.css";
import { useHistory } from "react-router-dom";
import CompanyListService from '../api/CompanyListService.js';
import Button from 'react-bootstrap/Button';

var minList = 0;
var maxList = 0;
var avg=0;
var List=[]
class CompanyStocks extends Component {
  constructor(props) {
    super(props);
    this.state={
        company:"",
        stocks:[],
        show:false
    }
}

componentDidMount() {
    var companyid = this.props.location.state.companyid
    console.log("comppppppppppppanyid "+companyid )
    CompanyListService.getCompanyStocksDetails(companyid)
    .then(response=>{console.log(response)       
        this.setState({stocks:response.data})
        if(this.state.stocks.length>0) {
          this.setState({show:true})
        }
        // var List=[]
        // console.log(response.data[0].stockPrice)
        // response.data.map(stock=>{
        //     console.log("hiiiiii")
        //     List.push(stock.stockPrice)
        // })
        // console.log("helloworld"+List.length)
        // if(List.length>0) {
        // console.log("helloworld"+List.length)
        // this.List.sort(function(a, b){return a - b});
        // }
    })
    .catch()
}
componentDidUpdate() {
    console.log(this.state.stocks)
    var i=0
    this.state.stocks.map(stock=>{
        console.log("aaaaa"+stock.stockPrice)
        List.push(stock.stockPrice)
    })
    
    console.log("helloworld"+List[0] + " "+List[1])
    if(List.length>0) {
    console.log("helloworld"+List.length)
    List.sort(function(a, b){return a - b});
    minList = List[0];
    maxList = List[List.length-1];
    avg=0;
    var i=0;
    for(i=0;i<List.length;i++) {
        avg+=List[i]/List.length;
        }
    }
}

onClick1=()=>{
  window.alert(`min value is +${minList}`);
}
onClick2=()=>{
  window.alert(`max value is +${maxList}`);
}
onClick3=()=>{
  window.alert(`avg value is +${avg}`);
}

render() {
    console.log(this.state.stocks)
    //unique dates storing
    //const dates = [...new Set(this.state.performance.map(item => item.date))];
    //var count=1;
    //var i=0;
    return(
        <div className="container pb-3 border-0 shadow" style={{marginLeft:"250px"}}>
            <h1 style={{marginTop:"30px"}}>Company Stocks Listing By Date</h1>
            <h5 style={{color: "#ff253a"}}><i>@Make smart investment decision</i></h5>
            <br/>
            
            <div className="container">
            <br/>
            <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        {/* <th>Id</th> */}
                        <th>Date</th>
                        <th>Company</th>
                        <th>Stock Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.stocks.map((performance,index)=>{
                        {
                            
                      return  (
                            <tr key={index}>
                                 <td>{performance.date}</td>
                                <td>{performance.company.companyName}</td>
                                <td>${performance.stockPrice}</td>
                            </tr>
                            
                        )

                    }
                    })
                    }       
                </tbody>
            </table>
            <Button
              className="btn btn-outline-primary mr-1"
              style={{ backgroundColor: "#ff253a", color: "white" }}
              onClick={this.handleClick=()=>{this.props.history.push("/addstocks")}}
            >Add Stocks</Button>
            </div>
            </div>
            {(this.state.show) ?
            <div style={{marginLeft:"392px"}}>
            <Button
              className="btn btn-outline-primary mr-1"
              style={{marginBottom:"10px"}}
              onClick={this.onClick1}
            >Min</Button>
            <Button
              className="btn btn-outline-primary mr-1"
              style={{marginBottom:"10px" }}
              onClick={this.onClick2}
            >Max</Button>
            <Button
              className="btn btn-outline-primary mr-1"
              style={{marginBottom:"10px"}}
              onClick={this.onClick3}
            >Avg</Button>
            </div>
            :<div></div>}
        </div>
        
    )
}
}

export default CompanyStocks;
