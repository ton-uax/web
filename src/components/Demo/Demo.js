// import { useState, useContext } from 'react';

import { useUser } from "../../uax/hooks";
import Wallet from "../Wallet";


function Demo() {
  const u1 = useUser(1)
  const u2 = useUser(2)
  return (
    <section>
      <h2>User Wallet Demo</h2>
      <div className="flex">
        <div className="container">
          <Wallet label="User 1" account={u1}></Wallet>
        </div>
        <div className="container">
          <Wallet label="User 2" account={u2}></Wallet>
        </div>
      </div>
    </section>
  );
}

export default Demo;
