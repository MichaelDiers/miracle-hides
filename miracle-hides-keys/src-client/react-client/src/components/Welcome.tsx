import { Component } from 'react';
import { Link } from 'react-router-dom';
import { CustomEventRaiser } from '../custom-event-handler';

class Welcome extends Component {
  componentDidMount() {
    CustomEventRaiser.raiseShowHeader(false);
  }

  render() {
    return (
      <div className="welcome">
        <h1 translationvalue="commonLanguageSource.miracleHidesKeys.textContent">Miracle Hides Keys</h1>
        <div className="asymmetric-color">
          <h2 translationvalue="commonLanguageSource.asymmetricEncryption.textContent">asymmetrische Verschlüsselung</h2>
          <ol>
            <li translationvalue="commonLanguageSource.algorithmEc.textContent">EC</li>
            <li translationvalue="commonLanguageSource.algorithmRsa.textContent">RSA</li>
          </ol>
          <Link to="/asymmetric">
            <button id="generateAsync" className="button" translationvalue="commonLanguageSource.generate.textContent">Generieren</button>
          </Link>
        </div>
        <div className="symmetric-color">
          <h2 translationvalue="commonLanguageSource.symmetricEncryption.textContent">symmetrische Verschlüsselung</h2>
          <ol>
            <li translationvalue="commonLanguageSource.algorithmAes.textContent">AES</li>
            <li translationvalue="commonLanguageSource.algorithmHmac.textContent">HMAC</li>
          </ol>
          <Link to="/symmetric">
            <button id="generateSync" className="button" translationvalue="commonLanguageSource.generate.textContent">Generieren</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Welcome;
