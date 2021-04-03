import ColTitle from "../ColTitle";

function AdminWallet({ children }) {
  return (
    <section>
      <div>
        <ColTitle title="Admin"></ColTitle>
        {children}
      </div>
    </section>
  );
}

export default AdminWallet;
