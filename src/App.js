 import './App.css';
import Loginnew from './Components/Loginnew'
import ErrorPage from './Components/ErrorPage'
import CompanyListComponent from './Components/CompanyListComponent'
import LogoutComponent from './Components/LogoutComponent'
import PerformanceComponent from './Components/PerformanceComponent'
import WatchListComponent from './Components/WatchListComponent'
import MenuComponent from './Components/MenuComponent'
import FooterComponent from './Components/FooterComponent'
import Signup from './Components/Signup'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import AuthenticatedRoute from './Components/AuthenticatedRoute'
import CompanyStocks from './Components/CompanyStocks'
import CompanyStocksListing from './Components/CompanyStocksListing'
import SingleCompanyDetails from './Components/SingleCompanyDetails'
import AddCompany from './Components/AddCompany'
import AddStocks from './Components/AddStocks'
import AuthenticationService from '../src/Components/AuthenticationService';
import Sidenav from './Components/Sidenav'
import PaginationCompany from '../src/Components/PaginationCompany'
import Pagination from './Components/Pagination';
import SearchBar from './Components/SearchBar'

function App() {
  let bool = AuthenticationService.isUserLoggedin();
  return (
      <div className="App">
        <Router>
          <div>
            <MenuComponent></MenuComponent>
            {/* <SearchBar></SearchBar> */}
            {bool && <Sidenav></Sidenav>}
            <Switch>
              <Route path = "/" exact component={Pagination}/>
              <Route path = "/signup" exact component={Signup}/>
              {/* <Route path = "/login" exact component={Login}/> */}
              <Route path = "/login" exact component={Loginnew}/>
              <Route path = "/pagination" exact component={Pagination}/>
              <AuthenticatedRoute path = "/addcompany" exact component={AddCompany}/>
              <Route path = "/companies" exact component={CompanyListComponent}/>
              <AuthenticatedRoute path = "/watchlist" exact component={WatchListComponent}/>
              <AuthenticatedRoute path = "/companystockslist" exact component={CompanyStocks}/>
              <AuthenticatedRoute path = "/addstocks" exact component={AddStocks}/>
              <AuthenticatedRoute path = "/companystocksByDate" exact component={CompanyStocksListing}/>
              <AuthenticatedRoute path = "/singleCompanyDetails" exact component={SingleCompanyDetails}/>
              <AuthenticatedRoute path = "/compareperformance" exact component={PerformanceComponent}/>
              <AuthenticatedRoute path = "/logout" exact component={LogoutComponent}/>
              <Route component={ErrorPage}/>
            </Switch>
            <FooterComponent></FooterComponent>
          </div>
        </Router>
      </div>
    );
}

export default App;
