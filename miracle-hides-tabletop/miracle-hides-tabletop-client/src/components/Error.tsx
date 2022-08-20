export default function Error({
  hasError,
  error,
}: {
  hasError: boolean,
  error?: string,
}) {
  if (!hasError) {
    return (<></>);
  }

  return (
    <span>{error}</span>
  );
}
