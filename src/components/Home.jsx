import { useState } from 'react';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <p> This is your home!</p>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>Edit <code>src/App.jsx</code> and save to test HMR.</p>
    </div>
  );
}

export default Home;
