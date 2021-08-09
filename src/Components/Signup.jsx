import React, { Component } from 'react';
import { useFormik } from 'formik'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../Stylesheets/Signup.css'
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
//import moment from 'moment'
import { useHistory } from 'react-router-dom';

function Signup() {
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            Name: "",
            //lastName: "",
            Age: "",
            //dob: new Date(),
            //gender: "",
            Role : "",
            gender: "",
            email: "",
            password: "",
            confpass: ""
        },
        onSubmit: values => {
            console.log('Form data', values)
        },
        validate: values => {
            let errors = {}
            if (values.Name.length > 50 || values.Name.length < 4) {
                errors.Name = "Name is Required between length 4-50"
            }
            // if (values.lastName.length > 50 || values.lastName.length < 4) {
            //     errors.lastName = "lastName is Required between length 4-50"
            // }
            // if (!/(7|8|9)\d{9}/.test(values.contact)) {
            if (values.Age<18) {
                errors.Age = "Age should be greater than 18"
            }
            // if (getAge(values.dob) < 18) {
            //     errors.dob = "Age should be greater than 18"
            // }
            if (!values.email) {
                errors.email = "Email is Required"
            } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email)) {
                errors.email = "Invalid Email format"
            }
            // if (!values.gender) {
            //     errors.gender = "Select Gender"
            // }
            if (!values.Role) {
                errors.Role = "Select role"
            }
            if (!values.gender) {
                errors.gender = "Select gender"
            }
            if (values.password.length < 6 || !/^(?=.*[!@#$%^&*])/.test(values.password)) {
                errors.password = "Create Password(Minimum 6 char and one special character)"
            }
            if (values.confpass.length < 6 || !/^(?=.*[!@#$%^&*])/.test(values.confpass)) {
                errors.confpass = "Confirm Password"
            }
            return errors
        }
    })

    // function getAge(DOB) {
    //     var today = new Date();
    //     var birthDate = new Date(DOB);
    //     var age = today.getFullYear() - birthDate.getFullYear();
    //     var m = today.getMonth() - birthDate.getMonth();
    //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //         age--;
    //     }
    //     return age;
    // }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }

    function RegisterUserDetail() {
        const data = {
            age: formik.values.Age,
            uname: formik.values.Name,
            //lastName : formik.values.lastName,
            //dateOfBirth: formatDate(formik.values.dob),
            urole: formik.values.Role,
            gender: formik.values.gender,
            email: formik.values.email,
            upassword: formik.values.password
        }
        if (formik.values.password === formik.values.confpass && Object.values(formik.errors).length === 0) {
            axios.post('http://localhost:8083/authapp/signup', data)
                .then(response => {
                    console.log(response)
                    alert("Successfully Registered");
                    history.push('/login')
                })
                .catch(error => {
                    console.log(error)
                    alert("Error Registering");
                    console.log(data);
                });
        }
        else {
            if (!(Object.values(formik.errors).length === 0)) {
                console.log("formik error empty or not", Object.values(formik.errors).length === 0)
                console.log(formik.errors)
                alert('Fill all form data')
            }
            else {
                console.log("formik error empty or not", Object.values(formik.errors).length === 0)
                console.log(formik.errors)
                alert('Password and Confirm password do not match')
            }
        }
    }

    return (
        <div style={{marginTop:"80px"}}>
        <div className="container mb-3 pb-3 mt-5 border" style={{textAlign:"left"}}>

            <form className="ml-5 mr-5 pt-3" onSubmit={formik.handleSubmit}>
                <h2>Basic Details</h2>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor='Name'>Name:</label><br />
                        <input className="perftext" type='text' id='Name' name='Name' value={formik.values.Name} onChange={formik.handleChange} />
                        {formik.errors.Name ? <div style={{ color: 'red' }}>{formik.errors.Name}</div> : null}
                    </div>
                    <div className="form-row">
                    <div className="form-group  col-md-4">
                        <label htmlFor='Role'>Role:</label><br />
                        <select className="perftext" id="Role" name="Role" value={formik.values.Role} onChange={formik.handleChange}>
                            <option hidden selected>choose...</option>
                            <option value="User">User</option>
                            <option value="Vendor">Vendor</option>
                        </select>
                        {formik.errors.Role ? <div style={{ color: 'red' }}>{formik.errors.Role}</div> : null}
                    </div>
                </div>
                    <div className="form-group  col-md-4">
                        <label htmlFor='Age'>Age:</label><br />
                        <input className="perftext" type='text' id='Age' name='Age' value={formik.values.Age} onChange={formik.handleChange} />
                        {formik.errors.Age ? <div style={{ color: 'red' }}>{formik.errors.Age}</div> : null}
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group  col-md-4">
                        <label htmlFor='gender'>Gender:</label><br />
                        <select className="perftext" id="gender" name="gender" value={formik.values.gender} onChange={formik.handleChange}>
                            <option hidden selected>choose...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {formik.errors.gender ? <div style={{ color: 'red' }}>{formik.errors.gender}</div> : null}
                    </div>
                </div>
                <h2 className='pt-5'>Registration Details</h2>
                <div className="form-row">
                    <div className="form-group  col-md-4">
                        <label htmlFor='email'>Email Id:</label><br />
                        <input className="perftext" type='text' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} />
                        {formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group  col-md-4">
                        <label htmlFor='password'>Password:</label><br />
                        <input className="perftext" type='password' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
                        {formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
                    </div>
                    <div className="form-group  col-md-4">
                        <label htmlFor='confpass'>Confirm Password:</label><br />
                        <input className="perftext" type='password' id='confpass' name='confpass' value={formik.values.confpass} onChange={formik.handleChange} />
                        {formik.errors.confpass ? <div style={{ color: 'red' }}>{formik.errors.confpass}</div> : null}
                    </div>
                </div>
                <button type='submit' onClick={RegisterUserDetail} className="btn signupbut" >Register</button>
            </form>
        </div >
        </div>
    )
}

export default Signup