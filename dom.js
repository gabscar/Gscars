/*
Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
métodos semelhantes aos que existem no array, mas que sirvam para os
elementos do DOM selecionados.
Crie os seguintes métodos:
- forEach, map, filter, reduce, reduceRight, every e some.
Crie também métodos que verificam o tipo do objeto passado por parâmetro.
Esses métodos não precisam depender de criar um novo elmento do DOM, podem
ser métodos estáticos.
Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
no objeto, como nos exemplos abaixo:
DOM.isArray([1, 2, 3]); // true
DOM.isFunction(function() {}); // true
DOM.isNumber('numero'); // false
Crie os seguintes métodos para verificação de tipo:
- isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
O método isNull deve retornar `true` se o valor for null ou undefined.
*/
(function(document,window){
    'use strict'

    function DOM(elements){
        this.element = document.querySelectorAll(elements);
    }
    DOM.prototype.on =function(event,callBack,boolean){
        this.element.forEach((element) => {
          element.addEventListener(event,callBack,boolean);
        });   
    } 
    
    DOM.prototype.off = function(event,callBack,boolean){
        this.element.forEach((element)=>{
          element.revomeEventListener(event,callBack,boolean);
        })
    }
    
    DOM.prototype.get= function(){
        return this.element;
    }
    DOM.prototype.forEach = function forEach(callBack){
        return Array.prototype.forEach.apply(this.element,callBack);
    }

    DOM.prototype.map = function map(callBack){
        return Array.prototype.map.apply(this.element,callBack);
    }

    DOM.prototype.filter = function(callBack){
        return Array.prototype.filter.apply(this.element,callBack);
    }

    DOM.prototype.reduce = function(callback){
        return Array.prototype.reduce.apply(this.element,callback);
    }

    DOM.prototype.reduceRight = function(callBack){
        return Array.prototype.reduceRight.apply(this.element,callBack);
    }

    DOM.prototype.some = function(callBack){
        return Array.prototype.some.apply(this.element,callBack);
    }

    DOM.prototype.every = function(callBack){
        return Array.prototype.every.apply(this.element,callBack);
    }

    DOM.isArray = function (object){
        return Object.prototype.toString.call(object) === '[object Array]';
    }

    DOM.isFunction = function(object){
        return Object.prototype.toString.call(object) === '[object Function]';
    }

    DOM.isNumber = function(object){
        return Object.prototype.toString.call(object) === '[object Number]';
    }

    DOM.isObject = function(object){
        return Object.prototype.toString.call(object) === '[object Object]';
    }

    DOM.isString = function(object){
        return Object.prototype.toString.call(object) === '[object String]';
    }

    DOM.isBoolean = function(object){
        return Object.prototype.toString.call(object) === '[object Boolean]';
    }

    DOM.isNull = function(object){
        let result =  Object.prototype.toString.call(object);
        return (result === '[object Undefined]')||(result ==='[object Null]');
    }
    
   
    

    console.log(DOM.isArray([1, 2, 3])); // true
    console.log(DOM.isFunction(function() {})); // true
    console.log(DOM.isNumber('numero')); // false
    console.log(DOM.isNull(undefined));
    console.log(DOM.isNull(null));

    
    window.DOM = DOM;
})(document,window);