// remove empty p
$('p').each(function() {
  var $this = $(this);
  if ($this.html().replace(/\s|&nbsp;/g, '').length == 0) $this.remove();
});

// // Create a clone of the menu, right next to original - http://codepen.io/senff/pen/ayGvD
// $('.menu').addClass('original').clone().insertAfter('.menu').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();
$('header').addClass('original').clone().insertAfter('header').addClass('cloned nav-fixed').removeClass('original').hide();
if ($('#home, #inside').length) {
  scrollIntervalID = setInterval(stickIt, 10);
}

function stickIt() {
  var orgElementPos = $('.original').offset();
  orgElementTop = orgElementPos.top;
  if ($(window).scrollTop() >= (orgElementTop)) {
    // scrolled past the original position; now only show the cloned, sticky element.
    // Cloned element should always have same left position and width as original element.
    orgElement = $('.original');
    coordsOrgElement = orgElement.offset();
    leftOrgElement = coordsOrgElement.left;
    widthOrgElement = orgElement.css('width');
    $('.cloned').css('left', leftOrgElement + 'px').css('top', 0).css('width', widthOrgElement).show();
    $('.original').css('visibility', 'hidden');
  } else {
    // not scrolled past the menu; only show the original menu.
    $('.cloned').hide();
    $('.original').css('visibility', 'visible');
  }
}

// Mobile sharing
if ($('.fixed-mobile').length) {
  var topofDiv = $(".content-sidebar").offset().top; //gets offset of header
  var height = $(".content-sidebar").outerHeight(); //gets height of header
  $(window).scroll(function() {
    if ($(window).scrollTop() > (topofDiv + height)) {
      $(".fixed-mobile").addClass('hide');
    } else {
      $(".fixed-mobile").removeClass('hide');
    }
  });
}

// Navigation Overlay
$(document).ready(function($) {
  var navigation = $('.nav-main'),
    toggleNav = $('.nav-trigger');
  hideNav = $('header');
  //open/close the menu and cover layers
  toggleNav.on('click', function() {
    if (!toggleNav.hasClass('nav-close')) {
      //it means navigation is not visible yet - open it and animate navigation layer
      toggleNav.addClass('nav-close');
      navigation.addClass('fade-in');
      hideNav.addClass('nav-hide');
      hideNav.removeClass('nav-down');
    } else {
      //navigation is open - close it and remove navigation layer
      toggleNav.removeClass('nav-close');
      navigation.removeClass('fade-in');
      hideNav.addClass('nav-down');
      hideNav.removeClass('nav-hide');
    }
  });
});
$(window).load(function() {
  // ok shadow
  if ($('.error--404').length) {
    $('.error--404 h1').okshadow({
      color: '#d522f3',
      textShadow: true
    });
  }
  // add bootstrap class to form
  if ($('.EditingFormTable').length) {
    $('.tr').addClass('form-group row').removeClass('tr');
    $('.FieldLabel').addClass('col-sm-4 col-form-label').removeClass('td');
    $('.EditingFormValueCell').addClass('col-sm-8').removeClass('td');
  }
  // // check input
  // function checkForInput(element) {
  // // element is passed to the function ^
  // const $label = $(element);
  // if ($(element).val().length > 0) {
  //     $label.parent().addClass('Okay');
  // } else {
  //     $label.parent().removeClass('Okay').addClass('Error');
  //     }
  // }
  // // The lines below are executed on page load
  // $('.form-control').each(function() {
  //     checkForInput(this);
  // });
  // // The lines below (inside) are executed on change & keyup
  // $('.form-control').on('change keyup', function() {
  //     checkForInput(this);
  // });
});
// smooth scrolling - http://codepen.io/chriscoyier/pen/dpBMVP
$('.nav--quicklinks a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 100
      }, 1000);
      return false;
    }
  }
});
// Select FX - codrops
//(function() {
$(window).load(function() {
  [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function(el) {
    new SelectFx(el);
  });
  $('.cs-options li').on('click', function() {
    var parentelID = $(this).parents('div').next('select.cs-select').attr('id');
    switch (parentelID) {
      case "articleCat":
        var newVal = $(this).data('value');
        angular.element(document.getElementById('articleCat')).scope().loadArticlebyCategory(newVal);
        break;
      case "chartHitz":
        var newVal = $(this).data('value');
        angular.element(document.getElementById('chartHitz')).scope().loadChartbyCategory(newVal);
        break;
      case "videoCat":
        var newVal = $(this).data('value');
        angular.element(document.getElementById('videoCat')).scope().loadVideobyCategory(newVal);
        break;
      case "photoCat":
        var newVal = $(this).data('value');
        angular.element(document.getElementById('photoCat')).scope().loadPhotobyCategory(newVal);
    }
    //var newVal = $(this).data('value');
    //console.log('newVal here', newVal);
    /*var select = $(this).parents('div').next('select.cs-select').attr('id');
    console.log('select here', select);
    var newVal = $('.cs-selected').data('value');
    $('select.cs-select').val(newVal).change();
    console.log('newval here', newVal);*/
    /*var newVal = $('.cs-selected').data('value');
    $('select.cs-select').val(newVal).change();
    angular.element(document.getElementById('articleCat')).scope().loadArticlebyCategory(newVal);
    angular.element(document.getElementById('videoCat')).scope().loadVideobyCategory(newVal);
    console.log(newVal);*/
  });
  //})();
});

