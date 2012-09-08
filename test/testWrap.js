define(['../lib/callable'], function(callable){
    
    function args(){ return Array.prototype.map.call(arguments, function(e) { return e; }); }
    
    function inc(){
        return Array.prototype.map.call(arguments, function(e) { return e + 1; });
    }
    
    function mul(){
        return Array.prototype.map.call(arguments, function(e) { return e * 2; });
    }
    
    return {
        'module': "Wrap Tests",
        'tests': [
            ["Simple wrap",
            function(){
                var wrapped = callable.wrap(args, inc);
                
                assert.deepEqual(wrapped(1, 2, 3), [2, 3, 4]);
            }],
            
            ["Multiple wrap",
            function(){
                var one = callable.wrap(args, inc, mul);
                var two = callable.wrap(args, mul, inc);

                assert.deepEqual(one(1, 2, 3), [3, 5, 7]);
                assert.deepEqual(two(1, 2, 3), [4, 6, 8]);
            }],
            
            ["Multiple wrap",
            function(){
                var oneM = callable.wrap(args, inc, mul);
                var oneN = callable.wrap(callable.wrap(args, inc), mul);

                var twoM = callable.wrap(args, mul, inc);
                var twoN = callable.wrap(callable.wrap(args, mul), inc);

                assert.deepEqual(oneM(1, 2, 3), [3, 5, 7]);
                assert.deepEqual(oneN(1, 2, 3), [3, 5, 7]);

                assert.deepEqual(twoM(1, 2, 3), [4, 6, 8]);
                assert.deepEqual(twoN(1, 2, 3), [4, 6, 8]);
            }],
            
            ["Wrap none",
            function(){
                var wrapped = callable.wrap(args);

                assert.deepEqual(wrapped(1, 2, 3), [1, 2, 3]);
            }],

        ],
    };
});
