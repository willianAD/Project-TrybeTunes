import React from 'react';
import Header from '../Header';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import fundo from '../images/fundo.svg';
import fundo1 from '../images/fundo1.svg';
import '../styles/favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      favorite: [],
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favorite: favoriteSongs,
    });
  }

  render() {
    const { isLoading, favorite } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <section>
        <div data-testid="page-favorites" className="div-favorites">
          <Header />
          <img src={ fundo } alt="fundo" className="img-top-pages" />
          <img src={ fundo1 } alt="fundo" className="img-botton-pages" />
          <p className="title-favorites">Músicas Favoritas</p>
          <div className="list-favorites">
            { favorite.map((song) => (
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

export default Favorites;
