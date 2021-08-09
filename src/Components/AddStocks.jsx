import React, { Component, useEffect, useState } from 'react';
import { useFormik } from 'formik'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../Stylesheets/Signup.css'
import AuthenticationService from './AuthenticationService.js';
import axios from 'axios'
import {useHistory,Redirect} from 'react-router-dom';


function AddStocks(props) {

    const [companies, setCompanies] = useState([]);
    const history=useHistory();
    const formik = useFormik({
        initialValues: {
            price: null,
            companyId: null
        },
        onSubmit: values => {
            console.log('Form data', values)
        },
        validate: values => {
            let errors = {}
    
            if (!values.price) {
                errors.price = "Enter price"
            }
            if (!values.companyId) {
                errors.companyId = "Select Some companyId"
            }
            return errors
        }
    })


    //fetching all companies
    useEffect(() => {
        axios.get('http://localhost:8081/companies')
            .then(response => {
                console.log(response)
                setCompanies(response.data)
            })
            .catch(error => {
                console.log(error)
            })

        // axios.get('http://localhost:8080/usersbyrole/vendor')
        //     .then(response => {
        //         console.log(response)
        //         setVendors(response.data)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })


    }, [])

    function addStocks() {
        var token=AuthenticationService.getUserTokenLoggedin()
        const data = {
            //vendorId: parseInt(formik.values.vendorId, 10),
            stockPrice: formik.values.price,
            companyid: parseInt(formik.values.companyId)

        }
        console.log("Hi activation test", data)
        if (Object.values(formik.errors).length === 0) {   
            axios.post('http://localhost:8081/stocks/addstocks', data, {
                headers: {
                  Authorization: token
                }
              })
            .then(response => {
                console.log(response)
                alert("Stocks Successfully added");
                history.push({pathname:'/companystocksByDate'})
            })
            .catch(error => {
                console.log(error)
                alert("Error Adding stocks");
            });
        }
        else {
            alert('Fill all entries')
        }
    }

    return (
        <div className="container pb-3 border-0 shadow" style={{textAlign:"left", marginLeft:"250px", marginTop:"50px"}}>

            <form className="ml-5 mr-5 pt-3" onSubmit={formik.handleSubmit}>

                <h2>Add Stocks</h2>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Select Company</label><br />
                        <select className="perftext" name="companyId" value={formik.values.companyId} onChange={formik.handleChange}>
                            <option hidden selected>Choose ...</option>
                            {companies.map(Company => {
                                return (
                                    <option value={Company.companyId}> {Company.companyName} </option>
                                )
                            })}

                        </select>
                        {formik.errors.companyId ? <div style={{ color: 'red' }}>{formik.errors.companyId}</div> : null}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group  col-md-4">
                        <label htmlFor='price'>Price:</label><br />
                        <input className="perftext" type='number' id='price' name='price' value={formik.values.price} onChange={formik.handleChange} />
                        {formik.errors.price ? <div style={{ color: 'red' }}>{formik.errors.price}</div> : null}
                    </div>
                </div>
                {/* Write edit course accordingly in place of add course */}
                <button type='submit' onClick={addStocks} className="btn btn-lg addcoursebut" >Add Stocks</button>
            </form>
        </div >
    )
}

export default AddStocks