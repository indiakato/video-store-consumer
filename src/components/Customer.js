import React from 'react';
import PropTypes from 'prop-types';

const Customer = ({id, name, registeredAt, address, city, state, postalCode, phone, accountCredit, videosCheckedOutCount}) => {

return(
    <div>
        <p>Id: {id}</p>
        <p>Name: {name}</p>
        <p>Registered At: {registeredAt}</p>
        <p>Addres: {address} {city}, {state} {postalCode}</p>
        <p>Phone: {phone}</p>
        <p>Account Credit: {accountCredit}</p>
        <p>Number of videos checked out: {videosCheckedOutCount}</p>
    </div>
    )
}


Customer.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    registeredAt: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    videosCheckedOutCount: PropTypes.number.isRequired,
};

export default Customer;