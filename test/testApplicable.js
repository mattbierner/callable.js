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
        'module': "Applicable Tests",
        'tests': [
            ["Simple Applicable",
            function(){
                var applicable = callable.applicable(first);
                var applicablea = callable.applicablea(first);

                assert.equal(applicable([1, 2, 3]), 1);
                assert.equal(applicablea([1, 2, 3]), 1);
            }],
            
            ["Arguments",
            function(){
                var applicable = callable.applicable(get);
                var applicablea = callable.applicable(get);

                assert.equal(applicable([1, 2, 3], [0]), 1);
                assert.equal(applicablea([1, 2, 3], [0]), 1);
            }],
            
            ["Bound",
            function(){
                var applicable = callable.applicable(get, 0);
                var applicablea = callable.applicable(get, [0]);

                assert.equal(applicable([1, 2, 3]), 1);
                assert.equal(applicablea([1, 2, 3]), 1);
            }],
            
            ["Bound and Arguments",
            function(){
                var applicable = callable.applicable(getAdd, 0);
                var applicablea = callable.applicable(getAdd, [0]);

                assert.equal(applicable([1, 2, 3], [3]), 4);
                assert.equal(applicablea([1, 2, 3], [3]), 4);
            }],
        ],
    };
});
