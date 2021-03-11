function Aside() {
  return (
    <aside>
      <div class="stats">
        <div class="col">
          <div class="title">Statistics</div>
          <div class="row">
            <p>UAXTotal</p>
            <span>8,000,000</span>
          </div>
          <div class="row">
            <p>UserTotal</p>
            <span>537</span>
          </div>
          <div class="row">
            <p>BaseFee</p>
            <span>12</span>
          </div>
          <div class="row">
            <p>FeeTotal</p>
            <span>23,889</span>
          </div>
          <div class="row">
            <p>GiverTotal</p>
            <span>2,000,000</span>
          </div>
          <div class="row">
            <p>Transactions</p>
            <span>4,221</span>
          </div>
        </div>
        <div class="col">
          <div class="title">Admin</div>
          <a class="i-bot" href="#" onClick="makeWallets();">
            Create 5 wallets
          </a>
          <a class="i-bot" href="#">
            Speed up
          </a>
          <a class="i-bot" href="#">
            Speed down
          </a>
          <a class="i-bot" href="#">
            Clear desk
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
