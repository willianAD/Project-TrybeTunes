import React from 'react';
import fundo from '../images/fundo.svg';
import fundo1 from '../images/fundo1.svg';
import '../styles/notFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <>
        <img src={ fundo } alt="fundo" className="img-top" />
        <div data-testid="page-not-found" className="not-found">
          <span>OPS!</span>
          <p className="text-not-found">
            A página que você está procurando não foi encontrada.
          </p>
        </div>
        <img src={ fundo1 } alt="fundo" className="img-botton" />
      </>
    );
  }
}

export default NotFound;
