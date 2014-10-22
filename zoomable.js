$.Zoomable = function (el) {
  this.$el = $(el);
  this.sizeFocusBox = 50

  this.setCss()

  $(".zoomable").on("mousemove", this.showFocusBox.bind(this));
  $(".zoomable").on("mouseleave", this.removeFocusBox.bind(this));
};

// SET IN CSS; DO NOT CHANGE WITHOUT CHANGING CSS
  $.Zoomable.PAGELEFT = 230;
  $.Zoomable.PAGETOP = 135;
  $.Zoomable.imageSize = 200;
  $.Zoomable.borderSize = 5;

$.Zoomable.prototype.setCss = function () {
  $(".zoomable").css("width", $.Zoomable.imageSize + "px")
};

$.Zoomable.prototype.showFocusBox = function (event) {
  if (!this.$focusBox) {
    $(".zoomable").append('<div class="focus-box">');
  }

  this.$focusBox = this.$focusBox || $(".focus-box");

  if (event.pageX - this.sizeFocusBox < $.Zoomable.PAGELEFT + $.Zoomable.borderSize) {
    var boxLeft = 0;
  } else if (event.pageX > $.Zoomable.PAGELEFT + $.Zoomable.imageSize) {
    var boxLeft = $.Zoomable.imageSize - this.sizeFocusBox;
  } else {
    var boxLeft = event.pageX - this.sizeFocusBox - $.Zoomable.PAGELEFT - $.Zoomable.borderSize;
  }

  if (event.pageY - this.sizeFocusBox / 2 < $.Zoomable.PAGETOP + 0) {
    var boxTop = 0;
  } else if (event.pageY > $.Zoomable.PAGETOP + $.Zoomable.imageSize - this.sizeFocusBox / 2 ) {
    var boxTop = $.Zoomable.imageSize - this.sizeFocusBox;
  } else {
    var boxTop = event.pageY - this.sizeFocusBox / 2 - $.Zoomable.PAGETOP;
  }

  $(".focus-box").css("top", boxTop);
  $(".focus-box").css("left", boxLeft);

  this.showZoom(boxLeft, boxTop);
};

$.Zoomable.prototype.removeFocusBox = function (event) {
  $(".focus-box").remove();
  this.$focusBox = null;

  $(".zoomed-image").remove();
  this.$zoomedImage = null;
};

$.Zoomable.prototype.showZoom = function (xDiff, yDiff) {
  var scale = ($.Zoomable.imageSize / this.sizeFocusBox) * 100
  var heightDiff = $.Zoomable.imageSize - this.sizeFocusBox
  var backgroundPosition =  (xDiff * 100)/heightDiff + "% " + (yDiff*100)/heightDiff + "%";


  if (!this.$zoomedImage) {
    $("body").append('<div class="zoomed-image">');
  }
  var backgroundImage = 'url(' + $(".zoomable > img").attr("src") + ')'
  var height = $(window).height() > 600 ? 600 : $(window).height()

  this.$zoomedImage = this.$zoomedImage || $(".zoomed-image")
  $(".zoomed-image").css("width", height);
  $(".zoomed-image").css("height", height);
  $(".zoomed-image").css("background-image", backgroundImage);
  $(".zoomed-image").css("background-size", scale + "%");
  $(".zoomed-image").css("background-position", backgroundPosition)
};

$.fn.zoomable = function () {
  return this.each(function () {
    new $.Zoomable(this);
  });
};