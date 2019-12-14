'use strict';
// Collect zoom buttons.
var zbs = Array.prototype.slice.call(document.querySelectorAll('.zoomButton'));

/* Write a function to turn an individual zoomButton into an active element
listening for clicks. */
function makeButtonActive(zb) {
	// While making the buttons we can also set everything to hidden.
	var div_for_button = document.getElementById(
		zb.getAttribute('aria-controls'));
	div_for_button.setAttribute('hidden', '');

	/* The event listener to attach to zoomContents. */
	function zb_event_listener(event) {
		var target = event.target;

		/* If the event target has already been zoomed, collapse. */
		if (target.classList.contains('zoomButton')) {
			var isExpanded = target.getAttribute('aria-expanded') == 'true';
			if (isExpanded) {
				target.setAttribute('aria-expanded', 'false');
				div_for_button.setAttribute('hidden', '');
			}
			else {
				target.setAttribute('aria-expanded', 'true');
				div_for_button.removeAttribute('hidden');
			}
		}

		/* Override any button behavior that this may be inheriting. */
		event.preventDefault();
	}

	zb.addEventListener('click', zb_event_listener);
}

/* Apply the previous function to every zc. */
zbs.forEach( makeButtonActive );


/*
var zooms = document.querySelectorAll('.zoomContent');

function hide (zs) {
	if (zs.length > 0) {
		for (var i = 0; i < zs.length; i++) {
			zs[i].style.display = 'none';
		}
	}
}

hide(zooms);

*/
