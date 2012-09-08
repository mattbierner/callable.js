define(['../lib/callable'], function(callable){
    
    function first(){
        return this[0];
    }
    
    function get(i){
        return this[i];
    }
    
    function getAdd(i, add){
        return this[i] + add;
    }
    
    return {
        'module': "Callable Tests",
        'tests': [
            ["Simple callable",
            function(){
                var c = callable.callable(first);
                var ca = callable.callablea(first);

                assert.equal(c([1, 2, 3]), 1);
                assert.equal(ca([1, 2, 3]), 1);
            }],
            
            ["Arguments",
            function(){
                var c = callable.callable(get);
                var ca = callable.callable(get);

                assert.equal(c([1, 2, 3], 0), 1);
                assert.equal(ca([1, 2, 3], 0), 1);
            }],
            
            ["Bound",
            function(){
                var c = callable.callable(get, 0);
                var ca = callable.callable(get, [0]);

                assert.equal(c([1, 2, 3]), 1);
                assert.equal(ca([1, 2, 3]), 1);
            }],
            
            ["Bound and Arguments",
            function(){
                var c = callable.callable(getAdd, 0);
                var ca = callable.callable(getAdd, [0]);

                assert.equal(c([1, 2, 3], 3), 4);
                assert.equal(ca([1, 2, 3], 3), 4);
            }],
        ],
    };
});
