import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Loading from './Loading';
import logo from '../images/logo.svg';
import fundo from '../images/fundo.svg';
import fundo1 from '../images/fundo1.svg';
import '../styles/profile.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      name: '',
      email: '',
      description: '',
    };
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      isLoading: false,
      name: user.name,
      email: user.email,
      description: user.description,
    });
  }

  buttonClick = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  };

  render() {
    const { name, email, description, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <section>
        <div data-testid="page-profile" className="div-profile">
          <Header />
          <img src={ fundo } alt="fundo" className="img-top-profile" />
          <img src={ fundo1 } alt="fundo" className="img-botton-profile" />
        </div>
        <div className="img-profile">
          <img
            className="img-profile"
            src={ logo }
            alt="foto"
          />
        </div>
        <div className="list-profile">
          <p className="profile-info">
            <strong>Nome</strong>
            <br />
            <br />
            { name }
          </p>
          <p className="profile-info">
            <strong>Email</strong>
            <br />
            <br />
            { email }
          </p>
          <p className="profile-info">
            <strong>Descrição</strong>
            <br />
            <br />
            { description }
          </p>
          <button
            type="button"
            className="button-profile"
            name="button"
            onClick={ this.buttonClick }
          >
            Editar Perfil
          </button>
        </div>
      </section>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
