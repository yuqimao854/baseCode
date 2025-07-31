//处理基础数据类型
//处理循环引用
//特殊类型处理
//普通对象处理

const deepClone = (obj, map = new WeakMap()) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (map.has(obj)) {
    return map.get(obj);
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof ArrayBuffer) {
    return obj.slice(0);
  }

  if (obj instanceof Map) {
    const newMap = new Map();
    map.set(obj, newMap);
    obj.forEach((value, key) => {
      newMap.set(deepClone(key, map), deepClone(value, map));
    });
    return newMap;
  }

  if (obj instanceof Set) {
    const newSet = new Set();
    map.set(obj, newSet);
    obj.forEach((value) => {
      newSet.add(deepClone(value, map));
    });
    return newSet;
  }

  const newObj = Array.isArray(obj) ? [] : {};
  map.set(obj, newObj);

  Object.entries(obj).forEach(([key, value]) => {
    newObj[key] = deepClone(value, map);
  });
  return newObj;
};
