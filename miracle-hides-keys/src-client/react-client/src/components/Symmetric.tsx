import { ChangeEvent, Component, FormEvent } from 'react';
import RadioButtons from './shared/RadioButtons';
import ReadOnlyTextarea from './shared/ReadOnlyTextarea';
import { CommonTranslation, SymmetricTranslation } from './Translations';

const ValidationData = {
  hmacMinSize: 8,
  hmaxMaxSize: 999999,
  hmacDefaultSize: 1024,
};

interface CreateKeys {
  aesKeySize: string;
  hmacKeySize: string;
  type: string;
}

interface SymmetricPropertiesData {
  errorMessage: string;
  testInput: string;
  privateKey: string;
  encrypted: string;
  decrypted: string;
}

interface SymmetricProperties {
  common: CommonTranslation;
  translation: SymmetricTranslation;
  isProcessing: boolean;
  data: SymmetricPropertiesData;
  createKeys: (request: CreateKeys) => void;
}

interface SymmetricState {
  aesKeySize: string;
  hmacKeySize: string;
  type: string;
}

const AesKeySizes = [ '128', '192', '256' ];

enum Types {
  HMAC = 'HMAC',
  AES = 'AES',
}

class Symmetric extends Component<SymmetricProperties, SymmetricState> {
  constructor(props: SymmetricProperties) {
    super(props);
    this.state = {
      aesKeySize: AesKeySizes[0],
      hmacKeySize: `${ValidationData.hmacDefaultSize}`,
      type: Types.HMAC,
    };

    this.aesKeySizeChange = this.aesKeySizeChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.hmacKeySizeChange = this.hmacKeySizeChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.isProcessing && !this.props.data.privateKey) {
      this.callCreateKeys();
    }
  }

  render() {
    return (
      <div className="symmetric-color" id="symmetricPage">
        <h1>{this.props.translation.headline}</h1>
        <div id="symmetricErrorMessage"></div>
        <form
          id="generateForm"
          className="grid-form"
          action="/keys"
          method="post"
          onSubmit={this.formSubmit}
        >
          <RadioButtons
            checkedValue={this.state.type}
            label={this.props.common.algorithm}
            name='type'
            onChange={this.handleTypeChange}
            radioButtons={[
              { label: this.props.common.algorithmAesShort, value: Types.AES },
              { label: this.props.common.algorithmHmacShort, value: Types.HMAC }
            ]}
          ></RadioButtons>
          <RadioButtons
            checkedValue={this.state.aesKeySize}
            display={this.state.type === Types.AES}
            label={this.props.common.keySize}
            name='aesKeySize'
            onChange={this.aesKeySizeChange}
            radioButtons={
              AesKeySizes.map((value) => {
                return { label: this.props.common[`keySize${value}`], value }
              })
            }
          ></RadioButtons>
          {
            this.state.type !== Types.HMAC ? '' : 
              <>
                <label htmlFor="hmacKeySize">{this.props.common.keySize}</label>
                <input
                  id="hmacKeySize"            
                  name="hmacKeySize"
                  value={this.state.hmacKeySize}
                  min={ValidationData.hmacMinSize}
                  max={ValidationData.hmaxMaxSize}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="text text-center"
                  type="text"
                  onChange={this.hmacKeySizeChange}
                ></input>
              </>
            }
          <input
            id="symmetricSubmit"
            value={this.props.common.submitGenerateKeys}
            className="submit col-2"
            type="submit"
          ></input>
          <ReadOnlyTextarea
            label={this.props.common.privateKey}
            name='symmetricPrivateKey'
            placeholder={this.props.common.noKeyGenerated}
            rows={3}
            value={this.props.data.privateKey}            
          ></ReadOnlyTextarea>
          <ReadOnlyTextarea
            label={this.props.common.testInput}
            name='testInput'
            placeholder={this.props.common.testInputPlaceholder}
            rows={1}
            value={this.props.data.testInput}            
          ></ReadOnlyTextarea>
          <ReadOnlyTextarea
            label={this.props.common.testInputEncrypted}
            name='symmetricTestInputEncrypted'
            placeholder={this.props.common.testInputEncryptedPlaceholder}
            rows={1}
            value={this.props.data.encrypted}            
          ></ReadOnlyTextarea>
          <ReadOnlyTextarea
            label={this.props.common.testInputDecrypted}
            name='symmetricTestInputDecrypted'
            placeholder={this.props.common.testInputDecryptedPlaceholder}
            rows={1}
            value={this.props.data.decrypted}            
          ></ReadOnlyTextarea>
        </form>
      </div>
    );
  }

  private aesKeySizeChange(event: ChangeEvent<HTMLInputElement>) {
    const aesKeySize = event.target.value;
    this.callCreateKeys({ aesKeySize });
    this.setState(() => { return { aesKeySize }; });
  }

  private formSubmit(event: FormEvent) {
    event.preventDefault();
    this.callCreateKeys();
  }

  private hmacKeySizeChange(event: ChangeEvent<HTMLInputElement>) {
    const hmacKeySize = event.target.value;
    try {
      const value  = parseInt(hmacKeySize, 10);
      if (value > ValidationData.hmacMinSize && value < ValidationData.hmaxMaxSize + 1) {
        this.callCreateKeys({ hmacKeySize });
        this.setState(() => { return { hmacKeySize }; });
      }
    } catch {
      // no op
    }    
  }

  private callCreateKeys({
    aesKeySize = this.state.aesKeySize,
    hmacKeySize = this.state.hmacKeySize,
    type = this.state.type,
  } : {
    aesKeySize?: string,
    hmacKeySize?: string,
    type?: string,
  } = {}) {
    if (this.props.isProcessing) {
      return;
    }

    this.props.createKeys({
      aesKeySize,
      hmacKeySize,
      type,
    });
  }

  private handleTypeChange(event: ChangeEvent<HTMLInputElement>) {
    const type = event.target.value;
    this.callCreateKeys({ type });
    this.setState(() => { return { type }; });
  }
}

export default Symmetric;
