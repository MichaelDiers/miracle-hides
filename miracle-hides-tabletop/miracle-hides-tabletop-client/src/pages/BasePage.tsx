import Loader from '../components/Loader';

interface IApiData {
  data?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  isSuccess?: boolean;
  isUninitialized?: boolean;
}

export const ERROR_FALLBACK = 'error';

export default function BasePage({
  children,
  headline,
  apiData,
  isMain,
  error,
} : {
  children?: JSX.Element,
  headline: string,
  apiData?: IApiData|IApiData[],
  isMain: boolean,
  error?: string,
}) {
  const dataArray = !apiData ? [] : (Array.isArray(apiData) ? apiData : [apiData]);
  const showLoader = dataArray.some((data) => data.isFetching || data.isLoading);
  
  let content = (
    <>
    { showLoader ? <Loader isLoading={true}/> : null }
    { error ? <div>{error}</div> : null }
    { headline ? <h1>{headline}</h1> : null }
    { children }
    </>
  );

  return isMain ? (<main>{content}</main>) : content;
}
