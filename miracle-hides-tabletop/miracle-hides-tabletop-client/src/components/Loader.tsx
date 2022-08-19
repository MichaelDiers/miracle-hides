export default function Loader({ isLoading } : { isLoading: boolean }) {
  return (
    <div className={`loader ${isLoading ? ' show' : ''}`} />
  );
}