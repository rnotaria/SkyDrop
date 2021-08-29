import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to={`/send/`}>
        <button>Send</button>
      </Link>
      <Link to={`/send/`}>
        <button>Receive</button>
      </Link>
    </div>
  );
}

export default Home;
