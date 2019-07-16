import React, { Component } from "react";
import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Checkbox, Dimmer, Loader, List, Image, TableBody, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux'
import Webcam from "react-webcam";
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import './style.min.css'
import { sendPicture, doStuff } from '../actions'

const videoConstraints = {
  facingMode: "environment"
};

class CountingBricks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FacingMode: 'environment',
      array: [],
      clicked: [],
      class: 0

    }
    this.changeFacingMode = this.changeFacingMode.bind(this)
    this.capture = this.capture.bind(this)

  }
  changeFacingMode() {
    if (this.state.FacingMode == 'environment') {
      this.setState({ FacingMode: 'user' })
    }
    else
      this.setState({ FacingMode: 'environment' })
  }

  onTakePhoto(dataUri) {
    this.props.sendPicture(dataUri)



    console.log(this.props.user);
    //sendPicture(dataUri)
  }

  onCameraError(error) {
    console.error('onCameraError', error);
  }

  onCameraStart(stream) {
    console.log(stream, 'onCameraStart');
  }

  onCameraStop() {
    console.log('onCameraStop');
  }

  componentDidMount() {

  }
  setRef = webcam => {
    this.webcam = webcam;
  };
 

  capture(){
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc)
    this.props.sendPicture(imageSrc)
  }
  componentDidUpdate() {
    
      //this.props.user.response ? this.interval = setInterval(() => this.capture(), 100) : ''
      //this.props.user.response ? this.capture(): ''
    
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {



    return (
      <div className='container'>

        <div className="Camera">
          <div className='prevision'>
            <p>{this.props.user.class}</p>
            <label>Accuracy: {this.props.user.accuracy}%</label>
          </div>
          <div className='IconCamera'>
            <Icon
              name='camera'
              onClick={this.changeFacingMode}>
            </Icon>
          </div>
          <div className="App">

            <Webcam
              audio={false}
              height={350}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={350}
              videoConstraints={videoConstraints}
            />
            <button onClick={this.capture}>Capture photo</button>
           { /* <Camera
              onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
              //onCameraError={(error) => { this.onCameraError(error); }}
              idealFacingMode={this.state.FacingMode}
              //idealResolution={{ width: 2040, height: 2000 }}
              imageType='jpg'
              imageCompression={0.9}
              isMaxResolution={true}
              isImageMirror={false}
              isSilentMode={true}
              //isDisplayStartCameraError={true}
              //isFullscreen={true}
              //sizeFactor={1}
              onCameraStart={(stream) => { this.onCameraStart(stream); 
            //onCameraStop={() => { this.onCameraStop(); }}
            />*/}
            {/*<Camera
              onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
              isMaxResolution={false}
              isFullscreen={true}
              imageCompression={0.6}
              //idealFacingMode={FACING_MODES.USER}
              facingMode={'environment'}
              
            /> */}
          </div>
        
        </div>
        <div className='footer'> footer</div>
        {/*        <div className='infoContainer'>
          <div className='lastNumbers'>

           




            <div className='NumbersSelected'>
              <p>77%</p>
            </div>

          </div>
        </div>
 */}
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    user: state.user,
    message: state.user.message,
    messageType: state.user.messageType,
    openMessage: state.user.openMessage,

  }
}

export default connect(mapStateToProps, {
  sendPicture

})(CountingBricks);