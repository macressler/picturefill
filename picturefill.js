/*
	Picturefill - a crude polyfill for proposed behavior of the picture element, which does not yet exist, but should. :)
	* Author: Scott Jehl, 2012
	* License: MIT/GPLv2
	* Notes: 
	  * For active discussion of the picture element, see http://www.w3.org/community/respimg/
	  * While this code does work, it is intended to be used only for example purposes until either:
		A) A W3C Candidate Recommendation for <picture> is released
		B) A major browser implements <picture>
*/ 
(function( w ){
	
	// Test if `<picture>` is supported natively, if so, exit - no polyfill needed.
	if ( !!( w.document.createElement( "picture" ) && w.document.createElement( "source" ) && w.HTMLPictureElement ) ){
		return;
	}
	
	w.picturefill = function() {
		var ps = w.document.getElementsByTagName( "picture" );
		
		// Loop the pictures
		for( var i = 0, il = ps.length; i < il; i++ ){
			var sources = ps[ i ].getElementsByTagName( "source" ),
				matches = [];
				
			// See if which sources match	
			for( var j = 0, jl = sources.length; j < jl; j++ ){
				var media = sources[ j ].getAttribute( "media" );
				// if there's no media specified, OR w.matchMedia is supported 
				if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
					matches.push( sources[ j ] );
				}
			}

			// Set fallback img element src from that of last matching source element
			if( matches.length ){
				var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];
				if( !picImg ){
					picImg = w.document.createElement( "img" );
					picImg.alt = ps[ i ].getAttribute( "alt" );
					ps[ i ].appendChild( picImg );
				}
				picImg.src =  matches.pop().getAttribute( "src" );
			}
		}
	};
	
	// Run on resize and domready (w.load as a fallback)
	if( w.addEventListener ){
		w.addEventListener( "resize", w.picturefill, false );
		if( w.document.onDOMContentLoaded ){
			w.document.addEventListener( "DOMContentLoaded", w.picturefill, false );
		}
		else{
			w.addEventListener( "load", w.picturefill, false );
		}
	}
	else if( w.attachEvent ){
		w.attachEvent( "onload", w.picturefill );
	}
	
})( this );