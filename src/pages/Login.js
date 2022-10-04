import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="page-login">
        <label htmlFor="login">
          <input
            data-testid="login-name-input"
            id="login"
            name="login"
            type="text"
            value={ login }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          data-testid="login-submit-button"
          name="button"
          type="button"
          disabled={ button }
          onClick={ this.saveButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

// export const createUser = (user) => new Promise((resolve) => {
//   const emptyUser = {
//     name: '',
//     email: '',
//     image: '',
//     description: '',
//   };
//   saveUser({ ...emptyUser, ...user });
//   simulateRequest(SUCCESS_STATUS)(resolve);
// });

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
