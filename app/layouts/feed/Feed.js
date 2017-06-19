import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  List,
  Button,
  Icon,
  Text,
} from 'native-base';

import SinglePost from '../../components/SinglePost';
import { loadPosts } from '../../redux/reducers/posts';
import styles from './styles';

const mapStateToProps = ({ posts }) => ({ posts });

const mapDispatchToProps = { loadPosts };

const renderPost = (post, index) => (
  <SinglePost
    key={index}
    name={post.name}
    username={post.username}
    profilePicture={post.profilePicture}
    content={post.content}
  />
)

class Feed extends Component {
  componentDidMount(){
    this.props.loadPosts();
  }

  render(){
    const endMsg = this.props.posts.length === 0 ? "There aren't any posts yet!" : "That's all the posts for now!"

    return (
      <Container style={styles.container}>
        <Content>
          <List>
            {
              !!this.props.posts.length && this.props.posts.map(renderPost)
            }
          </List>
          <Text style={styles.end}>{endMsg}</Text>
        </Content>
        <Button
          rounded
          style={styles.button}
          onPress={() => Actions.newPost()}
        >
          <Icon
            name="create"
            style={{padding: 5}}
          />
        </Button>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
