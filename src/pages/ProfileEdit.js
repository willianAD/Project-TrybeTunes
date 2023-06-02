import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Loading from './Loading';
import logo from '../images/logo.svg';
import fundo from '../images/fundo.svg';
import fundo1 from '../images/fundo1.svg';
import '../styles/profile.css';

class ProfileEdit extends React.Component {
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

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  buttonClick = () => {
    const { history } = this.props;
    const { name, email, description } = this.state;
    localStorage.setItem('user', JSON.stringify({ name, email, description }));
    history.push('/profile');
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
          <p className="profile-info"><strong>Nome</strong></p>
          <label htmlFor="name" className="label-profile">
            <input
              id="name"
              name="name"
              type="text"
              className="input-login"
              value={ name }
              onChange={ this.onInputChange }
            />
          </label>
          <p className="profile-info"><strong>Email</strong></p>
          <label htmlFor="email" className="label-profile">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Digite seu e-mail."
              className="input-login"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
          <p className="profile-info"><strong>Descrição</strong></p>
          <label htmlFor="description" className="label-profile">
            <textarea
              id="description"
              name="description"
              type="text"
              placeholder="Sobre mim."
              className="input-profile"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            className="button-profile"
            name="button"
            onClick={ this.buttonClick }
          >
            SALVAR
          </button>
        </div>
      </section>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
