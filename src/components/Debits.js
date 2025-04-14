/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }

  //Handle Form Submissions
  const handleSubmit = (event) => {
    event.preventDefault();
    const newDebit = {
      id:Math.random().toString(),
      description: event.target.description.value,
      amount: Number(event.target.amount.value),
      date: new Date().toISOString(),
    };
    props.addDebit(newDebit);
    event.target.reset();
  };

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsView()}

      <form onSubmit={handleSubmit}>
        <input type="text" name="description" placeholder='Description' required />
        <input type="number" name="amount" placeholder='Amount' required/>
        <button type="submit">Add Debit</button>
      </form>

      <h3> Account Balance: ${props.accountBalance.toFixed(2)}</h3>

      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;