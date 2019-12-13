var zooms = document.querySelectorAll('.zoomContent');

function hide (zs) {
	if (zs.length > 0) { 
		for (var i = 0; i < zs.length; i++) {
			zs[i].style.display = 'none';
		}
	}
}

hide(zooms);

