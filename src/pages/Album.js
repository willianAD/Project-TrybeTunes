import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import fundo from '../images/fundo.svg';
import fundo1 from '../images/fundo1.svg';
import '../styles/album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      lista: [],
      isLoading: true,
      album: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({
      lista: musicList.filter((item) => item.kind === 'song'),
      album: musicList[0],
      isLoading: false,
    });
  }

  render() {
    const { lista, isLoading, album } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <section className="album">
        <Header />
        <div data-testid="page-album" className="">
          <img src={ fundo } alt="fundo" className="img-top-album" />
          <img src={ fundo1 } alt="fundo" className="img-botton-album" />
          <div className="title-album">
            { album && (
              <div className="title-individual-album">
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <h3 data-testid="album-name">{ album.collectionName }</h3>
                <p data-testid="artist-name">{ album.artistName }</p>
              </div>
            )}
          </div>
          <div className="album-list">
            { lista.map((song) => (
              <MusicCard
                key={ song.trackId }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
                song={ song }
              />
            ))}
          </div>
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
