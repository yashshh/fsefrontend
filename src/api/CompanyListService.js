import axios from 'axios'
import AuthenticationService from '../Components/AuthenticationService';

class CompanyListService{

    // {
    //     headers: {
    //       Authorization: 'Bearer ' + token //the token is a variable which holds the token
    //     }
    //    }
    getCompanyList() {
        return axios.get('http://localhost:8081/companies')
    }

    findUsers(user) {
        console.log(user)
        return axios.post('http://localhost:8083/authapp/login',user)
    }

    getwatchList(userid) {
        var token=AuthenticationService.getUserTokenLoggedin()
        return axios.get(`http://localhost:8081/watchList/${userid}`, {
            headers: {
              Authorization: token
            }
          })
    }

    addWatchList(watchList) {
        var token=AuthenticationService.getUserTokenLoggedin()
        return axios.post('http://localhost:8081/watchList',watchList, {
            headers: {
              Authorization: token
            }
          })
    }

    deleteWatchList(companyid,userid) {
        var token=AuthenticationService.getUserTokenLoggedin()
        console.log(companyid,userid)
        return axios.delete(`http://localhost:8081/watchList/${companyid}/${userid}`, {
            headers: {
              Authorization: token
            }
          })
    }

    getPerformanceList(companyCode1, companyCode2, from, to) {
        return axios.get(`http://localhost:8081/stocks/compare-performance/${companyCode1}/${companyCode2}/${from}/${to}`)
    }

    getSingleCompanyPerformanceList(companyCode, from, to) {
        return axios.get(`http://localhost:8081/stocks/stockprice/${companyCode}/${from}/${to}`)
    }
    
    getCompanyStocksDetails(companyid) {
        return axios.get(`http://localhost:8081/companies/stocks/${companyid}`)
    }

}
export default new CompanyListService()