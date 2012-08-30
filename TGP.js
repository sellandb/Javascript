//Testing Framework
var BSTest = {};
BSTest.test_number = 0;
BSTest.test = function(s){
document.write(BSTest.test_number + " : " + s + "<br />");
BSTest.test_number++;
}

BSTest.objectOutput = function(o){
	var name;

	for (name in o){
		if(typeof o[name] !== 'function'){
			BSTest.test(name + ": " + o[name]);
		}
	}
}

//TGP Framework
if(typeof Object.create !== 'function'){
	Object.create = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	};
}

Function.prototype.method = function (name, func) {
	if(!this.prototype[name]){
		this.prototype[name] = func;
		return this;
	}
};

Number.method('integer', function(){
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});

String.method('trim', function(){
	return this.replace(/^\s+|\s+$/g, '');
});

Function.method('curry', function () {
	var slice = Array.prototype.slice,
	args = slice.apply(arguments), 
	that = this;
	return function () {
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
});

var memoizer = function (memo, formula) {
	var recur = function (n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = formula(recur, n);
			memo[n] = result;
		}
		return result;
	};
	return recur;
};

Object.method('superior', function(name) {
	var that = this, method = that[name];
	return function(){
		return method.apply(that, arguments);
	};
});

var is_array = function(value){
	return Object.prototype.toString.apply(value) === '[object Array]';
};

Array.method('reduce', function(f,value) {
	var i;
	for(i = 0; i < this.length; i += 1)
	{
		value = f(this[i], value);
	}
	return value;
});

Array.dim = function(dimension, initial){
	var a =[], i;
	for(i = 0; i < dimension; i += 1){
		a[i] = initial;
	}
	return a;
};

Array.matrix = function(m,n,initial){
	var a, i, j, mat = [];
	for(i=0; i < m; i += 1){
		a = [];
		for(j = 0; j < n; j+=1) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
};

//Chapter 3

BSTest.test("Chapter 3 Tests");

var CH3 = {};

CH3.stooge = {
	"first-name" : "Jerome",
	"last-name" : "Howard"
	};	

CH3.flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};

CH3.stooge['middle-name'] = "Lester";
CH3.stooge.nickname = "curly";
CH3.flight.equipment = {model: "Boeing 777"};
CH3.flight.status = "overdue";

CH3.middle = CH3.stooge["middle-name"] || "(none)";
CH3.status = CH3.flight.status || "unknown";

CH3.another_stooge = Object.create(CH3.stooge);

CH3.another_stooge['first-name'] = "Harry";
CH3.another_stooge['middle-name'] = "Moses";
CH3.another_stooge.nickname = 'Moe';

CH3.stooge.profession = 'Actor';
BSTest.test("Stooge profession = " + CH3.another_stooge.profession);

BSTest.test(typeof CH3.flight.number);

BSTest.objectOutput(CH3.another_stooge);
BSTest.test("After Delete");
delete CH3.another_stooge.nickname;
BSTest.objectOutput(CH3.another_stooge);
BSTest.test("End Chapter 3 Tests");


//Chapter 4
BSTest.test("Begin Chapter 4 Tests");

var ch4 = {};
//A function
ch4.add = function(a,b){
	return a + b;
};

