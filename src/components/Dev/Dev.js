import { useCallback } from 'react';
import {
  useAsync,
  useInterval,
  useMap,
  useAsyncRetry,
  useEvent,
} from 'react-use';
import { readPublic } from '../../uax';
import { useUAXSystem, useUAXSystemMap } from '../../uax/hooks.js';

function Dev() {
  const UAX = useUAXSystem();
  const SystemMap = useUAXSystemMap();

  const [messages, { set, reset }] = useMap({});
  const onKeyDown = useCallback(({ key }) => {
    if (key === 'c') reset();
  }, []);
  useEvent('keydown', onKeyDown);

  const state = useAsyncRetry(async () => {
    let e = await readPublic(UAX.Medium, '_currentEvent');
    let proposals = await readPublic(UAX.Medium, '_proposals');
    let proposal = proposals[e.id];
    return { e, proposal };
  }, [messages.length]);

  useInterval(() => {
    if (!state.loading) state.retry();
  }, 1000);

  useAsync(async () => {
    await UAX.Medium.subscribeMessages(
      'id,created_at,boc,src,dst',
      async msg => {
        const decoded = await UAX.Medium.decodeMessage(msg.boc);

        const srcName = SystemMap[msg.src] || msg.src.slice(5);
        const dstName = SystemMap[msg.dst] || msg.dst.slice(5);

        set(msg.id, {
          t: new Date(msg.created_at * 1000).toLocaleTimeString(),
          src: srcName,
          dst: dstName,
          name: decoded.name,
          params: decoded.value,
        });
        // console.log(message)
      },
    );
  }, []);

  function renderObj(o) {
    let isObj = typeof o == 'object';
    return isObj
      ? Object.entries(o).map(([k, v]) => (
          <div>
            <i>{k}</i>:
            <span>
              {[Object, Array].includes(typeof v) ? JSON.stringify(v) : v}
            </span>
          </div>
        ))
      : o;
  }

  return (
    <section>
      <h2>Debugging Reserve Contract</h2>
      <div className="flex">
        <div className="container">
          <h3>State</h3>
          <br />
          <br />
          <div>
            <b>Time</b> {new Date().toLocaleTimeString()} (
            {Math.floor(new Date().getTime() / 1000)})
          </div>
          {state.value && (
            <>
              <div>
                <b>Current Proposal Header</b>
                {renderObj(state.value.e)}
              </div>
              {state.value.e.id > 0 && (
                <div>
                  <b>Proposal #{state.value.e.id}</b>
                  {renderObj(state.value.proposal)}
                </div>
              )}
            </>
          )}
        </div>

        <div className="container">
          <h3>Messages (aka calls)</h3>

          <small>Press 'c' to clear</small>
          <br />
          <br />
          {Object.entries(messages).map(([id, msg]) => {
            return (
              <div>
                <span>{`(${id.slice(0, 5)}) [${msg.t}] `}</span>
                <span>{`${msg.src} -> ${msg.dst}`}</span>
                <br />
                <b>{msg.name}</b>
                {Object.entries(msg.params).map(([k, v]) => {
                  return (
                    <>
                      {' '}
                      <i>{k}</i>: <span>{renderObj(v)}</span>
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Dev;
