/*
 * Plugin: MediumLightbox v1.1
 * Author: Davide Calignano
 * Author: Nick Goodliff, Hypergram
 */


function MediumLightbox(element, options) {
	"use strict";

	// quit if no root element
	if (!element) return;

	var zoomedImg = document.createElement('div');
	zoomedImg.className = 'zoom-wrapper';
	var screenSize ={};
	var options = options || {};
	var margin = options.margin || 50;
	var container = options.container || 'body';
	var isZoomed = false;

	// Get the scrollbar width
	var scrollDiv = document.createElement("div");
	scrollDiv.className = "scrollbar-measure";
	document.body.appendChild(scrollDiv);
	var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);


	//Get size screen x and y
	function updateScreenSize(){
		var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		screenSize.x = x;
		screenSize.y = y;
	}

	updateScreenSize();

	//recalc size screen on resize
	window.addEventListener("resize", updateScreenSize);

	function zoom(){
		if(!isZoomed){

			//Set status
			isZoomed = !isZoomed;

			//Get image to be removed on scroll
			var origImg = this;

			var imgH = origImg.getBoundingClientRect().height;
			var imgW = origImg.getBoundingClientRect().width;
			var imgL = origImg.getBoundingClientRect().left;
			var imgT = origImg.getBoundingClientRect().top;
			var realW, realH, fullSizeSrc;

			zoomedImg.img = this.cloneNode(false);
			// Get full src
			if(origImg.dataset){
				fullSizeSrc = origImg.dataset.src;
			}else{
				fullSizeSrc = origImg.getAttribute("data-src");
			}


			var img = new Image();
			img.onload = function() {
				realW = this.width;
				realH = this.height;

				if(zoomedImg.img.dataset){
					zoomedImg.img.dataset.origSrc = zoomedImg.img.src;
				}
				else {
					zoomedImg.img.setAttribute("data-orig-src",zoomedImg.img.src);
				}
				zoomedImg.img.src = fullSizeSrc;
				zoomedImg.img.className = 'zoomed-img';
				zoomedImg.img.style.top = imgT + 'px';
				zoomedImg.img.style.left = imgL + 'px';
				zoomedImg.img.style.width = imgW + 'px';
				zoomedImg.img.style.height = imgH + 'px';
				zoomedImg.img.styleOrig = zoomedImg.img.style.cssText;
				//create overlay div
				zoomedImg.overlay = document.createElement('div');
				zoomedImg.overlay.className = 'zoom-overlay';
				zoomedImg.overlay.style.cssText = 'height:'+(screenSize.y)+'px; width: '+screenSize.x+'px;';

				//create wrapper for img and set attributes
				zoomedImg.wrapper = document.createElement('div');
				zoomedImg.wrapper.className = 'zoomed-img-wrap';

				// this.wrapper.style.cssText = 'transform: translate(0px, 0px) translateZ(0px);';
				zoomedImg.wrapper.appendChild(zoomedImg.img);

				//append element to body
				zoomedImg.appendChild(zoomedImg.overlay);
				zoomedImg.appendChild(zoomedImg.wrapper);
				container === 'body' ?
					document.body.appendChild(zoomedImg) : document.getElementById(container).appendChild(zoomedImg);

					zoomedImg.addEventListener("click", zoom);
				//wrap coordinates
				var wrapX = ((screenSize.x-scrollbarWidth)/2)-imgL - (imgW/2);
				var wrapY = imgT*(-1) + (screenSize.y-imgH)/2;



				//Calc scale
				//TODO if ratio*H > realH no scale
				var scale = 1;
				if(realH > imgH){
					if(imgH == imgW && screenSize.y > screenSize.x){
						// case 1: square image and screen h > w
						scale = (screenSize.x-margin)/imgW;
					}else if(imgH == imgW && screenSize.y < screenSize.x){
						// case 2: square image and screen w > h
						scale = (screenSize.y-margin)/imgH;
					}else if(imgH > imgW){
						// case 3: rectangular image h > w
						scale = (screenSize.y-margin)/imgH;
						if (scale*imgW > screenSize.x) {
							// case 3b: rectangular image h > w but zoomed image is too big
							scale = (screenSize.x-margin)/imgW;
						};
					}else if(imgH < imgW){
						// case 4: rectangular image w > h
						scale = (screenSize.x-margin)/imgW;
						if (scale*imgH > screenSize.y) {
							// case 4b: rectangular image w > h but zoomed image is too big
							scale = (screenSize.y-margin)/imgH;
						};
					}
				}

				//recal scale if zoomed image is more bigger then original
				if(scale*imgW > realW){
					scale = realW/imgW;
				}

	      setTimeout(function(){
	          zoomedImg.wrapper.style.cssText = 'transform: translate('+wrapX+'px, '+wrapY+'px) translateZ(0px);-webkit-transform: translate('+wrapX+'px, '+wrapY+'px) translateZ(0px);';
	          zoomedImg.img.style.cssText += "transform: scale("+scale+");-webkit-transform: scale("+scale+")";
	          zoomedImg.overlay.className = 'zoom-overlay show';
	      },0);
			}

			img.src = fullSizeSrc;
		}
		else {
			isZoomed = !isZoomed;
			zoomedImg.overlay.className = 'zoom-overlay';
			zoomedImg.wrapper.style.cssText = '';
			zoomedImg.img.style.cssText = zoomedImg.img.styleOrig;
			zoomedImg.removeEventListener("click", zoom);
			setTimeout(function(){
				container === 'body' ? document.body.removeChild(zoomedImg) : document.getElementById(container).removeChild(zoomedImg);
				zoomedImg.innerHTML = "";
			},300)
		}
	}

	//Apply effect on all elements
	var elements = document.querySelectorAll(element);
	Array.prototype.forEach.call(elements, function(el, i){
		el.addEventListener("click", zoom);
	});

	//zoomOut on scroll
	function zoomOut(){
		if(zoomedImg){
			zoomedImg.click();
		}
	}

	window.addEventListener("scroll", zoomOut);
}

module explorts MediumLightbox
