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
  const [rsaKeySize, setRsaKeySize] = useState(RsaKeySizes[1]);  

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
    <div className="asymmetric-color" id="asymmetricPage">
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
