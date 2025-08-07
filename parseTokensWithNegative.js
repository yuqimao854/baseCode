function gcd(a, b) {
  //公约数
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}

function simplifyFraction(fraction) {
  const [num, den] = fraction;

  // 处理分母为0的情况
  if (den === 0) {
    throw new Error('分母不能为零');
  }

  // 如果分子为0，返回 [0, 1]
  if (num === 0) {
    return [0, 1];
  }

  // 计算最大公约数
  const divisor = gcd(num, den);

  // 简化分数
  const simplifiedNum = num / divisor;
  const simplifiedDen = den / divisor;

  // 确保分母为正数
  if (simplifiedDen < 0) {
    return [-simplifiedNum, -simplifiedDen];
  }

  return [simplifiedNum, simplifiedDen];
}

function addFraction(f1, f2) {
  // a / b + c / d=  (a*d+b*c) / (b*d)
  const [num1, den1] = f1;
  const [num2, den2] = f2;
  const newNum = num1 * den2 + num2 * den1;
  const newDen = den1 * den2;
  return [newNum, newDen];
  /* 加法 */
}
function subtractFraction(f1, f2) {
  const [num1, den1] = f1;
  const [num2, den2] = f2;
  const newNum = num1 * den2 - num2 * den1;
  const newDen = den1 * den2;
  return [newNum, newDen];
  /* 减法 */
}
function multiplyFraction(f1, f2) {
  // a / b * c / d=  (a*c) / (b*d)
  const [num1, den1] = f1;
  const [num2, den2] = f2;
  const newNum = num1 * num2;
  const newDen = den1 * den2;
  return [newNum, newDen];
  /* 乘法 */
}
function divideFraction(f1, f2) {
  const [num1, den1] = f1;
  const [num2, den2] = f2;
  if (num2 === 0) {
    throw new Error('除数不能为零');
  }
  const newNum = num1 * den2;
  const newDen = num2 * den1;
  return [newNum, newDen];
  /* 除法 */
}

function fractionToString(fraction) {
  const [num, den] = fraction; // 解构分数
  if (den === 1) {
    return num.toString(); // 如果分母是1，只返回分子
  }
  return `${num}/${den}`; // 否则返回 "分子/分母" 格式
}
//解析

function parseExpression(expression) {
  const tokens = []; // 存储解析后的数据
  let i = 0;
  while (i < expression.length) {
    // 遍历整个字符串
    const char = expression[i];
    // 跳过空格
    if (char === ' ') {
      i++;
      continue;
    }
    if (char >= '0' && char <= '9') {
      let num = '';
      while (
        i < expression.length &&
        expression[i] >= '0' &&
        expression[i] <= '9'
      ) {
        num += expression[i];
        i++;
      }
      tokens.push([parseInt(num), 1]);
      continue;
    }

    if (
      char === '+' ||
      char === '-' ||
      char === '*' ||
      char === '/' ||
      char === '(' ||
      char === ')'
    ) {
      tokens.push(char); // 直接添加运算符或括号
      i++;
      continue;
    }
    //
    i++;
  }
  return tokens;
}

// 第八步：处理括号内的表达式

function findInnermostBrackets(tokens) {
  // 从右往左找第一个 '('
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (tokens[i] === '(') {
      // 找到左括号，再找对应的右括号
      for (let j = i + 1; j < tokens.length; j++) {
        if (tokens[j] === ')') {
          return { start: i, end: j }; // 返回括号的位置
        }
      }
    }
  }
  return null; // 没有找到括号
}

function evaluateTokens(tokens) {
  // 先处理乘除
  const processed = [];
  for (let i = 0; i < tokens.length; i++) {
    // 遇到乘除运算符
    if (tokens[i] === '*' || tokens[i] === '/') {
      // 取出前一个数字
      const prev = processed.pop();
      const next = tokens[i + 1]; //一定是数组
      if (tokens[i] === '*') {
        processed.push(multiplyFraction(prev, next));
      } else {
        processed.push(divideFraction(prev, next));
      }
      i++;
      // 取出后一个数字
    } else {
      processed.push(tokens[i]);
    }
  }
  // 再处理加减
  let result = processed[0]; // 第一个数字
  for (let i = 1; i < processed.length; i += 2) {
    const operator = processed[i]; // 运算符
    const nextNumber = processed[i + 1]; // 下一个数字

    if (operator === '+') {
      result = addFraction(result, nextNumber);
    } else if (operator === '-') {
      result = subtractFraction(result, nextNumber);
    }
  }

  return result;
}

function evaluateWithBrackets(tokens) {
  // 递归处理，直到没有括号为止
  const bracketPos = findInnermostBrackets(tokens);

  if (!bracketPos) {
    // 没有括号，直接计算
    return evaluateTokens(tokens);
  }

  // 处理括号，然后递归处理剩余的表达式
  const innerTokens = tokens.slice(bracketPos.start + 1, bracketPos.end);
  const innerResult = evaluateWithBrackets(innerTokens); // 递归

  const newTokens = [
    ...tokens.slice(0, bracketPos.start),
    innerResult,
    ...tokens.slice(bracketPos.end + 1),
  ];

  return evaluateWithBrackets(newTokens); // 递归处理剩余部分
}

function evaluateExpression(expression) {
  try {
    // 1. 解析字符串
    const tokens = parseExpression(expression);

    // 2. 处理括号和计算
    const result = evaluateWithBrackets(tokens);

    // 3. 转换为字符串
    return fractionToString(result);
  } catch (error) {
    return 'Error: ' + error.message;
  }
}
console.log(evaluateExpression('1 + 5 / 6 + (9 - 5) * (3 - 6)'));
console.log(evaluateExpression('6 + 1 / 0'));
console.log(evaluateExpression('16 / 6'));
