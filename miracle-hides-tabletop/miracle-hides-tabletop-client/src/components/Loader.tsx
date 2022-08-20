export default function Loader({ isLoading } : { isLoading: boolean }) {
  if (isLoading) {
    return (<div className={`loader ${isLoading ? ' show' : ''}`} />); 
  }

  return (<></>);
}
