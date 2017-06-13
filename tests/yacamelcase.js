/**
 * @fileoverview Yet another camelcase rule
 * @author kohno
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../rules/yacamelcase");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("yacamelcase", rule, {
	valid: [
		{
			code: "var should_ignored = \"hoge\"",
			options: [{ ignoreStrings: ["should_ignored"]}]
		},
		{
			code: "var should_ignored = \"hoge\"; var should_ignored_too = \"hoge\";",
			options: [{ ignoreStrings: ["should_ignored", "should_ignored_too"]}]
		},
		{
			code: "var _private_var = \"hoge\";",
			options: [{ ignoreStrings: ["_private_var"]}]
		},
		{
			code: "var o = {bar_baz: 1}",
			options: [{ ignorePattern: "bar_baz" }]
		},
		{
			code: "var o = {bar_baz: 1, bar_foo: 2}",
			options: [{ ignorePattern: "bar_.*" }]
		}
	],
	invalid: [
		{
			code: "var should_error = \"hoge\"",
			errors: [
				{
					message: "Identifier 'should_error' is not in camel case.",
					type: "Identifier"
				}
			]
		},
		{
			code: "var should_ignored = \"hoge\"; var should_error = \"hoge\"",
			options: [{ ignoreStrings: ["should_ignored"]}],
			errors: [
				{
					message: "Identifier 'should_error' is not in camel case.",
					type: "Identifier"
				}
			]
		},
		{
			code: "var o = {should_ignored: 1, no_camelcased: 2}",
			options: [{ ignorePattern: "should_.*" }],
			errors: [
				{
					message: "Identifier 'no_camelcased' is not in camel case.",
					type: "Identifier"
				}
			]
		}
	]
});
