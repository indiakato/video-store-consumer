import React from 'react';
import PropTypes from 'prop-types';

const Customer = ({id, name, registeredAt, address, city, state, postalCode, phone, accountCredit, videosCheckedOutCount, onClickCallback}) => {

  const onButtonClick = () => {
    onClickCallback([id, name]);
  } 

  return(
      <tr>
          {/* <button onClick={onButtonClick}>{name}</button> */}
          <td>{name}</td>
          <td>{registeredAt}</td>
          <td>{address} {city}, {state} {postalCode}</td>
          <td>{phone}</td>
          <td>{accountCredit}</td>
          <td>{videosCheckedOutCount}</td>
          {/* <p>Phone: {phone}</p>
          <p>Account Credit: {accountCredit}</p>
          <p>Number of videos checked out: {videosCheckedOutCount}</p> */}
      </tr>
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