//Method invocation pattern
ch4.myObject = {
	value: 0,
	increment: function (inc) {
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

ch4.myObject.increment();
BSTest.test(ch4.myObject.value);

ch4.myObject.increment(2);
BSTest.test(ch4.myObject.value);

BSTest.test(ch4.add(3,4));

ch4.myObject.double = function(){
	var that = this;
	
	var helper = function () {
		that.value = ch4.add(that.value, that.value);
	}
	
	helper();
};

ch4.myObject.double();

BSTest.test(ch4.myObject.value);

ch4.Quo = function (string) {
	this.status = string;
	
};

ch4.Quo.prototype.get_status = function () {
	return this.status;
};

ch4.myQuo = new ch4.Quo("confused");

BSTest.test(ch4.myQuo.get_status());

ch4.array = [3,4];
ch4.sum = ch4.add.apply(null, ch4.array);
BSTest.test(ch4.sum);

ch4.statusObject = {
	status: "A-OK"
};

BSTest.test(ch4.Quo.prototype.get_status.apply(ch4.statusObject));

ch4.sum = function () {
	var i, sum = 0;
	for(i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
}

BSTest.test(ch4.sum(4,8,15,16,23,42));

ch4.add = function (a,b) {
	if( typeof a !== 'number' || typeof b !== 'number' ){
		throw {
			name: "TypeError",
			message: 'add needs numbers'
		};
	}
	return a + b;
}

ch4.tryIt = function(){
	try {
		BSTest.test(ch4.add("seven"));
	} catch (e){
		BSTest.test(e.name + ": " + e.message);
	}
}

ch4.tryIt();
BSTest.test((10/7));
BSTest.test((10/7).integer());

BSTest.test("Start:" + "\tcats and dogs   " + ":end");
BSTest.test("Start:" + "\tcats and dogs   ".trim() + ":end");

BSTest.test("Start Recursive Hanoi");

ch4.hanoi = function hanoi(disc, src, aux, dst, outfunc) {
	if(disc > 0) {
		hanoi(disc - 1, src, dst, aux, outfunc);
		outfunc(disc, src, dst);
		hanoi(disc - 1, aux, src, dst, outfunc);
	}
};

ch4.hanoi(3, "Src", "Aux", "Dst", function (discs, src, dst) {
	BSTest.test("Move disc " + discs + " from " + src + " to " + dst);
});

//Walk the Dom example

BSTest.test("Walk the dom example");

ch4.walk_the_DOM = function walk(node, func){
	func(node);
	node = node.firstChild;
	while (node) {
		walk(node, func);
		node = node.nextSibling;
	}
};

ch4.getElementsByAttribute = function (att, value) {
	var results = [];
	
	walk_the_dom(document.body, function (node) {
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
			results.push(node);
		}
	});
	
	return results;
};

//Factorial Example

ch4.factorial = function factorial(i, a) {
	a = a || 1;
	if(i < 2) {
		return a
	}
	return factorial(i - 1, a * i);
};

BSTest.test("Factorial 8: " + ch4.factorial(8));

ch4.myObject = (function () {
	var value = 0;
	
	return {
		increment: function (inc) {
			value += typeof inc === 'number' ? inc : 1;
		},
		getValue: function () {
			return value;
		}
	};
}());

BSTest.test(ch4.myObject.getValue());
ch4.myObject.increment();
BSTest.test(ch4.myObject.getValue());
ch4.myObject.increment(3);
BSTest.test(ch4.myObject.getValue());


ch4.quo = function (status) {
	return {
		get_status : function () {
			return status;
		}
	};
};

ch4.myQuo = ch4.quo("amazed");

BSTest.test(ch4.myQuo.get_status());

ch4.fade = function (node) {
	var level = 1;
	var step = function() {
		var hex = level.toString(16);
		node.style.backgroundColor = "#FFFF" + hex + hex;
		if  (level < 15) {
			level += 1;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
};

//ch4.fade(document.body);

//Module demo
String.method('deentityify', function () {
	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'
	};
	
	return function () {
		
		return this.replace(/&([^&;]+);/g,
			function(a, b) {
				var r = entity[b];
				return typeof r === 'string' ? r : a;
			}
		);
	};
}());

BSTest.test('&lt;b&gt;Testing deentityifying&lt;/b&gt;');
BSTest.test('&lt;b&gt;Testing deentityifying&lt;/b&gt;'.deentityify());

//serial maker module
ch4.serial_maker = function() {
	var prefix = '';
	var seq = 0;
	return {
		set_prefix: function (x) {
			prefix = String(x);
		},
		set_seq: function (s){
			seq = s;
		},
		gensym: function() {
			var result = prefix + seq;
			seq += 1;
			return result;
		}
	};
};

ch4.seqer = ch4.serial_maker();
ch4.seqer.set_prefix('Q');
ch4.seqer.set_seq(1000);
BSTest.test(ch4.seqer.gensym());

//currying example
BSTest.test("Currying Example");
ch4.add1 =  ch4.add.curry(1);

BSTest.test(ch4.add1(ch4.add1(6)));
BSTest.test("Naive Fib");

ch4.naiveFib = function fibonacci (n) {
	return n < 2 ? n : fibonacci(n-1) + fibonacci(n-2);
};

for(i = 0; i <= 10; i++)
{
	BSTest.test(i + ': ' + ch4.naiveFib(i));
}
BSTest.test("Memo Fib");
ch4.memoFib = (function fib (n) {
	var memo = [0,1];
	var fibo = function (n) {
		var result = memo[n];
		if(typeof result !== 'number') {
			result = fibo(n-1) + fibo(n-2);
			memo[n] = result;
		}
		return result;
	};
	return fibo;
}());
for(i = 0; i <= 10; i++)
{
	BSTest.test(i + ': ' + ch4.memoFib(i));
}

//Memoizer functiion
ch4.fibonacci = memoizer([0,1], function (recur, n) {
	return recur(n - 1) + recur(n - 2);
});

for(i = 0; i <= 10; i++)
{
	BSTest.test(i + ': ' + ch4.fibonacci(i));
}

//Memoizer factorial

ch4.factorial = memoizer([1,1], function (recur, n) {
	return n * recur(n - 1);
});

for(i = 0; i <= 10; i++)
{
	BSTest.test(i + ': ' + ch4.factorial(i));
}

//Chapter 5
BSTest.test("<b>Chapter 5</b>");
var ch5 = {};
ch5.myMammel = {
	name: 'Herb the Mammal',
	get_name: function(){
		return this.name;
	},
	says : function() {
		return this.saying || '';
	}
}

ch5.myCat = Object.create(ch5.myMammel);
ch5.myCat.name = 'Henrietta';
ch5.myCat.saying = 'meow';
ch5.myCat.purr = function (n) {
	var i, s = '';
	for(i = 0; i < n; i += 1) {
		if(s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
};
ch5.myCat.get_name = function () {
	return this.says() + ' ' + this.name + ' ' + this.says();
}

BSTest.test(ch5.myMammel.get_name());
BSTest.test(ch5.myCat.get_name());
BSTest.test(ch5.myCat.purr(5));
BSTest.test(ch5.myCat.get_name());

BSTest.test("Functional");
 ch5.mammal = function(spec){
	var that = {};
	that.get_name = function() {
		return spec.name;
	};
	that.says = function(){
		return spec.saying || '';
		};
	return that;
};

ch5.myMammal = ch5.mammal({name: "Herb"});;

BSTest.test(ch5.myMammal.get_name());
BSTest.test(ch5.myMammal.says());

ch5.cat = function(spec){
	spec.saying = spec.saying || "Meow";
	var that  = ch5.mammal(spec);
	that.purr = function(n){
		var i,s = '';
		for(i = 0; i < n; i += 1){
			if(s){
				s += '-';
			}
			
			s+= 'r';
		}
		return s;
	}
	
	that.get_name = function() {
		return that.says() + ' ' + spec.name + ' ' + that.says();
	};
	
	return that;
};

ch5.myCat = ch5.cat({name: "Henrietta"});

BSTest.test(ch5.myCat.says());
BSTest.test(ch5.myCat.purr(5));
BSTest.test(ch5.myCat.get_name());

ch5.coolcat = function (spec) {
	var that = ch5.cat(spec), super_get_name = that.superior("get_name");
	that.get_name = function() {
		return 'like ' + super_get_name() + ' baby';
	};
	return that;
};

ch5.myCoolCat = ch5.coolcat({name: "Bix"});
BSTest.test(ch5.myCoolCat.get_name());

ch5.eventuality = function(that){
	var registry = {};
	that.fire = function(event) {
		var array, func, handler, i, type = typeof event === 'string' ? event : event.type;
		if(registry.hasOwnProperty(type)){
			array = registry[type];
			for(i = 0; i < array.length; i += 1){
				handler = array[i];
				
				func = handler.method;
				if(typeof func === 'string'){
					func = this[func];
				}
				
				func.apply(this, handler.parameters || [event]);
			}
		}
		
		return this;
	}
	
	that.on = function(type, method, parameters){
		var handler = {
			method: method,
			parameters: parameters
		};
		
		if(registry.hasOwnProperty(type)){
			registry[type].push(handler);
		} else {
			registry[type] = [handler];
		}
		return this;
	};
};
//Chapter 6
BSTest.test("<b>Chapter 6</b>");
var ch6 = {};
ch6.data = [4,8,15,16,23,42];

ch6.add = function(a,b){
return a + b;
};

BSTest.test(ch6.data.reduce(ch6.add, 0));
