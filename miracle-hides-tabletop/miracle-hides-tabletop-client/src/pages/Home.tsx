import { Link } from 'react-router-dom';

export default function Home() {
    return (
      <main>
        <h1>One dice to rule them all!</h1>
        <Link to='/house-rules'>
          House Rules
        </Link>
      </main>
    );
}
