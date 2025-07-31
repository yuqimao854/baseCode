// 1. Promise 手写实现
function myPromise(executor) {
  // 实现 Promise 的基本功能
  // 1. 初始化状态

  this.state = 'pending';
  this.value = undefined;
  this.reason = undefined;

  // 2. 存储回调函数

  this.successCallback = [];
  this.rejectedCallback = [];

  // 3. 定义 resolve 和 reject 函数
  const resolve = (value) => {
    // 1. 检查状态，只能改变一次
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.value = value;
      // 2. 执行所有成功回调
      this.successCallback.forEach((callback) => callback(value));
    }
  };

  const reject = (reason) => {
    // 1. 检查状态，只能改变一次
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.reason = reason;
      // 2. 执行所有失败回调
      this.rejectedCallback.forEach((callback) => callback(reason));
    }
  };

  // 4. 执行 executor
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  // 1. 参数处理（可选参数）
  onFulfilled =
    typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (reason) => {
          throw reason;
        };

  // 2. 返回新的 Promise
  const promise2 = new myPromise((resolve, reject) => {
    // 根据当前状态处理
    if (this.state === 'fulfilled') {
      setTimeout(() => {
        try {
          const x = onFulfilled(this.value);
          resolve(x);
        } catch (error) {
          reject(error);
        }
      }, 0);
    } else if (this.state === 'rejected') {
      setTimeout(() => {
        try {
          const x = onRejected(this.value);
          resolve(x);
        } catch (error) {
          reject(error);
        }
      }, 0);
    } else {
      this.successCallback.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      });

      this.rejectedCallback.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
  });

  return promise2;
};

// 2. async/await 原理

// async/await 底层使用 Generator 函数实现
// 模拟 async/await 的实现
// 1. 创建 Generator 对象
// 2. 返回 Promise
// 3. 定义执行函数
// 4. 执行 Generator 的下一步
// 5. 捕获错误
// 6. 获取执行结果
// 7. Generator 执行完成
// 8. Generator 未完成，继续执行
// 9. 开始执行
// 成功回调：继续下一步
// 失败回调：抛出错误
function myAsync(generatorFunc) {
  return function (...args) {
    const generator = generatorFunc.apply(this, args);
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let result;
        try {
          result = generator[key](arg);
        } catch (error) {
          return reject(error);
        }

        const { value, done } = result;

        if (done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            (value) => step('next', value),
            (error) => step('throw', error)
          );
        }
      }
      step('next', undefined);
    });
  };
}
function myAwait(promise) {
  return promise;
}

const test2 = myAsync(function* () {
  try {
    const a = yield myAwait(Promise.resolve(1));
    const b = yield myAwait(Promise.resolve(3));
    // const b = yield myAwait(Promise.reject(new Error('测试错误')));
    return a + b;
  } catch (error) {
    console.log('捕获错误:', error.message);
    return 0;
  }
});

test2().then((result) => console.log('测试2结果:', result)); // 0

// 3. 事件循环机制
// 4. 微任务和宏任务的区别
