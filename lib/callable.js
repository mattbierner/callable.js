(function(define){

define(['args'], function(args) {
"use strict";

/* Exported Objects
 ******************************************************************************/
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
var applicable = args.bundle(applicablea, 1);

/**
 * Higher order function for explicit OO function calling. Also supports binding
 * arguments.
 * 
 * Given a function 'f', returns a function with Function.prototype.call syntax to
 * call 'f' for an explicit object. Calls 'f' with an explicit 'this' object.
 * 
 * @param {function} f Function to call.
 * @param {array} a Set of arguments to bind on 'f'.
 * 
 * @return {function(object, ...)} Function to call 'f' to explicit object and
 *    arguments.
 */
var callablea = function(f, a) { return args.bundle(applicablea(f, a), 1); };

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
var callable = args.bundle(callablea, 1);

/* Export
 ******************************************************************************/
return {
    'applicablea': applicablea,
    'applicable': applicable,
    'callablea': callablea,
    'callable': callable
};

});

}(
    typeof define !== 'undefined' ? define : function(factory) { callable = factory(); }
));