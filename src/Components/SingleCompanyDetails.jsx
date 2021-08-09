import Button from 'react-bootstrap/Button';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Row,Card,Col} from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup';
import {useHistory,Redirect} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';

export function SingleCompanyDetails(props){
    
    const history=useHistory();
    var userId= AuthenticationService.getUserIdLoggedin()
    console.log("props"+JSON.stringify(props));
    // const [redirect,setRedirect]=useState(null);
    // var hasPurchased=false;
    // var isComplete=false;
    //var userId=1;
    //const handleSubmit=(companyId) =>{
      
  
        // courseId=2;
        // if (redirect) {
        //   return <Redirect to={setRedirect} />
        // }
        // setisComplete(true);
        // axios.patch(`http://localhost:8080/orders/courseStatus/${courseId}/${userId}`, {}, { params: { isComplete: true } })
        //     .then(response => {
        //         console.log("response "+JSON.stringify(response))
        //         history.goBack()
        //         // setRedirect("/singlecoursedetails")
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         // alert("Error Updating service");
        //     });
        //}
    const styles = {
        card: {
          backgroundColor: '#ff9999',
          borderRadius: 55,
          padding: '3rem'
        },
        cardImage: {
          objectFit: 'cover',
          borderRadius: 55,
          height: '100%'
        }
      }

    
    const [companyDetail,setcompanyDetail]=useState({});
    //const [Order, setOrder] = useState({})
      //const [isComplete,setisComplete]=useState(false)
      //const [hasPurchased,sethasPurchased]=useState(false)
    //const companyId= props.location.state.cId;
    
  
    useEffect(()=>{
        // const fetchData = async () => {
        //     const data1 = await axios.get('http://localhost:8081/companies/'+companyId)
            //const data2 = await axios.get('http://localhost:8080/orders/iscomplete/'+courseId+'/'+userId)
            setcompanyDetail(props.location.state.company);
            console.log("data1 "+JSON.stringify(companyDetail));
            //console.log("data2 of order "+JSON.stringify(data2))
            //setOrder(data2.data);
            //console.log("order data "+JSON.stringify(Order))
            //console.log("ORDER>COMPLETE" +data2.data.complete)
            //setisComplete((data2.data.complete==false||data2.data.length<1)?false:true)
            //console.log("hiiiiii "+isComplete)
            //console.log("Order.complete ",data2.data.complete)
            //sethasPurchased((data2.data.length<1)?false:true)
          
            // Order.complete===false||Order.length===0||Order.length===null
        //};
        //fetchData();
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
    },[])

    
   
    
    
return(
    // console.log("order data inside return  "+JSON.stringify(Order))

   <div style={{backgroundColor: "#ffcccc",textAlign:"left", marginLeft:"250px"}}>
   <CardGroup >
        <Card key={companyDetail.companyId} className="text-left m-3 border-0 shadow" style={styles.card}>
          <Row>
            
            <Col lg={8}>
              <Card.Body>
              <Card.Title as="h1">{companyDetail.companyName}</Card.Title>
              <Card.Text>
              <div>
              <h2 >{companyDetail.description} </h2>
              <p style={{fontWeight:'bold'}}>Price : ${companyDetail.currentStockPrice} <span className="float-right"> website : {companyDetail.website} </span>
                </p>
                <p>
                <Button id={companyDetail.companyId}   style={{backgroundColor:"#ff253a",color:"white"}} type = "submit"  size="lg" onClick={()=>history.push({pathname:'/companystockslist',state:{companyid:companyDetail.companyId} })}>Stock Details
                </Button>  
                
                

                <span style={{fontWeight:'bold'}} className="float-right">CEO : {companyDetail.ceo} </span>
              </p>
              </div>
              </Card.Text>
              </Card.Body>
            </Col>
            <Col lg={4}>
              <Card.Img src={"https://media.istockphoto.com/photos/financial-and-technical-data-analysis-graph-showing-stock-market-picture-id943292690?k=6&m=943292690&s=612x612&w=0&h=AqwqtxoCVyAmgi1sYfGwsYKHpb_6pT19AVHmzmGg-a4="} style={styles.cardImage} alt="abc" />
            </Col>
          </Row>
        </Card>
      </CardGroup>
      <div className="container">
        <div className="border 1 m-2 p-2" style={{backgroundColor: "#ffcc99"}}>
            <h2> description </h2>
            <li> {companyDetail.description} </li>
        </div>
        <div className="border 1 m-2 p-2" style={{backgroundColor: "#ccccff"}}>
            <h2> Turnover </h2>
            <li> {companyDetail.turnover} </li>
        </div>
        <div className="border 1 m-2 p-2" style={{backgroundColor: "#ffcc99"}}>
            <h2> Stock Exchange </h2>
            <li> {companyDetail.stockExchange} </li> 
        </div>
        <div className="border 1 m-2 p-2" style={{backgroundColor: "#ccccff"}}>
            <h2> companyCode </h2>
            <li> {companyDetail.companyCode} </li> 
        </div>    

    
    </div>
    </div>
);

 
}
export default SingleCompanyDetails