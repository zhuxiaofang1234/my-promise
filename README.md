# my-promise

## 1.准备
###  1.1. 函数对象与实例对象
    1. 函数对象: 将函数作为对象使用时, 简称为函数对象
    2. 实例对象: new 函数产生的对象, 简称为对象
###  1.1.回调函数的分类
    1. 同步回调: 
    理解: 立即执行, 完全执行完了才结束, 不会放入回调队列中
    例子: 数组遍历相关的回调函数 / Promise的excutor函数
    
    2. 异步回调: 
    理解: 不会立即执行, 会放入回调队列中将来执行
    例子: 定时器回调 / ajax回调 / Promise的成功|失败的回调
###  1.3. JS中的Error
    1. 错误的类型
    Error: 所有错误的父类型
    ReferenceError: 引用的变量不存在
    TypeError: 数据类型不正确的错误
    RangeError: 数据值不在其所允许的范围内
    SyntaxError: 语法错误
    2. 错误处理
    捕获错误: try ... catch
    抛出错误: throw error
    3. 错误对象
    message属性: 错误相关信息
    stack属性: 函数调用栈记录信息
## 2.promise的理解和使用
### 2.1. Promise是什么?
    1.抽象表达: 
          Promise是JS中进行异步编程的新的解决方案(旧的是谁?)
    
    2.具体表达:
        从语法上来说: Promise是一个构造函数  
        从功能上来说: promise对象用来封装一个异步操作并可以获取其结果
    
    3. promise的状态改变(只有2种, 只能改变一次)
        pending变为resolved
        pending变为rejected

### 2.2 promise流程图





  
  
