import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      box: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  onInputChange = async ({ target }) => {
    const { song } = this.props;
    this.setState({
      box: target.checked,
      isLoading: true,
    });
    await addSong(song);
    this.setState({
      isLoading: false,
    });
  };

  getFavorites = async () => {
    const { trackId } = this.props;
    const recebe = await getFavoriteSongs();
    recebe.some((save) => save.trackId === trackId && this.setState({
      box: save,
    }));
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { box, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="checkbox" data-testid={ `checkbox-music-${trackId}` }>
          <input
            id="checkbox"
            type="checkbox"
            name="box"
            checked={ box }
            onChange={ this.onInputChange }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape({}).isRequired,
};

export default MusicCard;
