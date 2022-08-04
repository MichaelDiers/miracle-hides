import { Component } from 'react';
import { CustomEventRaiser } from '../custom-event-handler';
import { AsymmetricTranslation, CommonTranslation } from './Translations';

export interface AsymmetricProperties {
  common: CommonTranslation;
  translation: AsymmetricTranslation;  
}

class Asymmetric extends Component<AsymmetricProperties> {
  componentDidMount() {
    CustomEventRaiser.raiseShowHeader();
  }

  render() {
    return (
      <div className="asymmetric-color">
        <h1>{this.props.translation.headline}</h1>
        <div id="asymmetricErrorMessage"></div>
        <form
          id="generateForm"
          className="grid-form"
          action="/keys"
          method="post"
        >
          <label htmlFor="type">{this.props.common.algorithm}</label>
          <div
            id="type"
            className="grid-form-row-4"
          >
            <input
              id="type_0"
              name="type"
              value="EC"
              checked={true}
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="type_0">{this.props.common.algorithmEcShort}</label>
            <input
              id="type_1"
              name="type"
              value="RSA"
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="type_1">{this.props.common.algorithmRsaShort}</label>
          </div>
          <label htmlFor="rsaKeySize" className="hidden">{this.props.common.keySize}</label>
          <div id="rsaKeySize" className="grid-form-row-6 hidden">
            <input
              id="rsaKeySize_0"
              name="rsaKeySize"
              value="1024"
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="rsaKeySize_0">{this.props.common.keySize1024}</label>
            <input
              id="rsaKeySize_1"
              name="rsaKeySize"
              value="2048"
              checked={true}
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="rsaKeySize_1">{this.props.common.keySize2048}</label>
            <input
              id="rsaKeySize_2"
              name="rsaKeySize"
              value="4096"
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="rsaKeySize_2">{this.props.common.keySize4096}</label>
          </div>
          <label htmlFor="ecNamedCurve">{this.props.common.namedCurve}</label>
          <div id="ecNamedCurve" className="grid-form-row-2">
            <input
              id="ecNamedCurve_0"
              name="ecNamedCurve"
              value="sect239k1"
              checked={true}
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="ecNamedCurve_0">{this.props.common.namedCurve}</label>
          </div>
          <input          
            id="asymmetricSubmit"
            value={this.props.common.submitGenerateKeys}
            className="submit col-2"
            type="submit"
          ></input>
          <label htmlFor="asymmetricPrivateKey">{this.props.common.privateKey}</label>
          <div className="textarea-container">
            <div></div>
            <textarea
              id="asymmetricPrivateKey"
              name="asymmetricPrivateKey"
              rows={15}
              className="text"
              readOnly={true}
              placeholder={this.props.common.noKeyGenerated}
            ></textarea>
          </div>
          <label htmlFor="asymmetricPublicKey">{this.props.common.publicKey}</label>
          <div className="textarea-container">
            <div></div>
            <textarea
              id="asymmetricPublicKey"
              name="asymmetricPublicKey"
              rows={6}
              className="text"
              readOnly={true}
              placeholder={this.props.common.noKeyGenerated}
            ></textarea>
          </div>
          <label htmlFor="testInput">{this.props.common.testInput}</label>
          <div className="textarea-container">
            <div></div>
            <textarea
              id="testInput"
              name="testInput"
              rows={2}
              className="text"
              readOnly={true}
              placeholder={this.props.common.testInputPlaceholder}
              value={this.props.common.testInputValue}
            ></textarea>
          </div>
          <label htmlFor="testInputEncrypted">{this.props.common.testInputEncrypted}</label>
          <div className="textarea-container">
            <div></div>
            <textarea
              id="testInputEncrypted"
              rows={2}
              className="text"
              readOnly={true}
              placeholder={this.props.common.testInputEncryptedPlaceholder}
            ></textarea>
          </div>
          <label htmlFor="testInputDecrypted">{this.props.common.testInputDecrypted}</label>
          <div className="textarea-container">
            <div></div>
            <textarea
              id="testInputDecrypted"
              rows={2}
              className="text"
              readOnly={true}
              placeholder={this.props.common.testInputDecryptedPlaceholder}
            ></textarea>
          </div>
        </form>
      </div>
    );
  }
};

export default Asymmetric;
