import React,{Component} from 'react'
import AuthenticationService from './AuthenticationService.js';
import CompanyListService from '../api/CompanyListService.js'
import '../Stylesheets/Mystyle.css'


class PerformanceComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            company1:"",
            company2:"",
            companiesId:[],
            click:false,
            date1:null,
            date2:null,
            performancestocks:[],
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
                    companiesIdList.push(company.companyId)
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
        CompanyListService.getPerformanceList(this.state.company1,this.state.company2,this.state.date1,this.state.date2)
        .then(response=>{
            console.log(response.data)
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
    }

    render() {
        //unique dates storing
        const dates = [...new Set(this.state.performance.map(item => item.date))];
        var count=1;
        var i=0;
        return(
            <div className="container pb-3 border-0 shadow" style={{marginLeft:"250px", marginTop:"50px"}}>
                <h2 style={{marginTop:"30px"}}>Compare Potential Companies</h2>
                <h5 style={{color:"#ff253a"}}><i>@Make smart investment decision</i></h5>
                <br/>
                <div className="row g-1" style={{marginRight:"50px"}}>
                    <div className="col">
                        <div className="form-outline">
                            <label for="sel1"><i>Select Company 1*:</i></label>
                            <select className="form-control" name="company1" id="sel1" onChange={this.handleChange}>
                            <option disabled selected value=""> choose...</option>
                            {
                                this.state.companiesId.map(
                                    (cid,index) => {
                                        return(
                                            <option key={index} value={cid}>{cid}</option>
                                        )
                                    }
                                )
                            }
                        </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label for="sel2"><i>Select Company 2*:</i></label>
                            <select className="form-control" name="company2" id="sel2" onChange={this.handleChange}>
                                <option disabled selected value>choose...</option>
                                {
                                this.state.companiesId.map(
                                    (cid,index) => {
                                        return(
                                            <option key={index} value={cid}>{cid}</option>
                                        )
                                    }
                                )
                            }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row g-1" style={{marginTop:"20px", marginRight:"50px"}}>
                    <div className="col">
                        <div className="form-outline">
                            <i>From Date*</i> <input type="date" onChange={this.handleChange} className="form-control"  id="fromdate" name="date1"/>
                        </div>
                    </div>
                    <div className="col">
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
                            {for(i;i<dates.length;) {
                                var j=dates[i];
                                if(count==1) {
                                    var x=0;
                                }
                                else{
                                    x=1;
                                }
                                count++;
                                if(count==3) {
                                    i=i+1;
                                    count=1;
                                }
                                
                          return  (
                                <tr key={index}>
                                    {/* <td>{todo.id}</td> */}
                                    {x==0?<td><b>{j}</b></td>:<td></td>}
                                    <td>{performance.company.companyName}</td>
                                    <td>${performance.stockPrice}</td>
                                </tr>
                                
                            )

                        }}
                        })
                        }       
                    </tbody>
                </table>
                </div>
                </div>}
            </div>
            
        )
    }
}
export default PerformanceComponent