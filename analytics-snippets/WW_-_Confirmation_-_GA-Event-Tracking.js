for (var i = 0; i < digitalData.bag.products.length; i++) {
  var product = digitalData.bag.products[i];
  ga('ec:addProduct', {
    'id': product.id,
    'name': product.name,
    'category': product.masterCategory,
    'variant': product.colour,
    'price': product.price,
    'coupon': digitalData.bag.promocodes,
    'quantity': product.quantity
  });
}

ga('ec:setAction', 'purchase', {
  'id': digitalData.orderId,
  'revenue': digitalData.bag.totals.grandTotal,
  'tax': digitalData.bag.totals.tax,
  'shipping': digitalData.delivery.price,
  'coupon': digitalData.bag.promocodes
});

ga('send', 'pageview');
