import React from 'react';
import '../styles/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <>
        <div className="loading" />
        <p>Carregando...</p>
      </>
    );
  }
}

export default Loading;
