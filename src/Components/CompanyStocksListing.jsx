import React, { Component } from "react";
import "../Stylesheets/Mystyle.css";
import { useHistory } from "react-router-dom";
import CompanyListService from '../api/CompanyListService.js';
import Button from 'react-bootstrap/Button';

var minList = 0;
var maxList = 0;
var avg=0;
var List=[]
class CompanyStocksListing extends Component {
  constructor(props) {
    super(props);
    this.state={
        company:"",
        companiesId:[],
        click:false,
        date1:null,
        date2:null,
        performancestocks:[],
        show:false,
        // performance:[
        //     {date:"01/02/2020",company:"A",price:"100"},
        //     {date:"01/02/2020",company:"B",price:"100"},
        //     {date:"03/02/2020",company:"A",price:"100"},
        //     {date:"03/02/2020",company:"B",price:"100"},
        //     {date:"05/02/2020",company:"A",price:"100"},
        //     {date:"05/02/2020",company:"B",price:"100"}
        // ]
        performance:[]
    }
}

componentDidMount() {
    var companiesIdList=[]
    CompanyListService.getCompanyList()
    .then(response=>{console.log(response)
        response.data.map(
            (company)=>{
                companiesIdList.push(company)
            }
        )
        this.setState({companiesId:companiesIdList})
    })
    .catch()
}

handleChange=(event)=>{
    this.setState({
        [event.target.name]:event.target.value
    })
}

handleClick=()=>{
    console.log("helloworld")
    console.log(this.state)
    //CompanyListService.getPerformanceList(this.state.company1,this.state.company2,this.state.date1,this.state.date2)
    CompanyListService.getSingleCompanyPerformanceList(this.state.company,this.state.date1,this.state.date2)
    .then(response=>{
        console.log(response.data)
        response.data.map(stock=>{
            console.log("aaaaa"+stock.stockPrice)
            List.push(stock.stockPrice)
            console.log(List[0])
        })
    console.log("helloworld"+List[0] + " "+List[1])
    if(List.length>0) {
    this.setState({show:true})
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
        this.setState({performance:response.data}) 
        console.log("performance")
        console.log(this.state.performance) 
    })
    .catch()

    this.setState(
        {
            click:true
        }

    )
    // var List = this.state.performance.stockPrice;
    // List.sort(function(a, b){return a - b});
        

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
    //unique dates storing
    //const dates = [...new Set(this.state.performance.map(item => item.date))];
    //var count=1;
    //var i=0;
    return(
        <div className="container pb-30 mt-5 border-0 shadow" style={{marginLeft:"250px"}}>
            <h2 style={{marginTop:"30px"}}>Company Stocks Listing By Date</h2>
            <h5 style={{color:"#ff253a"}}><i>@Make smart investment decision</i></h5>
            <br/>
            <div className="row g-1" style={{marginRight:"50px"}}>
                <div className="col">
                    <div className="form-outline">
                        <label for="sel1"><i>Select Company *:</i></label>
                        <select className="form-control" name="company" id="sel1" onChange={this.handleChange}>
                        <option disabled selected value=""> choose...</option>
                        {
                            this.state.companiesId.map(
                                (cid,index) => {
                                    return(
                                        <option key={index} value={cid.companyId}>{cid.companyName}</option>
                                    )
                                }
                            )
                        }
                    </select>
                    </div>
                </div>
            </div>
            <div className="row g-1" style={{marginTop:"20px"}}>
                <div className="col" style={{marginRight:"50px"}}>
                    <div className="form-outline">
                        <i>From Date*</i> <input type="date" onChange={this.handleChange} className="form-control"  id="fromdate" name="date1"/>
                    </div>
                </div>
                <div className="col" style={{marginRight:"50px"}}>
                    <div className="form-outline">
                        <i>To Date*</i> <input type="date" onChange={this.handleChange} className="form-control"  id="todate" name="date2"/>
                    </div>
               </div>
            </div>
            <br/>
            <button className="btn btn-lg" style={{backgroundColor:"#ff253a"}} onClick={this.handleClick}>Fetch Details</button>

            {this.state.click && <div className="container">
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
                    {this.state.performance.map((performance,index)=>{
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
            </div>
            </div>}
            {(this.state.click ) ?
            <div style={{marginLeft:"392px"}}>
            <Button
              className="btn btn-outline-primary mr-1"
              style={{ marginBottom:"10px" }}
              onClick={this.onClick1}
            >Min</Button>
            <Button
              className="btn btn-outline-primary mr-1"
              style={{ marginBottom:"10px" }}
              onClick={this.onClick2}
            >Max</Button>
            <Button
              className="btn btn-outline-primary mr-1"
              style={{ marginBottom:"10px" }}
              onClick={this.onClick3}
            >Avg</Button>
            </div>:<div></div>}
        </div>
        
    )
}
}

export default CompanyStocksListing;