function FacebookShare() {
  //run GAOutboundClick
  dataLayer.push({
    'event': 'outboundClick',
    'eventId': 'FB',
    'eventCode': 'SOCIAL',
  });
  //Run DMP
  dataLayer.push({
    'event': 'userAction',
    'dmp_web_social_engagement': 'Share Facebook'
  });
  var curUrl = $(location).attr('href');
  FB.ui({
    method: 'share',
    href: curUrl,
    display: 'popup'
  }, function(response) {
    if (response && !response.error_code) {
      //alert('Posting completed.');
    } else {
      // alert('Error while posting.');
    }
  });
};

function TwitterShare() {
  //run GAOutboundClick
  dataLayer.push({
    'event': 'outboundClick',
    'eventId': 'TW',
    'eventCode': 'SOCIAL',
  });
  //Run DMP
  dataLayer.push({
    'event': 'userAction',
    'dmp_web_social_engagement': 'Share Twitter'
  });
  var metatitle = $('meta[name=twitter\\:title]').attr('content');
  if (metatitle == 'undefined' || metatitle == null) {
    metatitle = document.title;
    // console.log(metatitle);
  } else {
    metatitle = encodeURIComponent(metatitle);
    //console.log(metatitle);
  }
  var curUrl = "https://twitter.com/share?url=" + $(location).attr('href') + "&text=" + metatitle;
  window.open(curUrl, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
}
// // Select FX - codrops
// $(window).load(function() {
//  [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
//      new SelectFx(el);
//  });
// });
// $('.cs-options li').on('click', function(){
//  var newVal = $('.cs-selected').data('value');
//  $('select.cs-select').val(newVal).change();
//  console.log(newVal);
//  var scope = angular.element($("#articleCat")).scope();
//   scope.$apply(function(){
//   scope.selectACategory = newVal;
//   });
// });
var initPhotoSwipeFromDOM = function(gallerySelector) {
  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  var parseThumbnailElements = function(el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;
    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element
      // include only element nodes
      if (figureEl.nodeType !== 1) {
        continue;
      }
      linkEl = figureEl.children[0]; // <a> element
      size = linkEl.getAttribute('data-size').split('x');
      // create slide object
      item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };
      if (figureEl.children.length > 1) {
        // <figcaption> content
        item.title = figureEl.children[1].innerHTML;
      }
      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute('src');
      }
      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }
    return items;
  };
  // find nearest parent element
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };
  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    var eTarget = e.target || e.srcElement;
    // find root element of slide
    var clickedListItem = closest(eTarget, function(el) {
      return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    });
    if (!clickedListItem) {
      return;
    }
    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;
    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }
      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }
    if (index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };
  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function() {
    var hash = window.location.hash.substring(1),
      params = {};
    if (hash.length < 5) {
      return params;
    }
    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split('=');
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }
    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }
    return params;
  };
  var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
      gallery,
      options,
      items;
    items = parseThumbnailElements(galleryElement);
    // define options (if needed)
    options = {
      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),
      getThumbBoundsFn: function(index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
      }
    };
    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }
    // exit if index not found
    if (isNaN(options.index)) {
      return;
    }
    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.listen('gettingData', function(index, item) {
      if (item.w < 1 || item.h < 1) { // unknown size
        var img = new Image();
        img.onload = function() { // will get size after load
          item.w = this.width; // set image width
          item.h = this.height; // set image height
          gallery.invalidateCurrItems(); // reinit Items
          gallery.updateSize(true); // reinit Items
        }
        img.src = item.src; // let's download image
      }
    });
    gallery.init();
  };
  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }
  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};
