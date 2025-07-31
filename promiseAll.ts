// . Promise.all 的核心原理
// Promise.all 的核心思想是：
// 输入：一个 Promise 数组
// 输出：一个新的 Promise
// 成功条件：所有 Promise 都成功完成
// 失败条件：任何一个 Promise 失败

const promiseAll = (promises: Array<Promise<any>>) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject('Type error');
    }
    if (!promises.length) {
      return resolve([]);
    }
    let count = 0;
    const result: any[] = new Array(promises.length);

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          result[index] = res;
          count++;

          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

//单个超时

const timeoutPromise = (promise, timeout = 60000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject('timeout');
      }, timeout);
    }),
  ]);
};

const promiseAllWithSingleTimeout = (
  promises: Array<Promise<any>>,
  timeout = 600000
) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject('Type error');
    }
    if (!promises.length) {
      return resolve([]);
    }
    let count = 0;
    const result: any[] = new Array(promises.length);
    const promiseTimer = promises.map((item) => timeoutPromise(item, timeout));

    promiseTimer.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          result[index] = res;
          count++;

          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const promiseAllWithAllTimeout = (
  promises: Array<Promise<any>>,
  timeout = 6000
) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject('Type error');
    }
    if (!promises.length) {
      return resolve([]);
    }
    let count = 0;
    const result: any[] = new Array(promises.length);

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          result[index] = res;
          count++;

          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });

    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        reject('timeout');
      }, timeout);
    });
  });
};

Promise.allSettled;
