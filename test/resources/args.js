(function(define){

define(function() {
//"use strict";

/* Array Prototype
 ******************************************************************************/
var reduceRight = Array.prototype.reduceRight;
var slice = Array.prototype.slice;
var map = Array.prototype.map;


/* Helper
 ******************************************************************************/
var identity = function(v) { return v; };

var constant = function(v) { return identity.bind(this, v); };

var reduceArgsRight = function(reduce) {
    return function(f /*, ...wrappers*/) {
        var funcs = arguments;
        return (funcs.length <= 1 ? f :
            function(/*...*/) {
                return reduceRight.call(funcs, reduce, arguments);
            }
        );
    };
};




/* Exported Objects
 ******************************************************************************/
/**
 * A function that returns its arguments as an array.
 */
var argsIdentity = function() {
    return map.call(arguments, identity);
};

var minLength = function(f, length) {
    return wrap(f, function(/*...*/) {
        arguments.length = Math.max(arguments.length, length);
        return arguments;
    });
};

/**
 * Wraps a function in a set of functions that give the function's arguments.
 * 
 * Similar to function composition, except inner functions return the arguments
 * for outer functions. Like composition if Javascript supported multiple return
 * values.
 * 
 * Wrapped function is right to left:
 *     wrap(a, b, c)(x, y) = a(b(c(x, y)))
 * 
 * @param {function} f Function being wrapped.
 * @param {...function(...args): Array} wrappers Wrapping functions. Wrapped
 *     right to left. Wrapper functions are called with the current set of
 *     arguments for the wrapped function and return an array of arguments.
 * 
 * @return {function} Wrapped function.
 */
var wrap = reduceArgsRight(function(p, c) {
    return c.apply(undefined, p);
});

/**
 * Composes a set of functions.
 * 
 * Composed function is right to left:
 *     compose(a, b, c)(x, y) = a(b(c(x, y)))
 * 
 * @param {...function(...args)} functions Set of composing functions. Composing
 *     functions are called with the return value of the previous function.
 * 
 * @return {function} Composed function.
 */
var compose = reduceArgsRight(function(p, c) {
    return [c.apply(undefined, p)];
});

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
    var bundler = function(index) {
        index = index || 0;
        return function(/*...*/) {
            return slice.call(arguments, 0, index).concat([slice.call(arguments, index)]);
        };
    };
    
    return function(f, index) { return wrap(f, bundler(index)); };
}());


/**
 * Transforms arguments of a given function using a set of mapping function
 * before invoking the function.
 * 
 * Mappings are applied right to left and may be supplied either at a function
 * or argument level.
 * 
 * @param {function} f Function being transformed.
 * @param {...[function(value, index)|Array])} mappings A number of mapping
 *     functions used to transform arguments. Each parameter may either be a
 *     function that is applied to all arguments, or an array of functions 
 *     applied to each argument for a given index. All functions use the 
 *     Array.prototype.map api.
 * 
 * @return {function} Function that transforms arguments when invoked using 
 *     a set of mapping functions before calling the source function. 
 */
var mapArgs = (function(){
    function mapper(mapping) {
        return (typeof mapping === 'function' ?
            function(/*...*/) {
                return map.call(arguments, mapping);
            } :
            function(/*...*/) {
                return map.call(arguments, function(v, i) {
                    return mapping[i](v, i);
                });
            });
    };
    
    return bundle(function(f, mappings) {
        return wrap.apply(undefined, [f].concat(mappings.map(mapper)));
    }, 1);
}());

/**
 * Provides default arguments for a given function.
 * 
 * 
 * 
 * @param {function} f Source function default arguments are being provided for.
 * @param {Array: Object} defaultArgs An array of default argument values to 
 *    use when invokingt the source function.
 * @param {Array: function(value, index): boolean} tests
 * 
 * @return {function} Function that provides default argument values when invoked
 *     before calling the source function.
 */
var defaultArgs = function(f, defaultArgs, tests) {
    return mapArgs(f, (!tests ?
        function(v, i) { return v || defaultArgs[i]; } :
        function(v, i) {
            var test = tests[i];
            return (test && test(v, i) ? v : defaultArgs[i]);
        })
    );
};


var defaultsa = function(f, defaultArgs) {
    return minLength(mapArgs(f, function(v, i) {
        return (v === undefined ? defaultArgs[i] : v);
    }), defaultArgs.length);
};

/**
 * Provides default arguments for a given function.
 * 
 * Default arguments are provided as an argument list. Undefined arguments are
 * replaced with default before calling source function.
 * 
 * @param {function} f Source function default arguments are being provided for.
 * @param {...defaultArgs} defaultArgs Set of default arguments to use if an
 *     argument for the source function is undefined.
 * 
 * @return {function} Function that provides default argument values when invoked
 *     before calling the source function.
 */
var defaults = bundle(defaultsa, 1);



/* Export
 ******************************************************************************/
return {
    'toArgs': argsIdentity,
    'compose': compose,
    'wrap': wrap,
    'map': mapArgs,
    'defaultArgs': defaultArgs,
    'defaults': defaults,
    'bundle': bundle
};

});

}(
    typeof define !== 'undefined' ? define : function(factory) { args = factory(); }
));