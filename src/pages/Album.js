import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import getMusics from '../services/musicsAPI';
// import MusicCard from './MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      lista: [],
      isLoading: false,
      album: {},
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const { match: { params: { id } } } = this.props;
    const recebe = await getMusics(id);
    this.setState({
      lista: recebe.filter((item) => item.kind === 'song'),
      album: recebe[0],
      isLoading: false,
    });
  }

  render() {
    const { lista, isLoading, album } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <section>
        <div data-testid="page-album">
          <Header />
        </div>
        <div>
          { album && (
            <div>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <h3 data-testid="album-name">{ album.collectionName }</h3>
              <p data-testid="artist-name">{ album.artistName }</p>
            </div>
          )}
          { lista.map((song) => (
            <div key={ song.trackId }>
              <p>{ song.trackName }</p>
              <audio data-testid="audio-component" src={ song.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
