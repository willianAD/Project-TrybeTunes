import React from 'react';
import Header from '../Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artista: '',
      button: true,
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

  render() {
    const { artista, button } = this.state;
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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
