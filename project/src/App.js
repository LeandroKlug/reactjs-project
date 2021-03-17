import { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    counter: 0,
    posts: []
  };
 
  componentDidMount(){
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');

    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos')


    const [posts, photos] = await Promise.all([postsResponse, photoResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    });

    this.setState({posts: postsAndPhotos});

  }

  componentDidUpdate(){
  }

  componentWillUnmount(){
  }
    
  render(){
    const { posts } = this.state;

    return (
      <section className="container">
        <div className="posts">
          {posts.map(post => (
            <div className="post">
              <img src={post.cover} alt={post.title}/>
              <div key={post.id} className="post-content">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default App;
