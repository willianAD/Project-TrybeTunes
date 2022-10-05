import React from 'react';
import Header from '../Header';
// import PropTypes from 'prop-types';

class Favorites extends React.Component {
  render() {
    // const { song } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header />
      </div>
    );
  }
}

// Favorites.propTypes = {
//   song: PropTypes.shape({}).isRequired,
// };

export default Favorites;
