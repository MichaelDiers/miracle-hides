import Error from '../components/Error';
import Loader from '../components/Loader';

interface IApiData {
  data?: any;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;
  error?: any;
}

export default function BasePage({
  headline,
  createContent,
  apiData,
  isMain,
} : {
  headline: string,
  createContent: JSX.Element|(() => JSX.Element),
  apiData: IApiData|IApiData[],
  isMain: boolean,
}) {
  let content;
  const dataArray = Array.isArray(apiData) ? apiData : [apiData];
  const showLoader = apiData && dataArray.some((data) => data.isFetching || data.isLoading || data.isUninitialized);
  if (showLoader) {
    content = (<Loader isLoading={true}/>);
  }

  const showError = apiData && dataArray.some((data) => data.isError);
  const error = showError ? dataArray.find((data) => data.error)?.error : '';
  if (showError) {
    content = (<Error hasError={true} error={error}/>)
  }

  if (!showLoader && !showError) {
    if (typeof createContent === 'function') {
      content = createContent();
    } else {
      content = createContent;
    } 
  }

  if (headline) {
    content = (<><h1>{headline}</h1>{content}</>);
  }

  if (isMain) {
    content = (<main>{content}</main>);
  }

  return content ? (content) : (<></>);
}
