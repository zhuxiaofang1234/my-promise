/**
 Created by zxf on 2021/9/6
 */
function Promise(executor){
    // 初始化state为等待态
    this.state = 'pending';
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;

    // 存放 fn1 的回调
    this.fn1Callbacks = [];

    // 存放 fn2 的回调
    this.fn2Callbacks = [];

    let resolve = value => {
        // state改变,resolve调用就会失败
        if (this.state === 'pending') {
            // resolve调用后，state转化为成功态
            this.state = 'fulfilled';
            // 储存成功的值
            this.value = value;
        }
    };
    let reject = reason => {
        // state改变,reject调用就会失败
        if (this.state === 'pending') {
            // reject调用后，state转化为失败态
            this.state = 'rejected';
            // 储存失败的原因
            this.reason = reason;
        }
    };
    // 如果executor执行报错，直接执行reject
    try{
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

//实现then方法---then方法接受两个参数，fn1,fn2分别为Promsie成功或失败后的回调

Promise.prototype.then = function(fn1,fn2){
    var self = this
    var promise2

    //首先对入参fn1,fn2做判断
    fn1 = typeof fn1 ==='function' ? fn1 : function(v) {}

    fn2 = typeof fn2 === 'function' ? fn2 : function(r) {}

    //如果 promise 状态是 resolved，需要执行 fn1
    if(self.status ==='resolved'){
        return promise2 = new Promise(function(resolve,reject){
            try{
                var x = fn1 =(self.value)
            }catch(e){
                resolve(e)
            }
        })
    }
    //如果 promise 状态是 rejected， 需要执行fn2
    if(self.status ==='rejected'){
        return promise2 = new Promise(function(resolve,reject){
            try{
                return promise2 = new Promise(function(resolve,reject){
                    try{
                        var x = fn2=(self.reason)
                    }catch(e){
                        reject(e)
                    }
                })

            }catch(e){

            }
        })
    }

    //如果 promise 状态是 pending， 我们并不能确定调用 fn1 还是 fn2 ，
    // 只能先把方法都保存在 fn1Callback, fn2Callback 数组中。
    // 等到Promise的状态确定后再处理。
    if (self.status === 'pending') {
        return promise2 = new Promise(function(resolve, reject) {
            this.fn1Callbacks.push(function(value){
                try{
                    var x = fn1(self.value);
                    resolve(x)
                }catch(e){
                    reject(e)
                }
            })
            this.fn2Callbacks.push(function(value){
                try{
                    var x = fn2(self.reason);
                    reject(x)
                }catch(e){
                    reject(e)
                }
            })
        })
    }
}






