/*自定义Promise函数模块 */

(function(params){
    /**
     * Promise构造函数
     * excutor:执行器函数
     */
    function Promsie(excutor){

        this.status ='pending' //给promise对象指定status属性，初始值pending
        this.data = undefined  //给promise对象指定一个用于存储结果数据的属性
        this.callbacks = []    //用来存储回调函数的。 每个元素的结构：{onResolved(){}, onRejected(){}}

        function resolve(value){
            //将状态改为resolved
            this.status = 'resolved'
            //保存value数据
            //如果有待执行的callback函数，立即异步执行回调函数



            
        }

        function reject(reason){}

        //立即同步执行excutor
        excutor(resolve,reject)
    }

    /**
     * Promsie原型对象的then()
     * 指定成功和失败的回调函数
     * 返回一个新的promise对象
     * @param {*} onResolved 
     * @param {*} onRejected 
     */

    Promsie.prototype.then = function(onResolved,onRejected){

    }

    /**
     * Promsie原型对象的catch()
     * @param {*} onResolved 
     * @param {*} onRejected 
     */
    Promise.prototype.catch = function(onResolved,onRejected){

    }

    /**
     * Prpmise函数对象resolve
     * 返回一个指定结果的成功的promise
     * @param {*} value 
     */
    Promise.resolve = function(value){

    }

    /**
     * Prpmise函数对象reject
     * 返回一个指定reason的失败的promise
     * @param {*} reason 
     * 
     */
     Promise.reject = function(reason){

    }

    /**
     * Promise函数对象的all方法
     *返回一个promise，只有当所有promise都成功时才成功，否则只要有一个失败就失败
     * @param {*} promises 
     */
    Promise.all = function(promises){

    }

    /**
     * Promsie函数对象race方法
     * 返回一个Promsie，其结果由第一个完成的promise来决定。
     * @param {*} promises 
     */
    Promsie.race = function(promises){

    }


//向外暴露Promise
window.Promise = Promise

})(window);