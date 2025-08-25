import React from 'react';
import PropTypes from 'prop-types';

const AboutCard = ({ text = '' }) => {
  const hasText = Boolean(text && text.trim());

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title mb-3">О себе</h5>
        {hasText ? (
          <p className="card-text" style={{ whiteSpace: 'pre-wrap' }}>
            {text}
          </p>
        ) : (
          <p className="text-muted mb-0">
            Пользователь пока ничего о себе не рассказал.
          </p>
        )}
      </div>
    </div>
  );
};

AboutCard.propTypes = {
  text: PropTypes.string,
};

export default AboutCard;
