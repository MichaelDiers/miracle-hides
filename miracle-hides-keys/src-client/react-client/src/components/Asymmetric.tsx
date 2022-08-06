import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import RadioButtons from './shared/RadioButtons';
import ReadOnlyTextarea from './shared/ReadOnlyTextarea';
import { AsymmetricTranslation, CommonTranslation } from './Translations';

const enum Types {
  EC = 'EC',
  RSA = 'RSA',
}

const RsaKeySizes = [ '1024', '2048', '4096' ];

const EcNamedCurves = ['sect239k1'];

interface CreateKeys {
  type: string;
  rsaKeySize: string;
  ecNamedCurve: string;
}

interface AsymmetricPropsData {
  errorMessage: string;
  testInput: string;
  privateKey: string;
  publicKey: string;
  encrypted: string;
  decrypted: string;
}

interface AsymmetricProps {
  common: CommonTranslation;
  translation: AsymmetricTranslation;
  data: AsymmetricPropsData;
  createKeys: (request: CreateKeys) => void;
  isProcessing: boolean;
}

const Asymmetric = (props: AsymmetricProps) => {  
  const [type, setType] = useState(Types.EC);
  const [ecNamedCurve, setEcNamedCurve] = useState(EcNamedCurves[0])
  const [rsaKeySize, setRsaKeySize] = useState(RsaKeySizes[0]);  

  const callCreateKeys = ({
    ecNamedCurveValue = ecNamedCurve,
    rsaKeySizeValue = rsaKeySize,
    typeValue = type,
  } : {
    ecNamedCurveValue?: string,
    rsaKeySizeValue?: string,
    typeValue?: string,
  } = {}) => {
    if (!props.isProcessing) {
      props.createKeys({
        ecNamedCurve: ecNamedCurveValue,
        rsaKeySize: rsaKeySizeValue,
        type: typeValue,
      });
    }
  }

  const handleAlgorithmTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const typeValue = event.target.value;
    callCreateKeys({ typeValue });
    setType(typeValue as Types);
  }

  const handleEcNamedCurveChange = (event: ChangeEvent<HTMLInputElement>) => {
    const ecNamedCurveValue = event.target.value;
    callCreateKeys({ ecNamedCurveValue });
    setEcNamedCurve(ecNamedCurve);
  }

  const handleRsaKeySizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rsaKeySizeValue = event.target.value;
    callCreateKeys({ rsaKeySizeValue });
    setRsaKeySize(rsaKeySizeValue);
  }

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    callCreateKeys();
  }

  useEffect(() => {
    callCreateKeys();
  }, []);

  return (
    <div className="asymmetric-color">
      <h1>{props.translation.headline}</h1>
      <div id="asymmetricErrorMessage">{props.data.errorMessage}</div>
      <form
        id="generateForm"
        className="grid-form"
        action="/keys"
        method="post"
        onSubmit={handleSubmitForm}
      >
        <RadioButtons
          checkedValue={type}
          label={props.common.algorithm}
          name='type'
          onChange={handleAlgorithmTypeChange}
          radioButtons={[
            { label: props.common.algorithmEcShort, value: Types.EC },
            { label: props.common.algorithmRsaShort, value: Types.RSA },
          ]}
        />
        <RadioButtons
          checkedValue={rsaKeySize}
          display={type === Types.RSA}
          label={props.common.keySize}
          name='rsaKeySize'
          onChange={handleRsaKeySizeChange}
          radioButtons={RsaKeySizes.map((value) => {
            return { label: props.common[`keySize${value}`], value };
          })}
        />
        <RadioButtons
          checkedValue={ecNamedCurve}
          display={type === Types.EC}
          label={props.common.namedCurve}
          name='ecNamedCurve'
          onChange={handleEcNamedCurveChange}
          radioButtons={EcNamedCurves.map((value) => {
            return { label: props.common[`namedCurve${value[0].toUpperCase()}${value.slice(1)}`], value }
          })}          
        />
        <input          
          id="asymmetricSubmit"
          value={props.common.submitGenerateKeys}
          className="submit col-2"
          type="submit"
        ></input>
        <ReadOnlyTextarea
          label={props.common.privateKey}
          name='asymmetricPrivateKey'
          placeholder={props.common.noKeyGenerated}
          rows={15}
          value={props.data.privateKey}
        ></ReadOnlyTextarea>
        <ReadOnlyTextarea
          label={props.common.publicKey}
          name='asymmetricPublicKey'
          placeholder={props.common.noKeyGenerated}
          rows={6}
          value={props.data.publicKey}
        ></ReadOnlyTextarea>
        <ReadOnlyTextarea
          label={props.common.testInput}
          name='testInput'
          placeholder={props.common.testInputPlaceholder}
          rows={2}
          value={props.data.testInput}
        ></ReadOnlyTextarea>
        <ReadOnlyTextarea
          label={props.common.testInputEncrypted}
          name='testInputEncrypted'
          placeholder={props.common.testInputEncryptedPlaceholder}
          rows={2}
          value={props.data.encrypted}
        ></ReadOnlyTextarea>          
        <ReadOnlyTextarea
          label={props.common.testInputDecrypted}
          name='testInputDecrypted'
          placeholder={props.common.testInputDecryptedPlaceholder}
          rows={2}
          value={props.data.decrypted}
        ></ReadOnlyTextarea>
      </form>
    </div>
  );  
}

