import React from 'react'
import PropTypes from 'prop-types'
import Customer from './Customer'

const Customers = ({customers, onClickCallback}) => {

    const loadCustomers = () => {
        return customers.map((customer) => {
            return <Customer id={customer.id} name={customer.name} registeredAt={customer.registeredAt} address={customer.address} city={customer.city} state={customer.state} postalCode={customer.postalCode} phone={customer.phone} accountCredit={customer.accountCredit} videosCheckedOutCount={customer.videosCheckedOutCount} onClickCallback={onClickCallback} key={customer.id}/>
        })
    }
    return(
      <div>
        <h2>Customers</h2>
      <table className="table">
          <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Registered At</th>
          <th scope="col">Address</th>
          <th scope="col">Phone</th>
          <th scope="col">Account Credit</th>
          <th scope="col">Videos Checked Out Count</th>
        </tr>
        </thead>
        <tbody>
        {loadCustomers()}
        </tbody>
      </table>
      </div>
       
    )

}

Customers.propTypes = {
    customers: PropTypes.array.isRequired,
    onClickCallback: PropTypes.func.isRequired
};

export default Customers;