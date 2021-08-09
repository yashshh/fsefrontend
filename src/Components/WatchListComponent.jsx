import React,{Component} from 'react'
import AuthenticationService from './AuthenticationService.js';
import CompanyDetailsComponent from './CompanyDetailsComponent';
import '../Stylesheets/Mystyle.css'
import CompanyListService from '../api/CompanyListService.js';

class WatchListComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            companies:[]
            // companies:[
            //        {
            //             name : "A",
            //             details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
            //             price : 100
            //        },
            //        {
            //             name : "B",
            //             details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
            //             price : 100
            //         },
            //         {
            //             name : "C",
            //             details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
            //             price : 100
            //        },
            //         {
            //             name : "E",
            //             details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
            //             price : 100
            //         },
            //        {
            //         name : "S",
            //         details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
            //         price : 100
            //    }

            //     ]
            
        }
        this.findWatchList=this.findWatchList.bind(this)
    }

    componentDidMount() {
        this.findWatchList()
    }

    findWatchList() {
        var listcompany=[]
        var userid=AuthenticationService.getUserIdLoggedin()
        CompanyListService.getwatchList(userid)
        .then(response=>{console.log(response.data)
                response.data.map(
                    (data)=>{
                        listcompany.push(data.company)
                    }
                )
                this.setState({companies:listcompany})
                console.log("setstate")
                console.log(this.state.companies)
                
                
        })
        .catch()
    }

    handleClick = (companyid) => {
        var userid=AuthenticationService.getUserIdLoggedin()
        CompanyListService.deleteWatchList(companyid,userid)
        .then(response=>{
            console.log(response)
            alert("Removed successfully from the watchlist.")
            this.findWatchList()
        })
        .catch(error=>console.log(error))
        
    }
    render() {
        
        let flag=AuthenticationService.isUserLoggedin()
        let count = this.state.companies.length

        return(
            <div className="container" style={{marginLeft:"250px"}}>
                 <h1 style={{marginTop:"30px"}}>My Companies List</h1>
                {count>0?
                    <div class="row justify-content" style={{marginTop:"30px"}}>
                        {
                            this.state.companies.map(
                                (company) => {
                                    return(
                                        <CompanyDetailsComponent style={{borderRadius:"25px"}} name={company.companyName} details={company.description} price={company.currentStockPrice} className={"btn btn-danger"} onClick={()=>this.handleClick(company.companyId)}>
                                            {/* {flag && <button className={"btn btn-danger"} onClick={this.handleClick}>
                                                    Remove
                                                </button>} */}Remove
                                        </CompanyDetailsComponent>
                                    )
                                }
                            )
                        }
                </div>
                :<div><h1>No companies stock price added to watchList</h1></div> 
                }               
            </div>
        )
    }
}
export default WatchListComponent