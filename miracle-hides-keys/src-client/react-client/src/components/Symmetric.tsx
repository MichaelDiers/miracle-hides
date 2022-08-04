import { Component } from 'react';
import { CustomEventRaiser } from '../custom-event-handler';

class Symmetric extends Component {
  componentDidMount() {
    CustomEventRaiser.raiseShowHeader();
  }

  render() {
    return (
      <div className="symmetric-color">
        <h1 translationvalue="symmetricPage.headline.textContent">Symmetric Keys Generator</h1>
        <div id="symmetricErrorMessage"></div>
        <form id="generateForm" className="grid-form" action="/keys" method="post">
          <label htmlFor="type" translationvalue="symmetricPage.keyType.textContent">Algorithmus</label>
          <div id="type" className="grid-form-row-4">
            <input id="type_0" name="type" value="AES" checked={true} className="radio" type="radio"></input>
            <label htmlFor="type_0" translationvalue="symmetricPage.keyTypeAes.textContent">AES</label>
            <input id="type_1" name="type" value="HMAC" className="radio" type="radio"></input>
            <label htmlFor="type_1" translationvalue="symmetricPage.keyTypeHmac.textContent">HMAC</label>
          </div>
          <label htmlFor="aesKeySize" translationvalue="symmetricPage.aesKeySize.textContent">Schlüssel­länge</label>
          <div id="aesKeySize" className="grid-form-row-6">
            <input id="aesKeySize_0" name="aesKeySize" value="128" checked={true} className="radio" type="radio"></input>
            <label htmlFor="aesKeySize_0" translationvalue="symmetricPage.aesKeySize128.textContent">128</label>
            <input id="aesKeySize_1" name="aesKeySize" value="192" className="radio" type="radio"></input>
            <label htmlFor="aesKeySize_1" translationvalue="symmetricPage.aesKeySize192.textContent">192</label>
            <input id="aesKeySize_2" name="aesKeySize" value="256" className="radio" type="radio"></input>
            <label htmlFor="aesKeySize_2" translationvalue="symmetricPage.aesKeySize256.textContent">256</label>
          </div>
          <label htmlFor="hmacKeySize" translationvalue="symmetricPage.hmacKeySize.textContent" className="hidden">Schlüssel­länge</label>
          <input id="hmacKeySize" name="hmacKeySize" value="128" min="8" max="9999999999" inputMode="numeric" pattern="[0-9]*" className="text text-center hidden" type="text"></input>
          <input id="symmetricSubmit" value="submit" className="submit col-2" type="submit"></input>
          <label htmlFor="symmetricPrivateKey" translationvalue="symmetricPage.privateKey.textContent">Schlüssel</label>
          <div className="textarea-container">
            <div></div>
            <textarea id="symmetricPrivateKey" name="symmetricPrivateKey" rows={3} className="text" readOnly={true} translationvalue="symmetricPage.privateKeyPlaceholder.placeholder" placeholder="noch kein Schlüssel generiert"></textarea>
          </div>
          <label htmlFor="testInput" translationvalue="symmetricPage.testInput.textContent">Original Text</label>
          <div className="textarea-container">
            <div></div>
            <textarea id="testInput" name="testInput" rows={1} className="text" readOnly={true} translationvalue="symmetricPage.testInputPlaceholder.placeholder,commonLanguageSource.testInput.value" placeholder="Der zu verschlüsselnde Text"></textarea>
          </div>
          <label htmlFor="symmetricTestInputEncrypted" translationvalue="symmetricPage.testInputEncrypted.textContent">Verschlüsselter Text oder Signatur</label>
          <div className="textarea-container">
            <div></div>
            <textarea id="symmetricTestInputEncrypted" rows={1} className="text" readOnly={true} translationvalue="symmetricPage.testInputEncryptedPlaceholder.placeholder" placeholder="Original Text in verschlüsselter Form oder Signatur"></textarea>
          </div>
          <label htmlFor="symmetricTestInputDecrypted" translationvalue="symmetricPage.testInputDecrypted.textContent">Entschlüsselter Text/Signatur ist gültig</label>
          <div className="textarea-container">
            <div></div>
            <textarea id="symmetricTestInputDecrypted" rows={1} className="text" readOnly={true} translationvalue="symmetricPage.testInputDecryptedPlaceholder.placeholder" placeholder="Entschlüsselter Text oder Gültigkeit der Signatur"></textarea>
          </div>
        </form>
      </div>
    );
  }
}

export default Symmetric;