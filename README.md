# callable.js - Small Function Calling Javascript Library #

## About ##
callable.js is a small library for calling functions in Javascript using 'apply'
and 'call' style syntax. 

callable.js can provide a functional style interface to OO Javascript code.
This is useful for interfacing with builtins:

    // Call notation
    var slice = callable.callable(Array.prototype.slice);
    slice([1, 2, 3, 4], 1, 3) -> [2, 3]
    
    // Apply notation
    var slicea = callable.applicable(Array.prototype.slice);
    slicea([1, 2, 3, 4], [1, 3]) -> [2, 3]

Supports binding leading arguments:

    // Call notation:
    var slice = callable.callable(Array.prototype.slice, 1);
    slice([1, 2, 3, 4], 3) -> [2, 3]
    
    // Apply notation
    var slicea = callable.applicable(Array.prototype.slice, 1);
    slicea([1, 2, 3, 4], [3]) -> [2, 3]

# Using Callable.js #
Callable.js can be used either as an AMD style module or in the global scope.

Depends on args: https://github.com/mattbierner/args.js

## With AMD ##
Include any AMD style module loader and load callable:

    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <script type="application/javascript" src="require.js"></script>
        <script type="application/javascript">
            require(['callable'], function(callable) {
                var slice = callable.callable(Array.prototype.slice);
                alert(slice([1, 2, 3, 4], 1, 3));
            });
        </script>
    </body>

## Global ##
Include callable.js file directly and use 'callable' global:

    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <script type="application/javascript" src="callable.js"></script>
        <script type="application/javascript">
            var slice = callable.callable(Array.prototype.slice);
            alert(slice([1, 2, 3, 4], 1, 3));
        </script>
    </body>


# API #
Overview of API and examples. More detailed documentation can be found in the code.

## applicablea(f: function, args: array) ##
Higher order function for explicit OO function application. Also supports binding
arguments. Returns funciton with 'Funciton.prototype.apply' syntax.

    var slicea = callable.applicablea(Array.prototype.slice);
    slicea([1, 2, 3, 4], [1, 3]) -> [2, 3]
    
    // bind first argument
    var slicea2 = callable.applicablea(Array.prototype.slice, [1]);
    slicea2([1, 2, 3, 4], [3]) -> [2, 3]

## applicable(f: function, ...args) ##
Same as 'applicablea' but takes bound arguments as arguments instead of an array.

    var slicea = callable.applicable(Array.prototype.slice);
    slicea([1, 2, 3, 4], [1, 3]) -> [2, 3]
    
    // bind first argument
    var slicea2 = callable.applicable(Array.prototype.slice, 1);
    slicea2([1, 2, 3, 4], [3]) -> [2, 3]

## callablea(f: function, args: array) ##
Higher order function for explicit OO function calling. Also supports binding
arguments. Returns funciton with 'Funciton.prototype.call' syntax.

    var slice = callable.callablea(Array.prototype.slice);
    slice([1, 2, 3, 4], 1, 3) -> [2, 3]
    
    // bind first argument
    var slice2 = callable.callablea(Array.prototype.slice, [1]);
    slice2([1, 2, 3, 4], 3) -> [2, 3]

## callable(f: function, ...args) ##
Same as 'callable' but takes bound arguments as arguments instead of an array.

    var slice = callable.callable(Array.prototype.slice);
    slice([1, 2, 3, 4], 1, 3) -> [2, 3]
    
    // bind first argument
    var slice2 = callable.callable(Array.prototype.slice, 1);
    slice2([1, 2, 3, 4], 3) -> [2, 3]

