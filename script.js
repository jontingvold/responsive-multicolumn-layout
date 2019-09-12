
var windowWidth = $(window).innerWidth();
var windowHeight = $(window).innerHeight();

console.log("windowWidth/windowHeight: " + windowWidth + "/" + windowHeight);

var smallScreensWidth = 500;
var isSmallWidth = windowWidth < smallScreensWidth;

if (!isSmallWidth) {
    var leftMargin = 18*3;
    var rightMargin = 18*3;

    var extraTopMargin = 18*2; // + pagePadding
    var pagePadding = 18*2;

    var smallMargins = 18;
    var smallBottomMargin = 36;
} else {
    var leftMargin = 18;
    var rightMargin = 18;

    var extraTopMargin = 0; // + pagePadding
    var pagePadding = 18;
}

var usersContentWidth = windowWidth - (leftMargin+rightMargin);
var usersContentHeight = windowHeight;
$("#viewport").css("margin-left", leftMargin+"px");
$("#viewport").css("margin-right", rightMargin+"px");

var webArealIpad = 768*(1024-96);
var minAreal = webArealIpad-(1000*50);
var maxAreal = 1200*1000

var minWidth = 280;
var maxWidth = 1300;
var minHeight = (minAreal/windowWidth);
var maxHeight = (maxAreal/windowHeight);

console.log("min/maxWidth: " + minWidth + "/" + maxWidth);
console.log("min/maxHeight: " + minHeight + "/" + maxHeight);

var navigation_on = windowWidth > smallScreensWidth;
var pagination_on = windowHeight < maxHeight && windowHeight > minHeight;


// Align center if browser window bigger than page width.
if (windowWidth > maxWidth) {
	var leftViewportPadding = (windowWidth - maxWidth) / 2;
	$("#viewport").css("margin-left", leftViewportPadding + "px");
}

if (pagination_on) {
	$("#viewport").css("margin-top", extraTopMargin+"px");
}

if (usersContentWidth > maxWidth) {
    var viewportWidth = maxWidth;
} else if (usersContentWidth > minWidth) {
    var viewportWidth = usersContentWidth;
} else {
    var viewportWidth = minWidth;
}

if (usersContentHeight > maxHeight) {
    var viewportHeight = maxHeight;
} else if (usersContentHeight > minHeight) {
    var viewportHeight = usersContentHeight;
} else {
    var viewportHeight = minHeight;
}

console.log("viewportWidth/viewportHeight: " + viewportWidth + "/" + viewportHeight);

var cfConfig = {
	viewportWidth:              viewportWidth,
	viewportHeight:             viewportHeight,
	columnWidth:                250,
	lineHeight: 		        18,
	standardiseLineHeight:      true,
	pagePadding:                extraTopMargin+pagePadding,
	minFixedPadding:            0.5,        // Min grid heights between fixed elements (images) and columns
	columnFragmentMinHeight:    50,         // Min column height
	pageArrangement:            'vertical',
    allowReflow:                false,
	noWrapOnTags:               ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', "figure"],
	//showGrid: true,
    //debug: true,
}

var cf = new FTColumnflow('target', 'viewport', cfConfig);

$(window).resize(function() {
    
	// This keeps Safari on iPhone/iPad from reloading the page when a user scrolls down.
    var windowWidthAtLoading = windowWidth;
    var windowWidthNow = $(window).innerWidth();
    var windowHeightAtLoading = windowHeight;
    var windowHeightNow = $(window).innerHeight();
    
	if ( Math.abs(windowWidthAtLoading -  windowWidthNow) > 30
	   || Math.abs(windowHeightAtLoading - windowHeightNow) > 30 ) {
		
        location.reload(false);
	}
});

$(document).ready(function() {
    
	// FTColumnflow: Do not break columns right after new headline.
	$("h2, h3, h4, h5, h6").addClass("keepwithnext")
	
	cf.flow(document.getElementById('flowedContent'), document.getElementById('fixedContent'));
    
	//cf.reflow(cfConfig);
	
	$('#viewport').fullpage({
		sectionSelector: '.cf-page-1, .cf-page-2, .cf-page-3, .cf-page-4, .cf-page-5, .cf-page-6, .cf-page-7, .cf-page-8, .cf-page-9, .cf-page-10, .cf-page-11, .cf-page-12, .cf-page-13, .cf-page-14, .cf-page-15',
		autoScrolling: false,
		
		//scrollingSpeed: 600,
		
		//controlArrows: true,
		//scrollBar: true,
		navigation: navigation_on ? true : false,
		navigationPosition: 'right'	
	});
	
	if (pagination_on) {
		$("body").css("scroll-snap-type", "y mandatory");
        $("body").css("-ms-scroll-snap-type", "mandatory");
        $("body").css("-ms-scroll-snap-points-y", "snapInterval(0, 100%)");
        $(".cf-page").css("scroll-snap-align", "start");
        
        // Bugfix Chrome
		var isChromium = window.chrome;
		if(isChromium) {
			$("body").css("scroll-padding-top", extraTopMargin+"px");
		}
		
	}
    
    // Fix
    if (pagination_on) {
        $(".cf-page:last-of-type").css("height", viewportHeight-extraTopMargin+"px");
        $(".cf-page:last-of-type .fp-tableCell").css("height", viewportHeight-extraTopMargin+"px");
    }
});