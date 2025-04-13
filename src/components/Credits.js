/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Credits = (props) => {

  console.log("Credits passed to component:", props.credits);

  //Create list of credit items
  let creditsView =() =>{
    const {credits} = props;
    return credits.map((credit) => {
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{Number(credit.amount).toFixed(2)} {credit.description} {date}</li>
    });
  }

  //Handling form submissions 
  const handleSubmit = (event) => {
    event.preventDefault();
    const newCredit = {
      id:Math.random().toString(), //temp unique id
      description: event.target.description.value,
      amount: Number(event.target.amount.value).toFixed(2),
      date: new Date().toISOString(),
    };
    props.addCredit(newCredit);
    event.target.reset();
  }


  //Render the lise of Credit items and a form to input a new Credit item
  return (
    <div>
      <h1>Credits</h1>

      {creditsView()}

      <form onSubmit={handleSubmit}>
        <input type="text" name="description" placeholder='Description' required />
        <input type="number" name="amount" placeholder='Amount' required />
        <button type="submit">Add Credit</button>
      </form>

      <h3>Account Balance: ${props.accountBalance.toFixed(2)}</h3>

      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;