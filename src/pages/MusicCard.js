import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      box: false,
      isLoading: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const favoriteSong = await getFavoriteSongs();
    await favoriteSong.some((save) => save.trackId === trackId && this.setState({
      box: save,
    }));
  }

  onInputChange = async ({ target }) => {
    const { song } = this.props;
    this.setState({
      box: target.checked,
      isLoading: true,
    });
    if (target.checked) {
      await addSong(song);
    } else {
      await removeSong(song);
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { box, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="music-card">
        { trackName }
        <audio data-testid="audio-component" src={ previewUrl } className="back" controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code className="back">audio</code>
        </audio>
        <label htmlFor={ trackId } className="back">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            type="checkbox"
            name="box"
            className="back"
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
