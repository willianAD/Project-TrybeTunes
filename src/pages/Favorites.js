import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../Header';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const recebe = await getFavoriteSongs();
    console.log(recebe);
    this.setState({
      isLoading: false,
      [recebe]: recebe,
    });
  }

  render() {
    // const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, recebe } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <section>
        <div data-testid="page-favorites">
          <Header />
        </div>
        { recebe.map((song) => (
          <MusicCard
            key={ song.trackId }
          />
        ))}
      </section>
    );
  }
}

// Favorites.propTypes = {
//   trackName: PropTypes.string.isRequired,
//   previewUrl: PropTypes.string.isRequired,
//   trackId: PropTypes.number.isRequired,
//   song: PropTypes.shape({}).isRequired,
// };

export default Favorites;
