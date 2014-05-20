'use strict';

applause.directive('fit', function ($window) {

  var slide = document.querySelector('.slide'),
      x = $window.innerWidth / slide.clientWidth,
      y = $window.innerHeight / slide.clientHeight,
      scale = Math.min(x,y),
      fromTop = ($window.innerHeight - (slide.clientHeight * scale)) / 2,
      fromLeft = ($window.innerWidth - (slide.clientWidth * scale)) / 2,
      rule,

      linkFn = function (scope, element) {
        rule = 'scale(' + scale + ')';
        element.css({
          'transformOrigin': '0 0',
          'webkitTransformOrigin': '0 0',
          'transform': rule,
          'webkitTransform': rule,
          'top': fromTop + 'px',
          'left': fromLeft + 'px'
        });
      };

  //angular.element($window).on('resize', linkFn);

  return {
    restrict: 'A',
    link: linkFn
  };
});
