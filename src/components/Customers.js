import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Customer from './Customer'

const Customers = ({url}) => {
    const [customers, setCustomers] = useState([]);
    const [errorMessage, setErrorMessage] = useState([])

    useEffect(() => {
        axios.get(url + '/customers')
        .then((response) => {
        const apiCustomers = response.data.map((apiCustomer) => {
            return ({
            id: apiCustomer.id,
            name: apiCustomer.name,
            registeredAt: apiCustomer.registered_at,
            address: apiCustomer.address,
            city: apiCustomer.city, 
            state: apiCustomer.state,
            postalCode: apiCustomer.postal_code,
            phone: apiCustomer.phone,
            accountCredit: apiCustomer.account_credit,
            videosCheckedOutCount: apiCustomer.videos_checked_out_count
            })
        })
        setCustomers(apiCustomers)
        })
        .catch((error) => {
            setErrorMessage(error.message)
        })
    }, [url])

    const loadCustomers = () => {
        return customers.map((customer) => {
            return <Customer id={customer.id} name={customer.name} registeredAt={customer.registeredAt} address={customer.address} city={customer.city} state={customer.state} postalCode={customer.postalCode} phone={customer.phone} accountCredit={customer.accountCredit} videosCheckedOutCount={customer.videosCheckedOutCount}/>
        })
    }

    return(
        <div>{loadCustomers()}</div>
    )

}

Customers.propTypes = {
    url: PropTypes.string.isRequired
};

export default Customers;