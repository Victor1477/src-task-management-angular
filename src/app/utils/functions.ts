//When times is equals to 0 it will retry until it resolves.
export function retry(fn, times, delay, payload, payload2?) {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      fn(payload, payload2)
        .then(resolve)
        .catch((e) => {
          times--;
          if (times == 0) {
            reject(e);
          } else {
            setTimeout(() => {
              attempt();
            }, delay);
          }
        });
    };
    attempt();
  });
}
