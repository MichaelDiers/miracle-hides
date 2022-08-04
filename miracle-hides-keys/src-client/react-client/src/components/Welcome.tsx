import { Component } from 'react';
import { Link } from 'react-router-dom';
import { CustomEventRaiser } from '../infrastructure/custom-event-handler';
import { CommonTranslation } from './Translations';

export interface WelcomeProperties {
  common: CommonTranslation;
}

class Welcome extends Component<WelcomeProperties> {
  componentDidMount() {
    CustomEventRaiser.raiseShowHeader(false);
  }

  render() {
    return (
      <div className="welcome">
        <h1>{this.props.common.miracleHidesKeys}</h1>
        <div className="asymmetric-color">
          <h2>{this.props.common.asymmetricEncryption}</h2>
          <ol>
            <li>{this.props.common.algorithmEcShort}</li>
            <li>{this.props.common.algorithmRsaShort}</li>
          </ol>
          <Link to="/asymmetric">
            <button id="generateAsync" className="button">{this.props.common.generate}</button>
          </Link>
        </div>
        <div className="symmetric-color">
        <h2>{this.props.common.symmetricEncryption}</h2>
          <ol>
            <li>{this.props.common.algorithmAesShort}</li>
            <li>{this.props.common.algorithmHmacShort}</li>
          </ol>
          <Link to="/symmetric">
            <button id="generateSync" className="button">{this.props.common.generate}</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Welcome;
