import React, { useState, useEffect} from "react";
import "../Stylesheets/SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from 'axios'
import CustomButton from './CustomButton'
import {useHistory,Redirect} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js'


function SearchBar() {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8081/companies')
        .then(response => {
            console.log(response)
            setData(response.data)
        })
        .catch(error => {
            console.log(error)
        })
        
}, [])

const history=useHistory();

  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.companyName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Search Company here"
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <li className="dataItem" onClick={handleClick=>{AuthenticationService.setComponentFlag(false);history.push({
                pathname:  "/singleCompanyDetails",
                state: {
                  company: value  
                } 
             })}}>
                <p>{value.companyName} </p>
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar