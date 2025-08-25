// import React from 'react';
// import PropTypes from 'prop-types';

// const SearchStatus = ({ length }) => {
//   const renderPhrase = (number) => {
//     const lastOne = Number(number.toString().slice(-1));
//     if (number > 4 && number < 15) {
//       return 'человек тусанет';
//     }
//     if (lastOne === 1) return 'человек тусанет';
//     if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут';
//     return 'человек тусанет';
//   };
//   return (
//     <h2>
//       <span className={'badge ' + (length > 0 ? 'bg-primary' : 'bg-danger')}>
//         {length > 0
//           ? `${length + ' ' + renderPhrase(length)}   с тобой сегодня`
//           : 'Никто с тобой не тусанет'}
//       </span>
//     </h2>
//   );
// };
// SearchStatus.propTypes = {
//   length: PropTypes.number,
// };

// export default SearchStatus;
import React from 'react';
import PropTypes from 'prop-types';
import { PersonFill } from 'react-bootstrap-icons'; // npm install react-bootstrap-icons

const SearchStatus = ({ length }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <PersonFill size={40} color={length > 0 ? '#0d6efd' : '#dc3545'} />
      {length > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            padding: '3px 7px',
            fontSize: '12px',
            fontWeight: 'bold',
            lineHeight: '1',
          }}
        >
          {length}
        </span>
      )}
    </div>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number,
};

export default SearchStatus;
