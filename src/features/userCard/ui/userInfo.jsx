import React from 'react';
import PropTypes from 'prop-types';
import Profession from '../../profession/ui/profession';

const UserInfo = ({ name, professionId, rate }) => (
  <div className="mt-3 text-center">
    <p>{name}</p>
    <Profession id={professionId} />
    <div className="text-muted">
      <i className="bi bi-caret-down-fill text-primary" role="button"></i>
      <i className="bi bi-caret-up text-secondary" role="button"></i>
      <span className="ms-2">{rate}</span>
    </div>
  </div>
);

UserInfo.propTypes = {
  name: PropTypes.string,
  professionId: PropTypes.string,
  rate: PropTypes.number,
};

export default UserInfo;
