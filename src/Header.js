import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './pages/Loading';
import { getUser } from './services/userAPI';

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
        <header data-testid="header-component">
          <p data-testid="header-user-name">
            { name }
          </p>
        </header>
        <nav>
          <ul>
            <li><Link data-testid="link-to-search" to="/search">Search</Link></li>
            <li><Link data-testid="link-to-favorites" to="/favorites">Favorite</Link></li>
            <li><Link data-testid="link-to-profile" to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </section>
    );
  }
}

export default Header;
