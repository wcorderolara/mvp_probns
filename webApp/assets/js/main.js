$(function() {
  $("#menu-toggle").on("click", function(e) {
    var target;
    e.preventDefault();
    target = $(this).data('target');
    return $(target).slideToggle(300);
  });
  $(window).on('resize', function() {
    if ($(window).width() >= 1020) {
      return $("#menu").show();
    } else {
      return $("#menu").hide();
    }
  });
  $.fn.equalCols = function() {
    var calculate_cols_size;
    calculate_cols_size = (function(_this) {
      return function() {
        var max_columns_height;
        $(_this).removeAttr('style');
        max_columns_height = 0;
        _this.each(function(index, element) {
          var defaul_height;
          defaul_height = $(element).outerHeight();
          if (defaul_height > max_columns_height) {
            return max_columns_height = defaul_height;
          }
        });
        return _this.css('height', max_columns_height);
      };
    })(this);
    $(window).resize((function(_this) {
      return function() {
        if (window.innerWidth > 550) {
          return calculate_cols_size();
        } else {
          return $(_this).removeAttr('style');
        }
      };
    })(this));
    calculate_cols_size();
    return this;
  };
  $(window).load(function() {
    $('#dashboard').find('.cols').equalCols();
    return $('#clients').find('.cols').equalCols();
  });
  return $(window).load(function() {
    $('.listings__item-details').hide();
    $('.listings__item .arrow').on('click', function() {
      $(this).toggleClass('active');
      return $(this).parent().find('.listings__item-details').slideToggle(300);
    });
    $('.agents__item-details').hide();
    $('.agents__item .arrow').on('click', function() {
      $(this).toggleClass('active');
      return $(this).parent().find('.agents__item-details').slideToggle(300);
    });
    return $('.agents__item-actions a').click(function(e) {
      e.preventDefault();
      return $(this).tab('show');
    });
  });
});
