import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './pages/Loading';
import { getUser } from './services/userAPI';
import trybetunes from './images/logo.svg';
import pesquisa from './images/pesquisa.png';
import favoritas from './images/favoritos.png';
import perfil from './images/perfil.png';
import './styles/header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      name: '',
    };
  }

  async componentDidMount() {
    const recebe = await getUser();
    this.setState({
      name: recebe.name,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, name } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <section>
        <nav className="nav-header">
          <img src={ trybetunes } alt="TrybeTunes" className="img-trybetunes" />
          <div className="div-link">
            <div className="pesquisa">
              <img src={ pesquisa } alt="Pesquisa" className="pesquisa" />
              <Link data-testid="link-to-search" to="/search" className="link">
                Pesquisa
              </Link>
            </div>
            <div className="favoritas">
              <img src={ favoritas } alt="Favoritas" className="favoritas" />
              <Link data-testid="link-to-favorites" to="/favorites" className="link">
                Favoritas
              </Link>
            </div>
            <div className="perfil">
              <img src={ perfil } alt="Perfil" className="perfil" />
              <Link data-testid="link-to-profile" to="/profile" className="link">
                Perfil
              </Link>
            </div>
          </div>
          <header data-testid="header-component">
            { name }
          </header>
        </nav>
      </section>
    );
  }
}

export default Header;
