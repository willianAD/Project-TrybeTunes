import React from 'react';
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
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { name }
        </p>
      </header>
    );
  }
}

export default Header;
