(function(define){

define(function() {
"use strict";

var slice = Array.prototype.slice;


/* Exported Objects
 ******************************************************************************/
/**
 * Wraps a function in a set of functions that give the function's arguments.
 * 
 * Similar to function composition, except inner functions return the arguments
 * for outer functions. Like composition if Javascript supported multiple return
 * values.
 * 
 * @param {function} f Function being wrapped.
 * @param {...function(...args): Array} wrappers Wrapping functions. Wrapped
 *     right to left. Wrapper functions are called with the current set of
 *     arguments for the wrapped function and return an array of arguments.
 * 
 * @return {function} Wrapped function.
 */
var wrap = (function(){
    var reduceRight = Array.prototype.reduceRight;
    function reduce(p, c) { return c.apply(undefined, p); }
    
    return function(f /*, ...wrappers*/) {
        if (arguments.length <= 1) {
            return f;
        } else {
            var funcs = arguments;
            return function(/*...*/) { return reduceRight.call(funcs, reduce, arguments); };
        }
    };
}());

/**
 * Wraps a function in a function that bundles a range of calling arguments into
 * an array.
 * 
 * If index is specified, only wraps arguments at or after index. All other
 * arguments are passed normally. The bundled arguments must be the last arguments
 * in the function.
 * 
 * @param {function} f Function to bundle.
 * @param {number} index Index to start wrapping arguments. Default to zero.
 * 
 * @return Bundled function. 
 */
var bundle = (function(){
    function bundler(index) {
        index = index || 0;
        return function(/*...*/){
            return slice.call(arguments, 0, index).concat([slice.call(arguments, index)]);
        };
    }
    
    return function(f, index) { return wrap(f, bundler(index)); };
}());


/**
 * Higher order function for explicit OO function application. Also supports binding
 * arguments.
 * 
 * Given a function 'f', returns a function with Function.prototype.apply syntax to
 * apply 'f' for an explicit object. Calls 'f' with an explicit 'this' object.
 * 
 * @param {function} f Function to apply.
 * @param {array} args Set of arguments to bind on 'f'.
 * 
 * @return {function(object, array)} Function to apply 'f' to explicit object
 *     with a array of arguments.
 */
var applicablea = function(f, args) {
    return (args ?
        function(o, innerArgs) { return f.apply(o, args.concat(innerArgs)); } :
        Function.prototype.apply.bind(f));
};

/**
 * Same as 'applicablea', but takes takes a set of arguments to bind instead of
 * an array.
 * 
 * @param {function} f Function to apply.
 * @param {...} Set of arguments to bind on 'f'.
 * 
 * @return {function(object, array)} Function to apply 'f' to explicit object
 *     with a array of arguments.
 */
var applicable = bundle(applicablea, 1);

/**
 * Higher order function for explicit OO function calling. Also supports binding
 * arguments.
 * 
 * Given a function 'f', returns a function with Function.prototype.call syntax to
 * call 'f' for an explicit object. Calls 'f' with an explicit 'this' object.
 * 
 * @param {function} f Function to call.
 * @param {array} args Set of arguments to bind on 'f'.
 * 
 * @return {function(object, ...)} Function to call 'f' to explicit object and
 *    arguments.
 */
var callablea = function(f, args) { return bundle(applicablea(f, args), 1); };

/**
 * Same as 'callablea', but takes takes a set of arguments to bind instead of
 * an array.
 * 
 * @param {function} f Function to apply.
 * @param {...} Set of arguments to bind on 'f'.
 * 
 * @return {function(object, ...)} Function to call 'f' to explicit object and
 *    arguments.
 */
var callable = bundle(callablea, 1);

/* Export
 ******************************************************************************/
return {
    'wrap': wrap,
    'bundle': bundle,
    'applicablea': applicablea,
    'applicable': applicable,
    'callablea': callablea,
    'callable': callable
};

});

}(
    typeof define !== 'undefined' ? define : function(factory) { callable = factory(); }
));