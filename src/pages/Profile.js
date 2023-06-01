import React from 'react';
import Header from '../Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const recebe = await getUser();
    this.setState({
      isLoading: false,
      [recebe]: recebe,
    });
  }

  render() {
    const { recebe, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <section>
        <div data-testid="page-profile">
          <Header />
        </div>
        {recebe.map((user, index) => (
          <div key={ index }>
            <img
              data-testid="profile-image"
              src={ user.tostring.name }
              alt={ user.tostring.name }
            />
            <p>{ user.tostring.name }</p>
          </div>
        ))}
      </section>
    );
  }
}

export default Profile;
