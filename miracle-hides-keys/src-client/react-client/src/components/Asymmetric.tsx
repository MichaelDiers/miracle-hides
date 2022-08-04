import e from 'express';
import { ChangeEvent, Component, FormEvent, FormEventHandler } from 'react';
import { CustomEventRaiser } from '../infrastructure/custom-event-handler';
import { AsymmetricTranslation, CommonTranslation } from './Translations';

const enum Types {
  EC = 'EC',
  RSA = 'RSA',
}

const RsaKeySizes = [
  {
    size: '1024',
    type: 'input',
  },
  {
    size: '1024',
    type: 'label',
  },
  {
    size: '2048',
    type: 'input',
  },
  {
    size: '2048',
    type: 'label',
  },
  {
    size: '4096',
    type: 'input',
  },
  {
    size: '4096',
    type: 'label',
  },
];
  
export interface AsymmetricProperties {
  common: CommonTranslation;
  translation: AsymmetricTranslation;  
}

interface State {
  type: string;
  ecNamedCurve: string;
  rsaKeySize: string;
}

class Asymmetric extends Component<AsymmetricProperties, State> {
  constructor(props: AsymmetricProperties) {
    super(props);
    this.state = {
      ecNamedCurve: 'sect239k1',
      rsaKeySize: '2048',
      type: Types.EC
    };

    this.handleNamedCurveChange = this.handleNamedCurveChange.bind(this);
    this.handleRsaKeySizeChange = this.handleRsaKeySizeChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

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
          onSubmit={this.handleSubmitForm}
        >
          <label htmlFor="type">{this.props.common.algorithm}</label>
          <div
            id="type"
            className="grid-form-row-4"
            onChange={this.handleTypeChange}
          >
            <input
              id="type_0"
              name="type"
              value={Types.EC}
              defaultChecked={this.state.type === Types.EC}              
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="type_0">{this.props.common.algorithmEcShort}</label>
            <input
              id="type_1"
              name="type"
              value={Types.RSA}              
              defaultChecked={this.state.type === Types.RSA}              
              className="radio"
              type="radio"
            ></input>
            <label htmlFor="type_1">{this.props.common.algorithmRsaShort}</label>
          </div>
          <label htmlFor="rsaKeySize" className={this.state.type !== Types.RSA ? 'hidden' : ''}>{this.props.common.keySize}</label>
          <div
            id="rsaKeySize"
            className={this.state.type !== Types.RSA ? 'grid-form-row-6 hidden' : 'grid-form-row-6'}
            onChange={this.handleRsaKeySizeChange}
          >
            {
              RsaKeySizes.map(({ type, size }, i) => {
                if (type === 'input') {
                  return (
                    <input
                      id={`rsaKeySize_${i}`}
                      key={i}
                      name="rsaKeySize"
                      value={size}
                      defaultChecked={this.state.rsaKeySize === size}
                      className="radio"
                      type="radio"              
                    ></input>
                  );
                } else {
                  return (
                    <label htmlFor={`rsaKeySize_${i - 1}`} key={i}>{this.props.common[`keySize${size}`]}</label>
                  )
                }
              })
            }
          </div>
          <label htmlFor="ecNamedCurve" className={this.state.type !== Types.EC ? 'hidden' : ''}>{this.props.common.namedCurve}</label>
          <div
            id="ecNamedCurve"
            className={this.state.type !== Types.EC ? 'grid-form-row-2 hidden' : 'grid-form-row-2'}
            onChange={this.handleNamedCurveChange}
          >
            <input
              id="ecNamedCurve_0"
              name="ecNamedCurve"
              value="sect239k1"
              defaultChecked={this.state.ecNamedCurve === 'sect239k1'}
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

  private handleNamedCurveChange(event: ChangeEvent<HTMLInputElement>) : void {
    this.setState({ ecNamedCurve: event.target.value });
  }

  private handleRsaKeySizeChange(event: ChangeEvent<HTMLInputElement>) : void {
    this.setState({ rsaKeySize: event.target.value });
  }

  private handleSubmitForm(event: FormEvent<HTMLFormElement>) : void {
    event.preventDefault();
    console.log(this.state);
  }

  private handleTypeChange(event: ChangeEvent<HTMLInputElement>) : void {
    this.setState({ type: event.target.value });
  }
};

export default Asymmetric;
