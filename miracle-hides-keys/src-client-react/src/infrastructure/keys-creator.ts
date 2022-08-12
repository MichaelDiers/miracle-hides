import { CommonTranslation } from '../components/Translations';

const createKeys = ({
  body,
  setData,
  setIsProcessing,
  translationsCommon,
 } : {
  body: object,
  setData: (response: object) => void,
  setIsProcessing: (isProcessing: boolean) => void,
  translationsCommon: CommonTranslation,
}) : void => {
  setIsProcessing(true);

  fetch(
    '/keys',
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: [['Content-Type', 'application/json']],
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
          testInput,
        } = json;

        setData({
          errorMessage: '',
          testInput,
          privateKey,
          publicKey,
          encrypted,
          decrypted,
        });
      });
    } else {
      setData({
        errorMessage: translationsCommon.errorMessage,
        testInput: translationsCommon.testInput,
        privateKey: '',
        publicKey: '',
        encrypted: '',
        decrypted: '',
      });
    }

    setIsProcessing(false);
  });
}

export default createKeys;
