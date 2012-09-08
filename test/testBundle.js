define(['../lib/callable'], function(callable){
    
    function args(){ return Array.prototype.map.call(arguments, function(e) { return e; }); }
    
    return {
        'module': "Bundle Tests",
        'tests': [
            ["Simple bundle",
            function(){
                var bundled = callable.bundle(args);
                
                assert.deepEqual(bundled(1, 2, 3), [[1, 2, 3]]);
            }],
            
            ["Index bundle",
            function(){
                var bundled = callable.bundle(args, 1);
                
                assert.deepEqual(bundled(1, 2, 3), [1, [2, 3]]);
            }],
            
            ["Bundle Empty",
            function(){
                var bundled = callable.bundle(args);
                
                assert.deepEqual(bundled(), [[]]);
            }],
            
            ["Bundle Out of range",
            function(){
                var bundled = callable.bundle(args, 10);
                
                assert.deepEqual(bundled(1, 2, 3), [1, 2, 3, []]);
            }],
            
        ],
    };
});
