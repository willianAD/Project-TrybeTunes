import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import fundo from '../images/fundo.svg';
import fundo1 from '../images/fundo1.svg';
import '../styles/search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artista: '',
      button: true,
      lista: [],
      isLoading: false,
      copia: '',
      clickButton: true,
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.enableButton());
  };

  enableButton = () => {
    const dois = 2;
    const { artista } = this.state;
    this.setState({
      button: artista.length < dois,
    });
  };

  clickButton = async () => {
    this.setState({
      isLoading: true,
    });
    const { artista } = this.state;
    const albumList = await searchAlbumsAPI(artista);
    this.setState({
      copia: artista,
      isLoading: false,
      lista: albumList,
      artista: '',
      clickButton: false,
    });
  };

  render() {
    const { artista, button, isLoading, lista, copia, clickButton } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-search" className="div-search">
        <Header />
        <img src={ fundo } alt="fundo" className="img-top-pages" />
        <img src={ fundo1 } alt="fundo" className="img-botton-pages" />
        <div className="search">
          <label htmlFor="artista" className="label-search">
            <input
              data-testid="search-artist-input"
              id="artista"
              name="artista"
              type="text"
              placeholder="NOME DO ARTISTA"
              className="input-search"
              value={ artista }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            className="button-search"
            disabled={ button }
            onClick={ this.clickButton }
          >
            PROCURAR
          </button>
        </div>
        <div className="list-search">
          { !lista.length && !clickButton
            ? (
              <div className="find-list">
                <p>{`Resultado de álbuns de: ${copia}`}</p>
                <p>Nenhum álbum foi encontrado</p>
              </div>
            )
            : (
              <div className="find-list">
                <p>{`Resultado de álbuns de Artista: ${copia}`}</p>
                {
                  lista.map((album) => (
                    <div key={ album.collectionId } className="div-album">
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      <h3>{ album.collectionName }</h3>
                      { album.artistName }
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                        className="links"
                      >
                        Album do Artista
                      </Link>
                    </div>
                  ))
                }
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Search;
