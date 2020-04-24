import './App.css';

import React, {Component} from 'react';

import Clarifai from 'clarifai';
import ImageLinkSubmitter from './components/imageLinkSubmitter/ImageLinkSubmitter';
import Logo from './components/logo/Logo';
import Navigation from './components/navigation/Navigation';
import Particles from 'react-particles-js';
import RecognitionImage from './components/recognitionImage/RecognitionImage';
import UserRank from './components/userRank/UserRank';

const clarifaiApp = new Clarifai.App({
  apiKey: 'fb6166db2fa24710b76d6c4934536353'
 });

const particleParameters = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
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
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: ''
    };
  }

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onSubmit = () => {
  this.setState({imageURL: this.state.input})
  clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then((response) => {
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  });
}

  render() {
    return (
      <div className="App">
        <Particles className="particles-background" params={particleParameters}/>
        <Navigation />
        <Logo />
        <UserRank />
        <ImageLinkSubmitter onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <RecognitionImage imageURL={this.state.imageURL} />
      </div>
    );
  }
  
}

export default App;
