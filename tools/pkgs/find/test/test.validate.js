'use strict';

// MODULES //

var tape = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof validate, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided an `options` argument which is not an `object`, the function returns a type error', function test( t ) {
	var values;
	var opts;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		null,
		undefined,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		opts = {};
		err = validate( opts, values[i] );
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'if provided a `dir` option which is not a `string`, the function returns a type error', function test( t ) {
	var values;
	var opts;
	var err;
	var i;

	values = [
		5,
		NaN,
		true,
		null,
		undefined,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		opts = {};
		err = validate( opts, {
			'dir': values[i]
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'if provided a `pattern` option which is not a `string`, the function returns a type error', function test( t ) {
	var values;
	var opts;
	var err;
	var i;

	values = [
		5,
		NaN,
		true,
		null,
		undefined,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		opts = {};
		err = validate( opts, {
			'pattern': values[i]
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'if provided an `ignore` option which is not an array of strings, the function returns a type error', function test( t ) {
	var values;
	var opts;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		null,
		undefined,
		[],
		['5',null],
		['beep',5],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		opts = {};
		err = validate( opts, {
			'ignore': values[i]
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns `null` if all options are valid', function test( t ) {
	var opts;
	var obj;
	var err;

	opts = {
		'dir': './foo/bar',
		'pattern': '**/package.json',
		'ignore': [ 'node_modules/**' ]
	};
	obj = {};
	err = validate( obj, opts );

	t.equal( err, null, 'returns null' );
	t.equal( obj.dir, opts.dir, 'sets dir option' );
	t.equal( obj.pattern, opts.pattern, 'sets pattern option' );
	t.deepEqual( obj.ignore, opts.ignore, 'sets ignore option' );

	t.end();
});

tape( 'the function ignores unsupported/unrecognized options', function test( t ) {
	var opts;
	var obj;
	var err;

	opts = {
		'beep': 'boop',
		'a': 'b',
		'c': [1,2,3]
	};
	obj = {};
	err = validate( obj, opts );

	t.equal( err, null, 'returns null' );
	t.deepEqual( obj, {}, 'does not set any options' );

	t.end();
});

