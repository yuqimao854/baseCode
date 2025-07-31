// 原始函数
function add(a, b, c) {
  return a + b + c;
}

// 柯里化
const curriedAdd = curry(add);

// 使用方式
console.log(curriedAdd(1, 2, 3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3));

// 检查参数数量是否足够

// 参数足够，直接执行原函数

// 参数不够，返回新函数等待更多参数

// 递归调用，合并参数
function curry(fn: Function) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...moreArgs) {
        return curried.apply(this, [...args, ...moreArgs]);
      };
    }
  };
}
