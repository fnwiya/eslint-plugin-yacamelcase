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
		}
	]
});
