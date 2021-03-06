import './App.css';

import React, {Component, Fragment} from 'react';

import ImageLinkSubmitter from './components/imageLinkSubmitter/ImageLinkSubmitter';
import Logo from './components/logo/Logo';
import Navigation from './components/navigation/Navigation';
import Particles from 'react-particles-js';
import RecognitionImage from './components/recognitionImage/RecognitionImage';
import Register from './components/register/Register';
import SignIn from './components/signIn/SignIn';
import UserRank from './components/userRank/UserRank';

const particleParameters = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#FFBC81",
        blur: 5
      }
    },
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signIn',
  routes: ['signIn', 'register', 'home'],
  isSignedIn: false,
  user: {
      id: '',
      name: '',
      email: '',
      submissions: 0,
      dateJoined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
          id: data.id,
          name: data.name,
          email: data.email,
          submissions: data.submissions,
          dateJoined: data.dateJoined
      }
    });
  }

  updateUserSubmissionCount = () => {
    fetch('https://immense-refuge-48530.herokuapp.com/image',
        {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
            this.setState(Object.assign(this.state.user, {submissions: count}))
        })
        .catch(err => console.log(err));
  }

calculateFaceLocation = (data) => {
  const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;
  const inputtedImage = document.getElementById("inputted-image");
  const imageWidth = Number(inputtedImage.width);
  const imageHeight = Number(inputtedImage.height);
  return {
    leftCol: boundingBox.left_col * imageWidth,
    topRow: boundingBox.top_row * imageHeight,
    rightCol: imageWidth - (boundingBox.right_col * imageWidth),
    bottomRow: imageHeight - (boundingBox.bottom_row * imageHeight) 
  };
}

onChangeRoute = (route) => {
  if(this.state.routes.includes(route)) {
    if (route === 'signIn') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  } else {
    throw new Error('Invalid route');
  }
}

setBoxLocation = (boundingBox) => {
  this.setState({box: boundingBox});
}

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onImageSubmit = () => {
  this.setState({imageURL: this.state.input})
  fetch('https://immense-refuge-48530.herokuapp.com/imageUrl',
        {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
  .then(response => response.json())
  .then((response) => {
    if(response) {
      this.updateUserSubmissionCount();
      this.setBoxLocation(this.calculateFaceLocation(response));
    }
  })
  .catch(error => console.log(error));
}

  render() {
    const { isSignedIn, route, imageURL, box, user } = this.state;
    return (
      <div className="App">
        <Particles className="particles-background" params={particleParameters}/>
        <Navigation onChangeRoute={this.onChangeRoute} isSignedIn={isSignedIn} />
        { route === 'home' 
        ? <Fragment>
            <Logo />
            <UserRank name={user.name} submissions={user.submissions} />
            <ImageLinkSubmitter onInputChange={this.onInputChange} onSubmit={this.onImageSubmit}/>
            <RecognitionImage imageURL={imageURL} box={box} />
        </Fragment>
        : (
          route === 'signIn'
          ? <SignIn onChangeRoute={this.onChangeRoute} loadUser={this.loadUser}/>
          : <Register onChangeRoute={this.onChangeRoute} loadUser={this.loadUser}/>
          
        )
      }
      </div>
    );
  }
  
}

export default App;