// execute above function
initPhotoSwipeFromDOM('.photo-gallery');
// Scrollreveal.js -- https://github.com/jlmakes/scrollreveal
// window.sr = ScrollReveal();
// sr.reveal('.section-recent, .tiles-listing--items, .section-advert, .feat-branding, .articles-box-item, .section-category, .section-chart, .videos-recent-item, .section-video-bottom', {
//     origin: 'bottom',
//     easing: 'ease',
//     scale: { direction: 'up', power: '2%' }
// }, 100);
// Giphy Responsive
function giphyResponsive() {
  // Find all iframes
  var $iframes = $('iframe[src*="giphy.com"]');
  // Find &#x26; save the aspect ratio for all iframes
  $iframes.each(function() {
    $(this).data("ratio", this.height / this.width)
      // Remove the hardcoded width &#x26; height attributes
      .removeAttr("width").removeAttr("height");
  });
  // Resize the iframes when the window is resized
  $(window).resize(function() {
    $iframes.each(function() {
      // Get the parent container&#x27;s width
      var width = $(this).parent().width();
      $(this).width(width).height(width * $(this).data("ratio"));
    });
    // Resize to fix all iframes on page load.
  }).resize();
}

$('iframe').each(function() {
  if($('iframe[src*="giphy.com"]')){
    giphyResponsive();
    console.log('wrap ' + $('iframe[src*="giphy.com"]').length + ' giphy');
  }
});
// Home Podcast
var flag = 0;
// function to change the source of the Audio player and The hi Title
// Audio Player id = Audio1
// Source id = AudioPlayer
// h1 id = TrafficTitle
// the function accept 2 arguments
// 1. The url Address of the source
// 2. The Element that call the function ( the inner html text ) .
function changeTheSRCOfthePlayer(datasrc, element) {
  //Debug
  //console.log(datasrc);
  //console.log(element);
  // reset the whole list
  //resetthewholelist();
  resetthewholelistNew();
  //change the element class to active
  if ($('#home').length) {
    element.className = "home-podcast--item home-podcast--item__active";
  } else {
    element.className = "podcast--item podcast--item__active";
  }
  //element.id = "PodcastList-Active";
  // change the player url
  document.getElementById("audioplayer").src = datasrc;
  $('#podcast-title').text($(element).attr('data-title'));
  $('#podcast-description').text($(element).attr('data-desc'));
  // var text = document.getElementById("TrafficTitle");
  // text.innerHTML = element.innerHTML;
  var audio = document.getElementById('audio');
  audio.load();
  if (flag != 0) {
    audio.play();
    console.log("d-0");
    $('div.audioplayer').addClass('audioplayer-playing');
    //
  } else {
    //audio.play();
    console.log("d-1");
  }
  flag++;
}
// function used by the changeTheSRCOfthePlayer to reset all list back to  normal
function resetthewholelistNew() {
  var elems = document.getElementsByTagName('a'),
    i;
  for (i in elems) {
    if ((' ' + elems[i].className + ' ').indexOf('home-podcast--item') > -1) {
      elems[i].className = 'podcast--item';
    }
  }
}
//function to list only 10 list
function showfirst10Element() {
  var elems = document.getElementsByTagName('a'),
    i;
  for (var i = 0, e = elems[0], n = 10; i < n; e = elems[++i]) {
    if ((' ' + elems[i].className + ' ').indexOf('home-podcast--item') > -1) {
      elems[i].style.display = "block";
    }
  }
}
//fucntion to list down all
function showAllElement() {
  var AllElement = document.getElementsByTagName('a'),
    i;
  for (var i = 0, e = AllElement[0], n = AllElement.length; i < n; e = AllElement[++i]) {
    if ((' ' + AllElement[i].className + ' ').indexOf('home-podcast--item') > -1) {
      AllElement[i].style.display = "block";
    }
  }
}
//funnction to hide all
function hideAllElement() {
  var AllElement = document.getElementsByTagName('a', i);
  for (var i = 0, e = AllElement[0], n = AllElement.length; i < n; e = AllElement[++i]) {
    if ((' ' + AllElement[i].className + ' ').indexOf('home-podcast--item') > -1) {
      AllElement[i].style.display = "none";
    }
  }
}

