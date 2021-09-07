/*自定义Promise函数模块 */

(function (params) {
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    /**
     * Promise构造函数
     * excutor:执行器函数
     */
    function Promise(excutor) {

        //将当前promise对象保存起来
        const self = this;

        this.status = PENDING //给promise对象指定status属性，初始值pending
        this.data = undefined  //给promise对象指定一个用于存储结果数据的属性
        this.callbacks = []    //用来存储回调函数的。 每个元素的结构：{onResolved(){}, onRejected(){}}

        function resolve(value) {
            //promise状态只能改一次：如果当前状态不是pending，直接结束
            if (self.status !== PENDING) {
                return
            }

            //将状态改为resolved
            self.status = RESOLVED
            //保存value数据
            self.data = value

            //如果有待执行的callback函数，立即异步执行回调函数onResolved
            if (self.callbacks.length > 0) {
                setTimeout(() => { //放入队列中执行所有成功的回调
                    self.callbacks.forEach((callbacksObj) => {
                        callbacksObj.onResolved(value)
                    })
                })
            }
        }

        function reject(reason) {

            if (self.status !== PENDING) {
                return
            }

            //将状态改为rejected
            self.status = REJECTED;
            self.data = reason;

            //如果有待执行的callback函数，立即异步执行回调函数onRejected

            if (self.callbacks.length > 0) {

                setTimeout(() => { //放入队列中执行所有失败的回调
                    self.callbacks.forEach((callbacksObj) => {
                        callbacksObj.onRejected(reason)
                    })
                })
            }
        }

        //立即同步执行excutor
        try {
            excutor(resolve, reject)

        } catch (error) {

            reject(error)
        }

    }

    /**
     * Promsie原型对象的then()
     * 指定成功和失败的回调函数
     * 返回一个新的promise对象
     * @param {*} onResolved
     * @param {*} onRejected
     */

    Promise.prototype.then = function (onResolved, onRejected) {
        const self = this

        //返回一个新的promise对象
        /**
         * 1,如果抛出异常，return的promise就会失败，reason就是error
         * 2,如果回调函数返回的不是promise,return的promise就会成功，value就是返回的值
         * 3，如果回调函数返回的是promsie,return的promise结果就是这个promsie的结果
         */
        return new Promise((resolve, reject) => {

            if (self.status === PENDING) { //对应先执行then方法,然后才执行resolve,reject的情况。当前状态还是pending状态，将回调函数保存起来
                this.callbacks.push({
                    onResolved(value){
                        try {
                            const result = onResolved(self.data)   //因为先promise先reslove了，此时成功返回的值，已经存进data里了
    
                            if (result instanceof Promise) {// 3，如果回调函数返回的是promsie,return的promise结果就是这个promsie的结果
    
                                // result.then(value => {
                                //     resolve(value)  //当result成功时，让return的promsie也成功
                                // }, reason => {
                                //     reject(reason) //当result失败时，让return的promsie也失败
                                // })
                                result.then(resolve,reject)
    
                            } else {//2,如果回调函数返回的不是promise,return的promise就会成功，value就是返回的值
                                resolve(result)
    
                            }
                        } catch (e) {//3,如果抛出异常，return的promise就会失败，reason就是error
                            reject(e)
                        }
                    },
                    onRejected(reason){
                        try {
                            const result = onRejected(self.data)   //因为先promise先reslove了，此时成功返回的值，已经存进data里了
    
                            if (result instanceof Promise) {// 3，如果回调函数返回的是promsie,return的promise结果就是这个promsie的结果
    
                                // result.then(value => {
                                //     resolve(value)  //当result成功时，让return的promsie也成功
                                // }, reason => {
                                //     reject(reason) //当result失败时，让return的promsie也失败
                                // })
                                result.then(resolve,reject)
    
                            } else {//2,如果回调函数返回的不是promise,return的promise就会成功，value就是返回的值
                                resolve(result)
    
                            }
                        } catch (e) {//3,如果抛出异常，return的promise就会失败，reason就是error
    
                            reject(e)
                        }

                    }
                })
            } else if (self.status === RESOLVED) { //对应前面的promise的状态先改变（先resolved）再去调用then方法的情况
                //回调函数异步执行
                setTimeout(() => {
                    try {
                        const result = onResolved(self.data)   //因为先promise先reslove了，此时成功返回的值，已经存进data里了

                        if (result instanceof Promise) {// 3，如果回调函数返回的是promsie,return的promise结果就是这个promsie的结果

                            // result.then(value => {
                            //     resolve(value)  //当result成功时，让return的promsie也成功
                            // }, reason => {
                            //     reject(reason) //当result失败时，让return的promsie也失败
                            // })
                            result.then(resolve,reject)

                        } else {//2,如果回调函数返回的不是promise,return的promise就会成功，value就是返回的值
                            resolve(result)

                        }
                    } catch (e) {//3,如果抛出异常，return的promise就会失败，reason就是error

                        reject(e)
                    }

                })

            } else if (self.status === REJECTED) { //对应前面的promise的状态先改变（先rejected）再去调用then方法的情况
                //回调函数异步执行
                setTimeout(() => {
                    try {
                        const result = onRejected(self.data)   //因为先promise先reslove了，此时成功返回的值，已经存进data里了

                        if (result instanceof Promise) {// 3，如果回调函数返回的是promsie,return的promise结果就是这个promsie的结果

                            // result.then(value => {
                            //     resolve(value)  //当result成功时，让return的promsie也成功
                            // }, reason => {
                            //     reject(reason) //当result失败时，让return的promsie也失败
                            // })
                            result.then(resolve,reject)

                        } else {//2,如果回调函数返回的不是promise,return的promise就会成功，value就是返回的值
                            resolve(result)

                        }
                    } catch (e) {//3,如果抛出异常，return的promise就会失败，reason就是error

                        reject(e)
                    }

                })

            }
        })
    }

    /**
     * Promsie原型对象的catch()
     * @param {*} onResolved
     * @param {*} onRejected
     */
    Promise.prototype.catch = function (onResolved, onRejected) {

    }

    /**
     * Prpmise函数对象resolve
     * 返回一个指定结果的成功的promise
     * @param {*} value
     */
    Promise.resolve = function (value) {

    }

    /**
     * Prpmise函数对象reject
     * 返回一个指定reason的失败的promise
     * @param {*} reason
     *
     */
    Promise.reject = function (reason) {

    }

    /**
     * Promise函数对象的all方法
     *返回一个promise，只有当所有promise都成功时才成功，否则只要有一个失败就失败
     * @param {*} promises
     */
    Promise.all = function (promises) {

    }

    /**
     * Promsie函数对象race方法
     * 返回一个Promsie，其结果由第一个完成的promise来决定。
     * @param {*} promises
     */
    Promise.race = function (promises) {

    }


    //向外暴露Promise
    window.Promise = Promise

})(window);
