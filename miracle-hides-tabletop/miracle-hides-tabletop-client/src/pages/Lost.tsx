import BasePage from './BasePage';

export default function Lost() {
  return (
    <BasePage
      headline='Your are lost!'
      isMain={true}      
    >
      <p>Oh nooooo!</p>
    </BasePage>
  );
}