function CheckStatus(element) {
  if (element.id == "ShowAll") {
    showAllElement();
    element.id = "HideAll";
    element.innerHTML = "Show Less";
  } else {
    hideAllElement();
    element.id = "ShowAll";
    element.innerHTML = "Show All";
    showfirst10Element()
  }
}

function startLoadList() {
  var AllElement = document.getElementsByTagName('a', i);
  var j = 0;
  for (var i = 0, e = AllElement[0], n = AllElement.length; i < n; e = AllElement[++i]) {
    if ((' ' + AllElement[i].className + ' ').indexOf('home-podcast--item') > -1) {
      j = j + 1;
      if (j < 10) {
        AllElement[i].style.display = "block";
      } else {
        AllElement[i].style.display = "none";
      }
    }
  }
}


function imgSrc(dataimg, element) {
  document.getElementById("podcast-image").src = dataimg;
}

function descSrc(datadesc, element) {
  document.getElementById("podcast-description").src = datadesc;
}

function PlayThis(el) {
  if ($('#home').length) {
    $('#podcast-list ul > li.home-podcast--item__active').removeClass('home-podcast--item__active');
    $(el).addClass('home-podcast--item home-podcast--item__active');
  } else {
    $('#podcast-list ul > li.podcast--item__active').removeClass('podcast--item__active');
    $(el).addClass('podcast--item podcast--item__active');
  }
  changeTheSRCOfthePlayer($(el).attr('data-audio'), $(el));
  imgSrc($(el).attr('data-img'), $(el));
}


// 3095442 - hitz
// 3245127 - mix
// 3245172 - raaga
// 3245107 - lite

// 3095487 - era
// 3244669 - sinar
// 3244714 - gegar

// 3095517 - melody
// 3095563 - my

// news
// 3245257

// traffic
// 3245365

var hitz = "https://api.audioboom.com/channels/3095442/audio_clips.json?";
var mix = "https://api.audioboom.com/channels/3245127/audio_clips.json?";
var raaga = "https://api.audioboom.com/channels/3245172/audio_clips.json?";
var lite = "https://api.audioboom.com/channels/3245107/audio_clips.json?";

var era = "https://api.audioboom.com/channels/3095487/audio_clips.json?";
var sinar = "https://api.audioboom.com/channels/3244669/audio_clips.json?";
var gegar = "https://api.audioboom.com/channels/3244714/audio_clips.json?";
var zayan = "https://api.audioboom.com/channels/4930931/audio_clips.json?";

var melody = "https://api.audioboom.com/channels/3095517/audio_clips.json?";
var my = "https://api.audioboom.com/channels/3095563/audio_clips.json?";

var BMnews = "https://api.audioboom.com/channels/3245257/audio_clips.json?tag=bm&page[items]=25";
var ENGnews = "https://api.audioboom.com/channels/3245257/audio_clips.json?tag=eng&page[items]=25";
var CHNnews = "https://api.audioboom.com/channels/3245257/audio_clips.json?tag=chn&page[items]=25";
var TMLnews = "https://api.audioboom.com/channels/3245257/audio_clips.json?tag=tml&page[items]=25";

