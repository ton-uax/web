function Wallet({ uax, gas, address }) {
  return (
    <div class="col">
      <h2 class="title i-card">Wallet</h2>
      <div class="wallet">
        <div class="ballance">
          <div class="info">BALLANCE</div>
          <p class="uax i-uax">{uax}</p>
          <p class="gaz i-gas">{gas}</p>
        </div>
        <a href="рол">
          <div class="yadd b i-copy">Copy your address: {address}</div>
        </a>
      </div>
    </div>
  );
}

export default Wallet;
