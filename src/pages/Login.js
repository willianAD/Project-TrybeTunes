import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import trybetunes from '../images/logo.svg';
import fundo from '../images/fundo.svg';
import fundo1 from '../images/fundo1.svg';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      login: '',
      button: true,
      isLoading: false,
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.enableButton());
  };

  enableButton = () => {
    const tres = 3;
    const { login } = this.state;
    this.setState({
      button: login.length < tres,
    });
  };

  saveButton = () => {
    const { login } = this.state;
    const { history } = this.props;
    createUser({ name: login });
    history.push('/search');
  };

  render() {
    const { login, button, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <>
        <img src={ fundo } alt="fundo" className="img-top" />
        <div data-testid="page-login" className="div-login">
          <img src={ trybetunes } alt="TrybeTunes" className="img-trybetunes" />
          <label htmlFor="login" className="label-login">
            <input
              data-testid="login-name-input"
              className="input-login"
              id="login"
              name="login"
              type="text"
              placeholder="Qual é seu nome?"
              value={ login }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            className="button-login"
            name="button"
            type="button"
            disabled={ button }
            onClick={ this.saveButton }
          >
            Entrar
          </button>
        </div>
        <img src={ fundo1 } alt="fundo" className="img-botton" />
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
