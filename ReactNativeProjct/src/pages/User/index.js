import React, {Component} from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Bio,
  Container,
  Header,
  Avatar,
  Name,
  Repos,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Description,
} from './styles';

// import { Container } from './styles';

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    repos: [],
  };

  async componentDidMount() {
    const {navigation} = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/repos`);

    this.setState({repos: response.data});
  }

  render() {
    const {navigation} = this.props;
    const {repos} = this.state;

    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Repos
          data={repos}
          keyExtractor={repo => String(repo.id)}
          renderItem={({item}) => (
            <Starred>
              <OwnerAvatar source={{uri: item.owner.avatar_url}} />
              <Info>
                <Title>{item.name}</Title>
                <Description>{item.description}</Description>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
