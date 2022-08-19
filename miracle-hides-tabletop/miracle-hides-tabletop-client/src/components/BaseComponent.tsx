import Loader from './Loader';

interface dataType {
  data?: any;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;
}

export default function BaseComponent({
  apiData,
  createContent,
} : {
  apiData: dataType|dataType[],
  createContent: (input: any|any[]) => JSX.Element,
}) {
  let values = Array.isArray(apiData) ? apiData : [apiData];
  const isLoading = values.some(({ isLoading, isFetching, isUninitialized }) => isLoading || isFetching || isUninitialized);
  if (isLoading) {
    return (<Loader isLoading={true}/>);
  }

  const isError = values.some(({ isError, isSuccess }) => isError || !isSuccess);
  if (isError) {
    return (<span>FATAL</span>);
  }

  return (createContent(values.length === 1 ? values[0].data : values.map(({ data }) => data)));
}