var BMsports = "https://api.audioboom.com/channels/3245365/audio_clips.json?tag=bm&page[items]=25";
var ENGsports = "https://api.audioboom.com/channels/3245365/audio_clips.json?tag=eng&page[items]=25";
var CHNsports = "https://api.audioboom.com/channels/3245365/audio_clips.json?tag=chn&page[items]=25";
var TMLsports = "https://api.audioboom.com/channels/3245365/audio_clips.json?tag=tml&page[items]=25";

var mixFlirty = "https://api.audioboom.com/channels/3245127/audio_clips.json?tag=FlirtyAt930&page[items]=25";

var dataURL = "";
// load sports update > news update > normal podcast
if (window.location.href.indexOf("mix.my/shows/mix-breakfast") > -1)
  var dataURL = mixFlirty;
else if (window.location.href.indexOf("hitz.com.my/news/sports-update") > -1 || window.location.href.indexOf("mix.my/news/sports-update") > -1 || window.location.href.indexOf("lite.my/news/sports-update") > -1) {
  var dataURL = ENGsports;
  console.log("load sport eng")
} else if (window.location.href.indexOf("era.je") > -1 && window.location.href.indexOf("sukan") > -1 || window.location.href.indexOf("sinar.my") > -1 && window.location.href.indexOf("sukan") > -1 || window.location.href.indexOf("gegar.my") > -1 && window.location.href.indexOf("sukan") > -1) {
  var dataURL = BMsports;
  console.log("load sport bm")
} else if (window.location.href.indexOf("my.com.my/news/sports-update") > -1 || window.location.href.indexOf("melody.my/news/sports-update") > -1) {
  var dataURL = CHNsports;
  console.log("load sport chi")
} else if (window.location.href.indexOf("raaga.my/news/sports-update") > -1) {
  var dataURL = TMLsports;
  console.log("load sport tamil")
} else if (window.location.href.indexOf("hitz.com.my/news/news-update") > -1 || window.location.href.indexOf("mix.my/news/news-update") > -1 || window.location.href.indexOf("lite.my/news/news-update") > -1) {
  var dataURL = ENGnews;
  console.log("load news eng")
} else if (window.location.href.indexOf("era.je") > -1 && window.location.href.indexOf("buletin") > -1 || window.location.href.indexOf("sinar.my") > -1 && window.location.href.indexOf("buletin") > -1 || window.location.href.indexOf("gegar.my") > -1 && window.location.href.indexOf("buletin") > -1) {
  var dataURL = BMnews;
  console.log("load news bm")
} else if (window.location.href.indexOf("my.com.my/news/news-update") > -1 || window.location.href.indexOf("melody.my/news/news-update") > -1 || window.location.href.indexOf("goxuan.my/news/news-feed") > -1) {
  var dataURL = CHNnews;
  console.log("load news chi")
} else if (window.location.href.indexOf("raaga.my/news/news-update") > -1) {
  var dataURL = TMLnews;
  console.log("load news tamil")
} else if (window.location.href.indexOf("hitz.com.my") > -1) {
  var dataURL = hitz;
  console.log("load hitz")
} else if (window.location.href.indexOf("mix.my") > -1) {
  var dataURL = mix;
  console.log("load mix")
} else if (window.location.href.indexOf("lite.my") > -1) {
  var dataURL = lite;
  console.log("load lite")
} else if (window.location.href.indexOf("raaga.my") > -1) {
  var dataURL = raaga;
  console.log("load raaga")
} else if (window.location.href.indexOf("era.je") > -1) {
  var dataURL = era;
  console.log("load era")
} else if (window.location.href.indexOf("sinar.my") > -1) {
  var dataURL = sinar;
  console.log("load sinar")
} else if (window.location.href.indexOf("gegar.my") > -1) {
  var dataURL = gegar;
  console.log("load gegar")
} else if (window.location.href.indexOf("zayan.my") > -1) {
  var dataURL = zayan;
  console.log("load zayan")
} else if (window.location.href.indexOf("my.com.my") > -1) {
  var dataURL = my;
  console.log("load my")
} else if (window.location.href.indexOf("melody.my") > -1) {
  var dataURL = melody;
  console.log("load melody")
} else if (window.location.href.indexOf("goxuan.my") > -1) {
  var dataURL = goxuan;
  console.log("load goxuan")
}

