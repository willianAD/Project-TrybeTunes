import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artista: '',
      button: true,
      lista: [],
      isLoading: false,
      copia: '',
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
    const recebe = await searchAlbumsAPI(artista);
    this.setState({
      copia: artista,
      isLoading: false,
      lista: recebe,
      artista: '',
    });
  };

  render() {
    const { artista, button, isLoading, lista, copia } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="artista">
          <input
            data-testid="search-artist-input"
            id="artista"
            name="artista"
            type="text"
            value={ artista }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ button }
          onClick={ this.clickButton }
        >
          Pesquisar
        </button>
        <div>
          {
            lista.length > 0
              ? <p>{`Resultado de álbuns de: ${copia}`}</p>
              : <p>Nenhum álbum foi encontrado</p>
          }
          { lista.map((album) => (
            <div key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <h3>{ album.collectionName }</h3>
              <p>{ album.artistName }</p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              />
            </div>
          ))}

        </div>
      </div>
    );
  }
}

export default Search;
