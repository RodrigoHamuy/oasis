// Create the appropriate Google Analytics tracker based on the user's selected country.

var gaid;

switch (window.digitalData.site.country) {
  case 'GB':
    gaid = 'UA-304124-16';
    break;
  case 'AU':
    gaid = 'UA-25854757-5';
    break;
  case 'FR':
    gaid = 'UA-25854757-6';
    break;
  case 'DE':
    gaid = 'UA-25854757-3';
    break;
  case 'NL':
    gaid = 'UA-25854757-7';
    break;
  case 'SE':
    gaid = 'UA-25854757-9';
    break;
  case 'US':
    gaid = 'UA-25854757-8';
    break;
}

(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', gaid, 'auto');
ga('require', 'ec');
ga('send', 'pageview');
