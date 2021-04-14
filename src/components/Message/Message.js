import s from './Message.module.css';

function Message({ show }) {
  return (
    show && (
      <div className={s.message}>
        <span className="i-alert">
          Request for mint: <b>John Smith</b>
        </span>
        <span className="i-link">044...EE2</span>
        <span className="i-uax">300</span>
        <span className="i-gas">20</span>
        <span className="i-cycle"> Expired: 08:51:02</span>
        <span className="i-eye">Signed: 1/3</span>
        <div className={s.button}>APPROVE</div>
        <div className={s.button}>REJECT</div>
      </div>
    )
  );
}

export default Message;
