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
  apiData: dataType,
  createContent: (input: any) => JSX.Element,
}) {
  const {
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized, 
  } = apiData;

  let content;
  if (isLoading || isFetching || isUninitialized) {
    content = <Loader isLoading={true}/>;
  } else if (isError || !isSuccess) {
    content = <span>FATAL</span>;
  } else {
    content = createContent(data);
  }

  return (
    content
  );
}