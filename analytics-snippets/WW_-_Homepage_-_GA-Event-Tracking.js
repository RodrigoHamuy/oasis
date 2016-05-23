$(function() {

  // Clicking on the homepage hero section.
  $('.hero_section').click(function(){
    ga('send', 'event', 'Homepage', 'Hero click', $(this).find('img').attr('alt'));
  });

  // If secondary GA tracking is enabled
  if (window.secondaryGATracking == true) {

    // Add data attributes to identify rows and boxes.
    $('.content_row').each(function(index){
      $(this).attr('data-row-number', index + 1)

      var contentRowChildren = $(this).children();
      contentRowChildren.each(function(childIndex){
        $(this).addClass('homepage-box').attr('data-box-number', 'Box ' + (childIndex + 1).toString() + ' of ' + contentRowChildren.length);
      });
    });

    // When a homepage box is clicked
    $('.content_row a').click(function(){
      var rowNumber = $(this).parents('.content_row').attr('data-row-number');
      var boxNumber = $(this).parents('.homepage-box').attr('data-box-number');
      var boxTitle = $(this).attr('data-label');
      ga('send', 'event', 'Homepage', 'Row ' + rowNumber + ' - ' + boxNumber, boxTitle);
    });
  }

});
