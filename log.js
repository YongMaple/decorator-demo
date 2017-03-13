let log = (type) => {
    return (target, name, descriptor) => {
        const method = descriptor.value;
        descriptor.value = (...args) => {
            console.info(`(${type}) 正在执行: ${name}(${args}) = ?`);
            let ret;
            try {
                ret = method.apply(target, args);
                console.info(`(${type}) 成功 : ${name}(${args}) => ${ret}`);
            } catch (error) {
                console.error(`(${type}) 失败: ${name}(${args}) => ${error}`);
            }
            return ret;
        }
    }
}
class IronMan {
    @log('IronMan 自检阶段')
    check() {
        return '检查完毕';
    }
    @log('IronMan 攻击阶段')
    attack() {
        return '击倒敌人';
    }
    @log('IronMan 机体报错')
    error() {
        throw 'Something is wrong!';
    }
}

var tony = new IronMan();
tony.check();
tony.attack();
tony.error();