export default Asymmetric;

/*
import { ChangeEvent, Component, FormEvent } from 'react';
import { CustomEventRaiser } from '../infrastructure/custom-event-handler';
import RadioButtons from './shared/RadioButtons';
import ReadOnlyTextarea from './shared/ReadOnlyTextarea';
import { AsymmetricTranslation, CommonTranslation } from './Translations';

const enum Types {
  EC = 'EC',
  RSA = 'RSA',
}

const RsaKeySizes = [ '1024', '2048', '4096' ];
  
export interface AsymmetricProperties {
  backgroundProcessActive: boolean;
  common: CommonTranslation;
  translation: AsymmetricTranslation;  
}

interface State {
  type: string;
  ecNamedCurve: string;
  rsaKeySize: string;
  privateKey: string;
  publicKey: string;
  encrypted: string;
  decrypted: string;
  errorMessage: string;
}

class Asymmetric extends Component<AsymmetricProperties, State> {
  constructor(props: AsymmetricProperties) {
    super(props);
    this.state = {
      ecNamedCurve: 'sect239k1',
      rsaKeySize: '2048',
      type: Types.EC,
      privateKey: '',
      publicKey: '',
      encrypted: '',
      decrypted: '',
      errorMessage: '',
    };

    this.handleNamedCurveChange = this.handleNamedCurveChange.bind(this);
    this.handleRsaKeySizeChange = this.handleRsaKeySizeChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  componentDidMount() {
    CustomEventRaiser.raiseShowHeader();
    if (!this.state.privateKey) {
      this.createKeys();
    }
  }

  componentDidUpdate(prevProps: AsymmetricProperties, prevState: State) {
    if (prevState.ecNamedCurve !== this.state.ecNamedCurve
      || prevState.rsaKeySize !== this.state.rsaKeySize
      || prevState.type !== this.state.type
    ) {
      this.createKeys();
    }    
  }

  render() {
    return (
      <div className="asymmetric-color">
        <h1>{this.props.translation.headline}</h1>
        <div id="asymmetricErrorMessage">{this.state.errorMessage}</div>
        <form
          id="generateForm"
          className="grid-form"
          action="/keys"
          method="post"
          onSubmit={this.handleSubmitForm}
        >
          <RadioButtons
            checkedValue={this.state.type}
            label={this.props.common.algorithm}
            name='type'
            onChange={this.handleTypeChange}
            radioButtons={[
              { label: this.props.common.algorithmEcShort, value: Types.EC },
              { label: this.props.common.algorithmRsaShort, value: Types.RSA },
            ]}
          />
          <RadioButtons
            checkedValue={this.state.rsaKeySize}
            display={this.state.type === Types.RSA}
            label={this.props.common.keySize}
            name='rsaKeySize'
            onChange={this.handleRsaKeySizeChange}
            radioButtons={RsaKeySizes.map((value) => {
              return { label: this.props.common[`keySize${value}`], value };
            })}
          />
          <RadioButtons
            checkedValue={this.state.ecNamedCurve}
            display={this.state.type === Types.EC}
            label={this.props.common.namedCurve}
            name='ecNamedCurve'
            onChange={this.handleNamedCurveChange}
            radioButtons={[
              { label: this.props.common.namedCurve, value: 'sect239k1' },
            ]}
          />
          <input          
            id="asymmetricSubmit"
            value={this.props.common.submitGenerateKeys}
            className="submit col-2"
            type="submit"
          ></input>
          <ReadOnlyTextarea
            label={this.props.common.privateKey}
            name='asymmetricPrivateKey'
            placeholder={this.props.common.noKeyGenerated}
            rows={15}
            value={this.state.privateKey}
          ></ReadOnlyTextarea>
          <ReadOnlyTextarea
            label={this.props.common.publicKey}
            name='asymmetricPublicKey'
            placeholder={this.props.common.noKeyGenerated}
            rows={6}
            value={this.state.publicKey}
          ></ReadOnlyTextarea>
          <ReadOnlyTextarea
            label={this.props.common.testInput}
            name='testInput'
            placeholder={this.props.common.testInputPlaceholder}
            rows={2}
            value={this.props.common.testInputValue}
          ></ReadOnlyTextarea>
          <ReadOnlyTextarea
            label={this.props.common.testInputEncrypted}
            name='testInputEncrypted'
            placeholder={this.props.common.testInputEncryptedPlaceholder}
            rows={2}
            value={this.state.encrypted}
          ></ReadOnlyTextarea>          
          <ReadOnlyTextarea
            label={this.props.common.testInputDecrypted}
            name='testInputDecrypted'
            placeholder={this.props.common.testInputDecryptedPlaceholder}
            rows={2}
            value={this.state.decrypted}
          ></ReadOnlyTextarea>
        </form>
      </div>
    );
  }

  private createKeys() : void {
   
    CustomEventRaiser.raiseProcessStart();
    this.setState({
      privateKey: '',
      publicKey: '',
      encrypted: '',
      decrypted: '',
      errorMessage: this.props.common.errorMessage,
    });

    const body = {
      type: this.state.type,
      rsaKeySize: this.state.rsaKeySize,
      ecNamedCurve: this.state.ecNamedCurve,
      testInput: this.props.common.testInputValue,
    };

    fetch(
      'http://localhost:3001/keys',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: [['Content-Type', 'application/json']],
        mode:'cors',
      },
    ).then((response) => {
      if (response.ok) {
        response.text().then((text) => {
          const json = JSON.parse(text);
          const {
            privateKey,
            publicKey,
            encrypted,
            decrypted,
          } = json;

          this.setState({
            privateKey, 
            publicKey,
            encrypted,
            decrypted,
            errorMessage: '',
          });
        });
      } else {
        this.setState({
          errorMessage: this.props.common.errorMessage,
        });
      }

      console.log('createKeys done')
      CustomEventRaiser.raiseProcessEnd();
    });
  }

  private handleNamedCurveChange(event: ChangeEvent<HTMLInputElement>) : void {
    this.setState({ ecNamedCurve: event.target.value });
  }

  private handleRsaKeySizeChange(event: ChangeEvent<HTMLInputElement>) : void {
    this.setState({ rsaKeySize: event.target.value });
  }

  private handleSubmitForm(event: FormEvent<HTMLFormElement>) : void {
    event.preventDefault();
    this.createKeys();
  }

  private handleTypeChange(event: ChangeEvent<HTMLInputElement>) : void {
    this.setState({ type: event.target.value });
  }
};

export default Asymmetric;
*/