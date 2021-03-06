$(document).ready(function() {

	var testResultsDiv = $(".testResults");

	var formatTestsRun = 0;
	var formatTestsFailed = 0;
	$(".formatTextTest").each(function() {
		// collect variables and elements
		var locale = $(this).find(".locale").text();
		var format = $(this).find(".format").text();
		var input = $(this).find(".input").text();
		var output = $(this).find(".output");
		var ref = $(this).find(".ref").text();
		var result = $(this).find(".result");
		
		// apply formatting
		output.text(input);
		if (format && locale)
			output.formatNumber({format:format, locale:locale});
		else if (format)
			output.formatNumber({format:format});
		else if (locale)
			output.formatNumber({locale:locale});
		else
			output.formatNumber();
		
		if (output.text() == ref)
			result.text('PASSED');
		else {
			result.text('FAILED');
			result.addClass('error');
			formatTestsFailed++;
		}
		formatTestsRun++;
	});
	
	$(".formatNumberTest").each(function() {
		// collect variables and elements
		var locale = $(this).find(".locale").text();
		var format = $(this).find(".format").text();
		var input = $(this).find(".input").text();
		var output = $(this).find(".output");
		var ref = $(this).find(".ref").text();
		var result = $(this).find(".result");
		var nanForceZero = $(this).find(".nanForceZero").text();
		var round = $(this).find(".round").text();
		
		// apply formatting
		output.text(input);
		if (format && locale && nanForceZero)
			output.formatNumber({ format: format, locale: locale, nanForceZero: nanForceZero == 'true' });
		else if (format && locale && round)
			output.formatNumber({format:format, locale:locale, round:round});
		else if (format && locale)
			output.formatNumber({format:format, locale:locale});
		else if (format)
			output.formatNumber({format:format});
		else if (locale)
			output.formatNumber({locale:locale});
		else
			output.formatNumber();
		
		if (output.text() == ref)
			result.text('PASSED');
		else {
			result.text('FAILED');
			result.addClass('error');
			formatTestsFailed++;
		}
		formatTestsRun++;
	});
	
	var parseTestRun = 0;
	var parseTestFailed = 0;
	$(".parseTest").each(function() {
		// collect variables and elements
		var locale = $(this).find(".locale").text();
		var input = $(this).find(".input");
		var output = $(this).find(".output");
		var ref = parseFloat($(this).find(".ref").text());
		var result = $(this).find(".result");
		var isPercentage = $(this).find(".isPercentage").text();
		if (isPercentage == 'true')
			isPercentage = true;
		else
			isPercentage = false;
		
		// parse to number
		var number = input.parseNumber({locale: locale, isPercentage: isPercentage}, false);
		output.text(number.toString());
		
		// read number back in as float, check against ref
		if (number == ref) {
			result.text('PASSED');
		} else {
			result.text('FAILED');
			result.addClass('error');
			parseTestFailed++;
		}
		parseTestRun++;
	});
	
	var elementTestsRun = 0;
	var elementTestsFailed = 0;
	$(".formatElementTest").each(function() {
		var input;
		if ($(this).is(":input"))
			input = $(this).val();
		else
			input = $(this).text();
		
		if (input != '1230.45') {
			if ($(this).is(":input"))
				$(this).val('1230.45');
			else
				$(this).text('1230.45');
		}
		
		var output;
		$(this).formatNumber({format:"#,###.00", locale:"en"});
		if ($(this).is(":input"))
			output = $(this).val();
		else
			output = $(this).text();

		if (output != '1,230.45') {
			elementTestsFailed++;
			var result = $(this).next();
			if (result.is(":input"))
				result.val("FAILED");
			else
				result.text("FAILED");
			result.addClass('error');
		} else {
			if ($(this).next().is(":input"))
				$(this).next().val("PASSED");
			else
				$(this).next().text("PASSED");
		}
		elementTestsRun++;
	});
	
	// display the results
	testResultsDiv.html("<p>Format Tests: " + (formatTestsRun - formatTestsFailed) + "/" + formatTestsRun + "</p> <p>Parse Tests: " + (parseTestRun - parseTestFailed) + "/" + parseTestRun + "</p> <p>Element Tests: " + (elementTestsRun - elementTestsFailed) + "/" + elementTestsRun + "</p>");
	
	// colour the results
	if (formatTestsFailed == 0) {
		testResultsDiv.children('p:eq(0)').css('background-color', 'green');
		testResultsDiv.children('p:eq(0)').css('color', 'white');
	} else {
		testResultsDiv.children('p:eq(0)').css('background-color', 'red');
	}
	if (parseTestFailed == 0) {
		testResultsDiv.children('p:eq(1)').css('background-color', 'green');
		testResultsDiv.children('p:eq(1)').css('color', 'white');
	} else {
		testResultsDiv.children('p:eq(1)').css('background-color', 'green');
	}
	if (elementTestsFailed == 0) {
		testResultsDiv.children('p:eq(2)').css('background-color', 'green');
		testResultsDiv.children('p:eq(2)').css('color', 'white');
	} else {
		testResultsDiv.children('p:eq(2)').css('background-color', 'green');
	}
});