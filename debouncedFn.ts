const debounce = (fn: Function, time) => {
  let timer: any = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, time);
  };
};

const throttle = (fn: Function, time) => {
  let timer: any = null;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, time);
    }
  };
};

const debouncedFn = debounce((value) => {
  console.log('搜索:', value);
}, 300);

debouncedFn('a');
debouncedFn('ab');
debouncedFn('abc');
