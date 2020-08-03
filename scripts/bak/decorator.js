export function readonly (target, key, descriptor) {
    // target: 类原型
    // key:    被修饰的属性或者方法
    // descriptor: 被修饰的属性或方法的描述符对象
    // descriptor: { 
    //   value: [Function],
    //   writable: true,
    //   enumerable: true,
    //   configurable: true 
    // }
  
    console.log('target:', target)
    console.log('key:', key)
    console.log('descriptor:', descriptor)
    return descriptor;
  }