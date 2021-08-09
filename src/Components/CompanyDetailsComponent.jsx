import AuthenticationService from "./AuthenticationService"
import CustomButton from './CustomButton'
import {useHistory,Redirect} from 'react-router-dom';
import axios from 'axios'
import Button from 'react-bootstrap/Button';

var description="";
function CompanyDetailsComponent(props) {
    
    const history=useHistory();
    const handleClick=()=>{
        history.push({
            pathname:  "/singleCompanyDetails",
            state: {
              company: props.company  
            } 
         })
    }

    const handleClick1=(companyid)=>{
        var token=AuthenticationService.getUserTokenLoggedin()
        axios.delete(`http://localhost:8081/deletecompany/${companyid}`,{
            headers: {
              Authorization: token
            }
          })
        .then(response=>{
            console.log(response)
            alert("Removed successfully from the company list.")
            // history.push({pathname: "/companies"})
            window.location.reload();
        })
        .catch(error=>console.log(error))
    }

    let flag=AuthenticationService.isUserLoggedin()
    var desc = props.details;
    var btn = props.btn;
    var btnflag=false;
    console.log("btn"+btn)
    if(btn=="companyDetailsComponent") {
        btnflag=true;
    }
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log(props.details)
    if(desc.length>50) {
    description=desc.substring(0,100);
    }
    return(
        <div className="col col-lg-12 m-3 border-0 shadow">
            <ul className="list-group" style={{marginRight:"100px"}}>
                <li className="list-group-item py-3 list-group-item-secondary" style={{backgroundColor: "white"}}><b>{props.name}</b></li>
                <li className="list-group-item py-5 list-group-item " style={{backgroundColor: "#ffcc99", fontWeight:"bold"}}><i>{props.details}</i></li>
                <li className="list-group-item py-2 list-group-item-secondary" style={{backgroundColor: "#ccccff"}}>Today's Price : <b>${props.price} </b>
                {/* {flag && <button className={props.className} onClick={props.handleClick}>{props.children}</button>} */}
    {flag && <CustomButton className={props.className} onClick={props.onClick}> {props.children}</CustomButton>}
    {(flag && btnflag) && <span style={{float:"right"}}><Button className={props.className} onClick={handleClick}> Show Details</Button>
    <Button className={props.className} style={{marginLeft:"10px"}} onClick={()=>handleClick1(props.company.companyId)}> Delete</Button></span>}
                </li>
            </ul>
        <br/>
        </div>
    )
}
export default CompanyDetailsComponent