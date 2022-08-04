import { Component } from 'react';
import { CustomEventRaiser } from '../custom-event-handler';

class Asymmetric extends Component {
  componentDidMount() {
    CustomEventRaiser.raiseShowHeader();
  }

  render() {
    return (
      <div className="asymmetric-color">
        <h1 translationvalue="asymmetricPage.headline.textContent">Asymmetric Keys Generator</h1>
        <div id="asymmetricErrorMessage"></div>
        <form id="generateForm" className="grid-form" action="/keys" method="post">
          <label htmlFor="type" translationvalue="asymmetricPage.keyType.textContent">Algorithmus</label>
          <div id="type" className="grid-form-row-4">
            <input id="type_0" name="type" value="EC" checked={true} className="radio" type="radio"></input>
            <label htmlFor="type_0" translationvalue="asymmetricPage.keyTypeEc.textContent">EC</label>
            <input id="type_1" name="type" value="RSA" className="radio" type="radio"></input>
            <label htmlFor="type_1" translationvalue="asymmetricPage.keyTypeRsa.textContent">RSA</label>
          </div>
          <label htmlFor="rsaKeySize" translationvalue="asymmetricPage.keySize.textContent" className="hidden">Schlüssel­länge</label>
          <div id="rsaKeySize" className="grid-form-row-6 hidden">
            <input id="rsaKeySize_0" name="rsaKeySize" value="1024" className="radio" type="radio"></input>
            <label htmlFor="rsaKeySize_0" translationvalue="asymmetricPage.keySize1024.textContent">1024</label>
            <input id="rsaKeySize_1" name="rsaKeySize" value="2048" checked={true} className="radio" type="radio"></input>
            <label htmlFor="rsaKeySize_1" translationvalue="asymmetricPage.keySize2048.textContent">2048</label>
            <input id="rsaKeySize_2" name="rsaKeySize" value="4096" className="radio" type="radio"></input>
            <label htmlFor="rsaKeySize_2" translationvalue="asymmetricPage.keySize4096.textContent">4096</label>
          </div>
          <label htmlFor="ecNamedCurve" translationvalue="asymmetricPage.ecNamedCurve.textContent">Named Curve</label>
          <div id="ecNamedCurve" className="grid-form-row-2">
            <input id="ecNamedCurve_0" name="ecNamedCurve" value="sect239k1" checked={true} className="radio" type="radio"></input>
            <label htmlFor="ecNamedCurve_0" translationvalue="asymmetricPage.ecNamedCurveSect239k1.textContent">sect239k1</label>
          </div>
          <input id="asymmetricSubmit" value="submit" className="submit col-2" type="submit"></input>
          <label htmlFor="asymmetricPrivateKey" translationvalue="asymmetricPage.privateKey.textContent">Privater Schlüssel</label>
          <div className="textarea-container">
            <div></div>
            <textarea id="asymmetricPrivateKey" name="asymmetricPrivateKey" rows={15} className="text" readOnly={true} translationvalue="asymmetricPage.privateKeyPlaceholder.placeholder" placeholder="noch kein Schlüssel generiert"></textarea>
          </div>
          <label htmlFor="asymmetricPublicKey" translationvalue="asymmetricPage.publicKey.textContent">Öffentlicher Schlüssel</label>
          <div className="textarea-container">
            <div></div>
            <textarea id="asymmetricPublicKey" name="asymmetricPublicKey" rows={6} className="text" readOnly={true} translationvalue="asymmetricPage.privateKeyPlaceholder.placeholder" placeholder="noch kein Schlüssel generiert"></textarea>
          </div>
          <label htmlFor="testInput" translationvalue="asymmetricPage.testInput.textContent">Original Text</label>
          <div className="textarea-container">
            <div></div>
            <textarea id="testInput" name="testInput" rows={2} className="text" readOnly={true} translationvalue="asymmetricPage.testInputPlaceholder.placeholder,commonLanguageSource.testInput.value" placeholder="Der zu verschlüsselnde Text"></textarea>
          </div>
          <label htmlFor="testInputEncrypted" translationvalue="asymmetricPage.testInputEncrypted.textContent">Verschlüsselter Text oder Signatur</label>
          <div className="textarea-container">
            <div></div>
            <textarea id="testInputEncrypted" rows={2} className="text" readOnly={true} translationvalue="asymmetricPage.testInputEncryptedPlaceholder.placeholder" placeholder="Original Text in verschlüsselter Form oder Signatur"></textarea>
          </div>
          <label htmlFor="testInputDecrypted" translationvalue="asymmetricPage.testInputDecrypted.textContent">Entschlüsselter Text/Signatur ist gültig</label>
          <div className="textarea-container">
            <div></div>
            <textarea id="testInputDecrypted" rows={2} className="text" readOnly={true} translationvalue="asymmetricPage.testInputDecryptedPlaceholder.placeholder" placeholder="Entschlüsselter Text oder Gültigkeit der Signatur"></textarea>
          </div>
        </form>
      </div>
    );
  }
};

export default Asymmetric;
