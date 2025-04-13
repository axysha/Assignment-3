/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Lifecycle method componentDidMount
  componentDidMount(){
    //API call to fetch credits data
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then(response => response.json())
      .then(data => {
        const credits = data.credits || [];
        this.setState(prevState => ({
          creditList:credits,
          accountBalance: this.calculateBalance(credits,prevState.debitList || []),
        }));
      })
      .catch(error => console.error("Error fetching credits: ",error));
    
    //API call to fetch debits data
    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then(response => response.json())
      .then(data => {
        const debits = data.debits || [];
        this.setState(prevState => ({
          debitList:debits,
          accountBalance: this.calculateBalance(prevState.creditList || [],debits),
        }));
      })
    .catch(error => console.error("Error fetching debits: ",error));
  }

  //add debit and credit functions here 
  //helper to calculate account balance
  calculateBalance = (credits = [],debits = []) => {
    const totalCredits = credits.reduce((sum,c) => sum + Number(c.amount),0);
    const totalDebits = debits.reduce((sum,d)=>sum+Number(d.amount),0);
    return parseFloat((totalCredits-totalDebits).toFixed(2));
  };

  //add credit
  addCredit = (credit) => {
    const newCreditList = [...this.state.creditList,credit];
    const newBalance = this.calculateBalance(newCreditList,this.state.debitList);
    this.setState({
      creditList:newCreditList,
      accountBalance:newBalance,
    });
  };


  //add debit
  addDebit = (debit) => {
    const newDebitList = [...this.state.debitList,debit];
    const newBalance = this.calculateBalance(this.state.creditList,newDebitList);
    this.setState({
      debitList:newDebitList,
      accountBalance:newBalance,
    });
  };

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/Assignment-3"> 
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;