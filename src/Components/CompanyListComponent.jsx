import React,{Component} from 'react'
import AuthenticationService from './AuthenticationService.js';
import '../Stylesheets/Mystyle.css'
import CompanyDetailsComponent from './CompanyDetailsComponent';
import CompanyListService from '../api/CompanyListService.js';
class CompanyListComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            companyList:[],
            companies:[
                   {
                        name : "A",
                        details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
                        price : 100
                   },
                   {
                        name : "B",
                        details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
                        price : 100
                    },
                    {
                        name : "C",
                        details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
                        price : 100
                   },
                   {
                        name : "D",
                        details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
                        price : 100
                    },
                    {
                        name : "E",
                        details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
                        price : 100
                    },
                    {
                        name : "M",
                        details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
                        price : 100
                   },
                   {
                    name : "S",
                    details : "A cartoon is a type of illustration, sometimes animated, typically in a non-realistic or semi-realistic style. The specific meaning has evolved over time, but the modern usage usually refers to either: an image or series of images intended for satire, caricature, or humor; or a motion picture that relies on a sequence of illustrations for its animation. Someone who creates cartoons in the first sense is called a cartoonist,[1] and in the second sense they are usually called an animator.",
                    price : 100
               }

                ]
            
        }
    }
    handleClick = (companyid) => {
        var userid=AuthenticationService.getUserIdLoggedin()
        console.log(userid + " "+companyid)
        CompanyListService.addWatchList({userId:userid,companyId:companyid})
        .then(response=>
            console.log(response),
            alert("successfully added to the watchlist.")
            )
        .catch(error=>console.log(error))
        
    }
    // handleClick = () => {
    //     alert("successfully added to the watchlist.")
    // }

    componentDidMount() {
        CompanyListService.getCompanyList()
        .then(response=>{console.log(response)
            this.setState({companyList:response.data})
        })
        .catch()
    }

    render() {
        let flag=AuthenticationService.isUserLoggedin()
        return(
            <div className="container" style={{marginLeft:"250px"}}>
                 <h1 style={{marginTop:"30px"}}>Companies List</h1>
                <div class="row justify-content" style={{marginTop:"30px"}}>
                    {
                        this.state.companyList.map(
                            (company) => {
                                return(
                                    <CompanyDetailsComponent style={{borderRadius:"25px"}} name={company.companyName} btn={"companyDetailsComponent"} details={company.description} company={company} price={company.currentStockPrice} className={"btn"} onClick={()=>this.handleClick(company.companyId)}>
                                        {/* {flag && <button className={"btn btn-primary"} onClick={this.handleClick}>
                                                Watch
                                            </button>} */}Add to WatchList
                                    </CompanyDetailsComponent>
                                )
                            }
                        )
                    }
                </div>               
            </div>
        )
    }
}
export default CompanyListComponent