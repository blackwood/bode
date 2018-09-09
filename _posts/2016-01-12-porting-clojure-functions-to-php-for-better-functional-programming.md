---
title: Porting Clojure functions to PHP for Better Functional Programming
author: Miles Blackwood
layout: post
permalink: /porting-clojure-php-better-functional-programming/
categories:
  - code
keyword: clojure php functional programming
seo_title: Clojure functions in PHP for Better Functional Programming
meta: 'PHP does its best to incorporate styles from many programming paradigms--can we improve its functional methods by mimicking Clojure?'
image_path: /uploads/Clojure-Logo.png
image_width: 500
image_height: 500
---

PHP is one of those general purpose programming languages that does its best to try to incorporate most paradigms--whether you want full-fledged OOP, procedural or functional, PHP has it. But on the subject of functional programming, we have to ask, does PHP do it well?

After dedicating myself to learning Clojure and get a better insight into functional programming early this winter at the [Recurse Center](https://www.recurse.com/), I found myself picking up on some client work in PHP once again, but still wanting to use some of the higher order functions and concepts I'd come to enjoy in my studies.

I'd already implemented [a toy LISP in PHP](https://github.com/blackwood/phlp), and I had seen a few attempts at underscore-like libraries for PHP that incorporated some of the key functional methods, but in an effort to keep my Clojure up to speed while still writing in another programming language, I thought I would try to mirror Clojure's standard library specifically, allowing me to still "think" in Clojure while writing actual PHP code. In particular, I'd like to show you how I arrived at the function `interleave`, with a few detours on the way.

Luckily, [someone has already implemented](https://gist.github.com/kid-icarus/8661319) a pretty idiomatic (in my opinion) version of `array_some` and `array_every`.

<pre class="language-php"><code class="language-php">/**
 * Returns true if the given predicate is true for all elements.
 * credit: array_every and array_some.php
 * https://gist.github.com/kid-icarus/8661319
 */
function every(callable $callback, array $arr) {
  foreach ($arr as $element) {
    if (!$callback($element)) {
      return FALSE;
    }
  }
  return TRUE;
}

/**
 * Returns true if the given predicate is true for at least one element.
 * credit: array_every and array_some.php
 * https://gist.github.com/kid-icarus/8661319
 */
function some(callable $callback, array $arr) {
  foreach ($arr as $element) {
    if ($callback($element)) {
      return TRUE;
    }
  }
  return FALSE;
}
</code></pre>
We can pluck some low hanging fruit, with `not-every`, which we can accomplish by simply negating a call to our `every` function, while still providing the same signature.

<pre class="language-php"><code class="language-php">/**
 * Returns true if the given predicate is not true for all elements.
 */
function not_every(callable $callback, array $arr) {
	return !every($callable, $arr);
}
</code></pre>

As you can see, I've stripped off the `array_` prefixes. An inconvenience of PHP is the insistence on prefacing functions which operate on arrays with the `array_` prefix, which I understand the author of those two functions was trying to emulate. However, since arrays are already the de facto data structure in PHP, its unusual that the standard library was written this way. 

The rule applies to your basic higher order functions, so instead of `map`, `reduce` and `filter` you end up with `array_map`, `array_reduce` and `array_filter`. As if that weren't enough, the arities are inconsistent. `array_reduce` and `array_filter` both take an array as the first argument and a callback as the second, whereas `array_map` takes the callback first. In Clojure, the idiom is is to do the callback first, so lets alias these functions and normalize the signatures in one fell swoop:

<pre class="language-php"><code class="language-php">/**
 * Applies callable to each item in array, return new array.
 */
function map(callable $callback, array $arr) {
	return array_map($callback, $arr);
}

/**
 * Return a new array with elements for which predicate returns true.
 */
function filter(callable $callback, array $arr, $flag=0) {
	return array_filter($arr, $callback, $flag);
}

/**
 * Iteratively reduce the array to a single value using a callback function
 */
function reduce(callable $callback, array $arr, $initial=NULL) {
	return array_reduce($arr, $callback, $initial);
}
</code></pre>

We don't have multimethods yet, so whereas clojure's `reduce` has an alternative signature where the initial value is passed in as the second argument, lets just leave `initial` as the last value for now--after all this is still quite an improvement over the original functions, and we're not going for total feature parity. Additionally, we'll leave `$flag` in our filter function as well (which determines whether to pass in both the key and value or the key only).

In Clojure, we have the useful functions `first` and `last`, of which the equivalents in PHP are `array_shift` and `array_pop`. The key difference between these versions is that PHP's are destructive, which is to say that `array_shift`, for example, returns the first item of the array, and *at the same time* removes it from the original array (as the array gets passed by reference). In functional programming, one goal is to try to minimize side-effects, so lets make our `first` and `last` functions make a copy behind the scenes so that the original array is never modified. For their counterparts `rest` and `but-last` we can go ahead and just use `array_slice` to return that portion.

<pre class="language-php"><code class="language-php">/**
 * Returns the first item in an array.
 */
function first(array $arr) {
	$copy = array_slice($arr, 0, 1, true);
	return array_shift($copy);
}

/**
 * Returns the last item in an array.
 */
function last(array $arr) {
	$copy = array_slice($arr, 0, NULL, true);
	return array_pop($copy);
}

/**
 * Returns all but the first item in an array.
 */
function rest(array $arr) {
	return array_slice($arr, 1, NULL, true);
}

/**
 * Returns all but the last item in an array.
 */
function but_last(array $arr) {
	return array_slice($arr, 0, -1, true);
}
</code></pre>

These of course, are very low level functions, so it might not seem too exciting, but they'll come in handy later. By the way, did you know that PHP has an equivalent to [apply](https://en.wikipedia.org/wiki/Apply)? You probably don't, because it was given an insanely esoteric name instead of the commonly used moniker that you'll find in every other programming language with the same concept. Let's just go ahead and alias the absurd `call_user_func_array` to `apply` instead.

<pre class="language-php"><code class="language-php">/**
 * Alias call_user_func_array to apply.
 */
function apply(callable $callback, array $args) {
	return call_user_func_array($callback, $args);
}
</code></pre>

This is getting exciting! By making our function names idiomatic and building up lower level abstractions, we have a base to help us build even more interesting ones. Lets use `apply` to help us create `complement`, which according to clojuredocs.org "[...] takes a fn f and returns a fn that takes the same args as f, has the same effects, if any, and returns the opposite truth value." Straightforward enough:

<pre class="language-php"><code class="language-php">function complement(callable $f) {
	return function() use ($f) {
		$args = func_get_args();
		return !apply($f, $args);
	};
}
</code></pre>

Here we are using the very useful `func_get_args()` function which allows us to grab an array of all values passed to the original function in the order they were passed. We can go ahead and return an anonymous function, which has access to our original function `$f` through the `use` statement (which is required because all functions get a new scope in PHP), and then simply call `apply` on our `$args`, with a negation to give us an opposite boolean value of whatever is returned.

Sweet, now that we have `complement`, that lets us really easily do the opposite of `filter`, a function called `remove`. By returning the `complement` of the callback passed to `filter`, we'll end up returning all the items which don't meet the predicate.

<pre class="language-php"><code class="language-php">/**
 * Return a new array with elements for which predicate returns false.
 */
function remove(callable $callback, array $arr, $flag=0) {
	return filter(complement($callback), $arr, $flag);
}
</code></pre>

On another note, `array_merge` and `concat` are equivalents If we alias that, that lets us do `cons` and `conj`, Clojure's standard methods for adding items to the beginning or end of collections.

<pre class="language-php"><code class="language-php">/**
 * Alias array_merge to concat.
 */
function concat() {
	$arrs = func_get_args();
	return apply('array_merge', $arrs);
}

/**
 * cons(truct)
 * Returns a new array where x is the first element and $arr is the rest.
 */
function cons($x, array $arr) {
	return concat(array($x), $arr);
}

/**
 * conj(oin)
 * Returns a new arr with the xs added.
 * @param $arr
 * @param & xs add'l args to be added to $arr.
 */
function conj() {
	$args = func_get_args();
	$arr  = first($args);
	return concat($arr, rest($args));
}
</code></pre>

For example, now these two function calls will produce the same result:

<pre class="language-php"><code class="language-php">cons(1, array(2, 3, 4));
conj(array(1), 2, 3, 4);
</code></pre>

Now, with these low level tools, we have enough to make writing `interleave` pretty simple. First, we'd like our function to take a variable number of arrays as arguments, so we use `func_get_args` instead of declaring arguments in the function signature. Then we pull out the first item of each array into a new array, and then the rest of each array into a new array of arrays. Then we can simply check if each array has elements remaining in it, and then `concat` the result of interleaving those arrays, and so on. What we end up with is a pretty readable implementation, and a function result which is mostly indistinguishable from Clojure's version, save for the fact that Clojure's produces a lazy sequence.

<pre class="language-php"><code class="language-php">/**
 * Returns a sequence of the first item in each collection then the second, etc.
 */
function interleave() {
	$arrs = func_get_args();
	$firsts = map('first', $arrs);
	$rests  = map('rest', $arrs);
	if (every(function($a) { return !empty($a); }, $rests)) {
		return concat($firsts, apply('interleave', $rests));
	}
	return $firsts;
}
</code></pre>

Thus, when we make this function call with arrays of variable length:

<pre class="language-php"><code class="language-php">interleave([1, 2, 3, 4], ["a", "b", "c", "d", "e"], ["w", "x", "y", "z"])
</code></pre>

We end up with a resulting array of interleaving all three arrays minus the extra elements:

<pre class="language-php"><code class="language-php">array (
	0 => 1,
	1 => 'a',
	2 => 'w',
	3 => 2,
	4 => 'b',
	5 => 'x',
	6 => 3,
	7 => 'c',
	8 => 'y',
	9 => 4,
	10 => 'd',
	11 => 'z',
)
</code></pre>

Of course, Clojure has pretty awesome functionality that we didn't cover here--`interleave`, for example returns a lazy sequence, not a static collection. Furthermore, since arrays double as maps in PHP, that leaves some ambiguity about how to mock methods like `assoc`. At any rate, the code is up on github for perusal if you find these interesting and want to use them in your next project. 

[cljphp on GitHub](https://gist.github.com/milesblackwood/e1eff90c83c9ae1fb096)
