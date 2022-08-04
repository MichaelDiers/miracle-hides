import { Component } from 'react';
import { CustomEventRaiser } from '../infrastructure/custom-event-handler';
import { CommonTranslation, SymmetricTranslation } from './Translations';

interface SymmetricProperties {
  common: CommonTranslation;
  translation: SymmetricTranslation;
}

class Symmetric extends Component<SymmetricProperties> {
  componentDidMount() {
    CustomEventRaiser.raiseShowHeader();
  }

  render() {
    return (
      <div className="symmetric-color">
        <h1>{this.props.translation.headline}</h1>
        <div id="symmetricErrorMessage"></div>
        <form
          id="generateForm"
          className="grid-form"
          action="/keys"
          method="post"
        >
          <label htmlFor="type">{this.props.common.algorithm}</label>
          <div id="type" className="grid-form-row-4">
            <input
              id="type_0"
              name="type"
              value="AES"
              checked={true}
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="type_0">{this.props.common.algorithmAesShort}</label>
            <input
              id="type_1"
              name="type"
              value="HMAC"
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="type_1">{this.props.common.algorithmHmacShort}</label>
          </div>
          <label htmlFor="aesKeySize">{this.props.common.keySize}</label>
          <div id="aesKeySize" className="grid-form-row-6">
            <input
              id="aesKeySize_0"
              name="aesKeySize"
              value="128"
              checked={true}
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="aesKeySize_0">{this.props.common.keySize128}</label>
            <input
              id="aesKeySize_1"
              name="aesKeySize"
              value="192"
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="aesKeySize_1">{this.props.common.keySize192}</label>
            <input
              id="aesKeySize_2"
              name="aesKeySize"
              value="256"
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="aesKeySize_2">{this.props.common.keySize256}</label>
          </div>
          <label htmlFor="hmacKeySize" className="hidden">{this.props.common.keySize}</label>
          <input
            id="hmacKeySize"
            name="hmacKeySize"
            value="128"
            min="8"
            max="9999999999"
            inputMode="numeric"
            pattern="[0-9]*"
            className="text text-center hidden"
            type="text"
          ></input>
          <input
            id="symmetricSubmit"
            value={this.props.common.submitGenerateKeys}
            className="submit col-2"
            type="submit"
          ></input>
          <label htmlFor="symmetricPrivateKey">{this.props.common.privateKey}</label>
          <div className="textarea-container">
            <div></div>
            <textarea
              id="symmetricPrivateKey"
              name="symmetricPrivateKey"
              rows={3}
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
              rows={1}
              className="text"
              readOnly={true}
              placeholder={this.props.common.testInputPlaceholder}
              value={this.props.common.testInputValue}
            ></textarea>
          </div>
          <label htmlFor="symmetricTestInputEncrypted">{this.props.common.testInputEncrypted}</label>
          <div className="textarea-container">
            <div></div>
            <textarea
              id="symmetricTestInputEncrypted"
              rows={1}
              className="text"
              readOnly={true}
              placeholder={this.props.common.testInputEncryptedPlaceholder}
            ></textarea>
          </div>
          <label htmlFor="symmetricTestInputDecrypted">{this.props.common.testInputDecrypted}</label>
          <div className="textarea-container">
            <div></div>
            <textarea
              id="symmetricTestInputDecrypted"
              rows={1}
              className="text"
              readOnly={true}
              placeholder={this.props.common.testInputDecryptedPlaceholder}
            ></textarea>
          </div>
        </form>
      </div>
    );
  }
}

export default Symmetric;
