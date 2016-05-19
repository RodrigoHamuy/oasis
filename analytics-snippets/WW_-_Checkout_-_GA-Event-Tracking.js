$(function(){

	// Report the stage the user is at when they proceed through Checkout
	// Step 1: Delivery
	if ($('.checkout-progress-indicator .active span span').text() == 'Delivery') {
		ga('ec:setAction','checkout', {'step': 1});
		ga('send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/vpv/delivery');
	}

	// Step 2: Your Details (also known as the Billing page)
	if ($('.checkout-progress-indicator .active span span').text() == 'Your Details') {
		ga('ec:setAction','checkout', {'step': 2});
		ga('send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/vpv/details');

		// Step 3: Payment
		// Attach a click handler to the button where the user clicks to go to the payment page.
		// This payment page is not on Demandware, so we cannot add code to it. The event must be bound to the button instead.
		$('button#toPayment').click(function(){
			ga('ec:setAction','checkout', {'step': 3});
			ga('send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/vpv/payment');
		});
	}

});
