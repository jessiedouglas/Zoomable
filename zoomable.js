$.Zoomable = function (el) {
  this.$el = $(el);
  this.sizeFocusBox = 50

  $(".zoomable").on("mousemove", this.showFocusBox.bind(this));
  $(".zoomable").on("mouseleave", this.removeFocusBox.bind(this));
};

$.Zoomable.prototype.showFocusBox = function (event) {
  if (!this.$focusBox) {
    $(".zoomable").append('<div class="focus-box">');
  }

  this.$focusBox = this.$focusBox || $(".focus-box");
  var imageWidth = 200;
  var imageHeight = 200;
  if (event.pageX - this.sizeFocusBox / 2 < 0) {
    var boxLeft = 0;
  } else if (event.pageX + this.sizeFocusBox / 2 > imageWidth) {
    var boxLeft = imageWidth - this.sizeFocusBox;
  } else {
    var boxLeft = event.pageX - 25;
  }

  if (event.pageY - this.sizeFocusBox / 2 < 0) {
    var boxTop = 0;
  } else if (event.pageY + this.sizeFocusBox / 2 > imageHeight) {
    var boxTop = imageHeight - this.sizeFocusBox;
  } else {
    var boxTop = event.pageY - 25;
  }

  $(".focus-box").css("top", boxTop);
  $(".focus-box").css("left", boxLeft);

  this.showZoom(boxTop + 25, boxLeft + 25);
};

$.Zoomable.prototype.removeFocusBox = function (event) {
  $(".focus-box").remove();
  this.$focusBox = null;

  $(".zoomed-image").remove();
  this.$zoomedImage = null;
};

$.Zoomable.prototype.showZoom = function (xDiff, yDiff) {
  var scale = (200 / this.sizeFocusBox) * 100
  var backgroundPosition =  (yDiff/2) + "%" + (xDiff/2) + "%";


  if (!this.$zoomedImage) {
    $("body").append('<div class="zoomed-image">');
  }
  var backgroundImage = 'url(' + $(".zoomable > img").attr("src") + ')'

  this.$zoomedImage = this.$zoomedImage || $(".zoomed-image")
  $(".zoomed-image").css("width", $(window).height());
  $(".zoomed-image").css("height", $(window).height());
  $(".zoomed-image").css("background-image", backgroundImage);
  $(".zoomed-image").css("background-size", scale + "%");
  $(".zoomed-image").css("background-position", backgroundPosition)
};

$.fn.zoomable = function () {
  return this.each(function () {
    new $.Zoomable(this);
  });
};