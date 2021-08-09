import React, { Component, useEffect, useState } from 'react';
import { useFormik } from 'formik'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../Stylesheets/Signup.css'
import AuthenticationService from './AuthenticationService.js';
import axios from 'axios'
import {useHistory,Redirect} from 'react-router-dom';
//import moment from 'moment'

function AddCompany(props) {
    const history=useHistory();
    const [services, setServices] = useState([]);
    const formik = useFormik({
        initialValues: {
            //courseId: "",
            companyName: "",
            stockExchange: "",
            Description: "",
            //vendorId: null,
            //isActive: true,
            currentStockPrice: null,
            turnover:null,
            //duration: null,
            //dateOfLaunch: new Date(),
            website: "",
            //languages: "",
            companyCode: "",
            ceo: "",
            //courseDescription: "",
            //author: "",
            //serviceId: ""
        },
        onSubmit: values => {
            console.log('Form data', values)
        },
        validate: values => {
            let errors = {}
            if (!values.companyName) {
                errors.companyName = "Company Name is Required"
            }
            if (!values.stockExchange) {
                errors.stockExchange = "stockExchange Category  is Required"
            }
            if (!values.Description) {
                errors.Description = "Enter description about the company"
            }
            if (!values.currentStockPrice) {
                errors.currentStockPrice = "Enter currentStockPrice"
            }
            if (!values.turnover) {
                errors.turnover = "Enter turnover"
            }
            
            if (!values.website) {
                errors.website = "Enter website link"
            }
            
            if (!values.companyCode) {
                errors.companyCode = "Enter companyCode"
            }
            if (!values.ceo) {
                errors.ceo = "Enter ceo name"
            }
            return errors
        }
    })

    // function formatDate(date) {
    //     var d = new Date(date),
    //         month = '' + (d.getMonth() + 1),
    //         day = '' + d.getDate(),
    //         year = d.getFullYear();
    //     if (month.length < 2)
    //         month = '0' + month;
    //     if (day.length < 2)
    //         day = '0' + day;
    //     return [year, month, day].join('-');
    // }

    //fetching all services
    // useEffect(() => {

    //     axios.get('http://localhost:8080/services')
    //         .then(response => {
    //             console.log(response)
    //             setServices(response.data)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })

    // }, [])

    function AddCompanyDetail() {

        // var indexser = {}
        // for (var i = 0; i < services.length; i++) {
        //     if (services[i].serviceId === parseInt(formik.values.serviceId, 10)) {
        //         indexser = services[i]
        //         console.log("indexser", indexser)
        //         break;
        //     }

        // }

        var token=AuthenticationService.getUserTokenLoggedin()

        const data = {
            //no need to give courseId while adding course
            //courseId: formik.values.courseId,
            companyName: formik.values.companyName,
            stockExchange: formik.values.stockExchange,
            description: formik.values.Description,
            //vendorId: 7,
            currentStockPrice: formik.values.currentStockPrice,
            turnover: formik.values.turnover,
            //duration: formik.values.duration,
            // dateOfLaunch: formatDate(formik.values.dateOfLaunch),
            website: formik.values.website,
            // languages: formik.values.languages,
            companyCode: formik.values.companyCode,
            ceo: formik.values.ceo,
            //description: formik.values.courseDescription,
            //author: formik.values.author,
            //service: indexser

        }
        if (Object.values(formik.errors).length === 0) {
        axios.post('http://localhost:8081/addcompany', data, {
            headers: {
              Authorization: token
            }
          })
            .then(response => {
                console.log(response)
                alert("Company Successfully added");
                history.push({pathname:'/companies'})
            })
            .catch(error => {
                console.log(error)
                alert("Error Adding Company");
            });
        }
        else {
            alert('Fill all entries')
        }
    }

    return (
        <div className="container pb-30 mt-5 border-0 shadow" style={{textAlign:"left", marginLeft:"250px"}}>

            <form className="ml-3 mr-5 pt-3" onSubmit={formik.handleSubmit}>
                <h2>Add Company</h2>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor='companyName'>Company Name:</label><br />
                        <input className="perftext" type='text' id='companyName' name='companyName' value={formik.values.companyName} onChange={formik.handleChange} />
                        {formik.errors.companyName ? <div style={{ color: 'red' }}>{formik.errors.companyName}</div> : null}
                    </div>
                    <div className="form-group  col-md-4">
                        <label htmlFor='stockExchange'>stock Exchange</label><br />
                        {/* <input className="perftext" type='number' id='stockExchange' name='stockExchange' value={formik.values.stockExchange} onChange={formik.handleChange} /> */}
                        <select className="perftext" id="stockExchange" name="stockExchange" value={formik.values.stockExchange} onChange={formik.handleChange}>
                            <option hidden selected>choose...</option>
                            <option value="NSE">NSE</option>
                            <option value="BSE">BSE</option>
                        </select>
                        {formik.errors.stockExchange ? <div style={{ color: 'red' }}>{formik.errors.stockExchange}</div> : null}
                    </div>
                    <div className="form-group  col-md-4">
                        <label htmlFor='Description'>Description:</label><br />
                        <input className="perftext" type='text' id='Description' name='Description' value={formik.values.Description} onChange={formik.handleChange} />
                        {formik.errors.Description ? <div style={{ color: 'red' }}>{formik.errors.Description}</div> : null}
                    </div>

                </div>

                 <div className="form-row">

                    <div className="form-group  col-md-4">
                        <label htmlFor='currentStockPrice'>currentStockPrice:</label><br />
                        <input className="perftext" type='number' id='currentStockPrice' name='currentStockPrice' value={formik.values.currentStockPrice} onChange={formik.handleChange} />
                        {formik.errors.currentStockPrice ? <div style={{ color: 'red' }}>{formik.errors.currentStockPrice}</div> : null}
                    </div>
                    <div className="form-group  col-md-4">
                        <label htmlFor='turnover'>turnover:</label><br />
                        <input className="perftext" type='number' id='turnover' name='turnover' value={formik.values.turnover} onChange={formik.handleChange} />
                        {formik.errors.turnover ? <div style={{ color: 'red' }}>{formik.errors.turnover}</div> : null}
                    </div>
                </div>
                {/* <div className="form-row">
                    <div className="form-group col-md-4">
                        <br />
                        <label>
                            <input type="checkbox" style={{ zoom: 1.5 }}
                                name="isActive"
                                checked={formik.values.isActive}
                                value={formik.values.isActive}
                                onChange={formik.handleChange}
                            />
                            <span> Activate</span>
                        </label>
                    </div> */}
                
                <div className="form-row">
                    <div className="form-group  col-md-4">
                        <label htmlFor='website'>website</label><br />
                        <input className="perftext" type='text' id='website' name='website' value={formik.values.website} onChange={formik.handleChange} />
                        {formik.errors.website ? <div style={{ color: 'red' }}>{formik.errors.website}</div> : null}
                    </div>
                    <div className="form-group  col-md-4">
                        <label htmlFor='companyCode'>companyCode</label><br />
                        <input className="perftext" type='text' id='companyCode' name='companyCode' value={formik.values.companyCode} onChange={formik.handleChange} />
                        {formik.errors.companyCode ? <div style={{ color: 'red' }}>{formik.errors.companyCode}</div> : null}
                    </div>
                </div>
                <div className="form-row">

                    <div className="form-group  col-md-4">
                        <label htmlFor='ceo'>CEO</label><br />
                        <input className="perftext" type='text' id='ceo' name='ceo' value={formik.values.ceo} onChange={formik.handleChange} />
                        {formik.errors.ceo ? <div style={{ color: 'red' }}>{formik.errors.ceo}</div> : null}
                    </div>
                </div>
                {/* Write edit course accordingly in place of add course */}
                <button type='submit' onClick={AddCompanyDetail} className="btn btn-lg addcoursebut" style={{marginBottom:"10px"}}>Add Company</button>
            </form>
        </div >
    )
}

export default AddCompany