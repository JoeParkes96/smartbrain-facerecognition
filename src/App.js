import './App.css';

import ImageLinkSubmitter from './components/imageLinkSubmitter/ImageLinkSubmitter';
import Logo from './components/logo/Logo';
import Navigation from './components/navigation/Navigation';
import Particles from 'react-particles-js';
import React from 'react';
import UserRank from './components/userRank/UserRank';

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

function App() {
  return (
    <div className="App">
      <Particles className="particles-background" params={particleParameters}/>
      <Navigation />
      <Logo />
      <UserRank />
      <ImageLinkSubmitter />
    {/*  <RecognitionImage />} */}
    </div>
  );
}

export default App;
