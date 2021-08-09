import React,{Component} from 'react'
import AuthenticationService from './AuthenticationService.js';
import '../Stylesheets/Mystyle.css'
import '../Stylesheets/Pagination.css';
import CardDeck from 'react-bootstrap/CardDeck';
import CompanyDetailsComponent from './CompanyDetailsComponent';
import CompanyListService from '../api/CompanyListService.js';
class Pagination extends Component {

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

                ],
                currentPage:1,
                courseListPerPage:5
            
        }
    }
    handleClick = (companyid) => {
        var userid=AuthenticationService.getUserIdLoggedin()
        CompanyListService.addWatchList({userId:userid,companyId:companyid})
        .then(response=>
            console.log(response),
            alert("successfully added to the watchlist.")
            )
        
    }
    handleClick1=(event) =>{
        this.setState({currentPage:Number(event.target.id)})
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
        const indexOfLastCourseCard = this.state.currentPage * this.state.courseListPerPage;
        const indexOfFirstCourseCard = this.state.indexOfLastCourseCard - this.state.courseListPerPage;
        const currentcourseList = this.state.companyList.slice(indexOfFirstCourseCard, indexOfLastCourseCard);

        const renderCourseList = currentcourseList.map((company, index) => {
        return(
            <div className="container">
                 {/* <h1 style={{marginTop:"30px"}}>Companies List</h1> */}
                <div class="row justify-content" style={{marginTop:"30px"}}>
                <CompanyDetailsComponent name={company.companyName} details={company.description} price={company.currentStockPrice} className={"btn"} onClick={()=>this.handleClick(company.companyId)}>
                                        {/* {flag && <button className={"btn btn-primary"} onClick={this.handleClick}>
                                                Watch
                                            </button>} */}Watch
                                    </CompanyDetailsComponent>
                </div>               
            </div>
        )
    }
        )

        var pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.companyList.length / this.state.courseListPerPage); i++) {
        pageNumbers.push(i);
    }
    

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
                key={number}
                id={number}
                onClick={this.handleClick1}
            >
                {number}
            </li>
        );
    });

    return (


        <div>
            <div className=" m-3">
                <CardDeck style={{display: 'flex', flexDirection: 'row'}} classname="container-fluid mt-4">
                <h1 style={{marginTop:"30px",marginLeft:"100px"}}>Companies List</h1>
                    {renderCourseList}
                </CardDeck>
            </div>
            
            <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
           
        </div>
    )
    }
}




export default Pagination