$.ajax({
  url: dataURL,
  type: "GET",
  crossDomain: true,
  dataType: "json",
  cache: true,
  success: function(response) {
    if ($('#home').length) {
      HomePodcast(response);
    } else {
      InsidePodcast(response);
    }
    $('#loader').hide();
  },
  error: function(xhr, status) {
    console.log("error");
  }
});

function HomePodcast(response) {
  var tmp = "";
  console.log(response);
  if (response.body.audio_clips.length > 0) {
    tmp = "<ul>"
    for (var y = 0; y < response.body.audio_clips.length; y++) {
      var myDate = new Date(response.body.audio_clips[y]['recorded_at_ts'] * 1000);
      tmp = tmp + "<li onclick='javascript:PlayThis(this)' class='home-podcast--item' data-audio='" + response.body.audio_clips[y].urls.high_mp3 + "' data-img='" + response.body.audio_clips[y].urls.image + "' data-desc='" + response.body.audio_clips[y]['description'] + "' data-title=\"" + response.body.audio_clips[y]['title'] + "\"><p>" + response.body.audio_clips[y]['title'] + "</p></li>";
      if (y == 0) {
        $('#podcast-title').text(response.body.audio_clips[y]['title']);
        $('#podcast-description').text(response.body.audio_clips[y]['description']);
        $('#podcast-image').attr('src', response.body.audio_clips[y].urls.image);
        $('#podcast-date').text(myDate.toString().replace(/GMT.*/g, ""));
        $('#audioplayer').attr('src', response.body.audio_clips[y].urls.high_mp3);
      }
    }
    tmp = tmp + "</ul>";
    $('#podcast-list').html(tmp);
    // $('#wrapper-audio2').after(tmp);
    changeTheSRCOfthePlayer(response.body.audio_clips[0].urls.high_mp3, $('#podcast-list > ul >li')[0]);
    // imgSrc(response.body.audio_clips[0].urls.img,$('#podcast-image')[0]);

    console.log('init latest audio');
    console.log($('#audio').length);
    $('#audio').audioPlayer();
  } else {
    console.log("No Latest Traffic Podcast");
  }
}

function InsidePodcast(response) {
  var tmp = "";
  console.log(response);
  if (response.body.audio_clips.length > 0) {
    tmp = "<ul>"
    for (var y = 0; y < response.body.audio_clips.length; y++) {
      var myDate = new Date(response.body.audio_clips[y]['recorded_at_ts'] * 1000);
      tmp = tmp + "<li onclick='javascript:PlayThis(this)' class='podcast--item' data-audio='" + response.body.audio_clips[y].urls.high_mp3 + "' data-img='" + response.body.audio_clips[y].urls.image + "' data-title=\"" + response.body.audio_clips[y]['title'] + "\"><p>" + response.body.audio_clips[y]['title'] + "</p></li>";
      if (y == 0) {
        $('#podcast-title').text(response.body.audio_clips[y]['title']);
        $('#podcast-description').text(response.body.audio_clips[y]['description']);
        $('#podcast-image').attr('src', response.body.audio_clips[y].urls.image);
        $('#podcast-date').text(myDate.toString().replace(/GMT.*/g, ""));
        $('#audioplayer').attr('src', response.body.audio_clips[y].urls.high_mp3);
      }
    }
    tmp = tmp + "</ul>";
    $('#podcast-list').html(tmp);
    // $('#wrapper-audio2').after(tmp);
    changeTheSRCOfthePlayer(response.body.audio_clips[0].urls.high_mp3, $('#podcast-list > ul >li')[0]);
    console.log('init latest audio');
    console.log($('#audio').length);
    $('#audio').audioPlayer();
  } else {
    console.log("No Latest Traffic Podcast");
  }
}


$("p:contains('via GIPHY')").wrap('<div class="label label-source label-source__giphy"></div>')
