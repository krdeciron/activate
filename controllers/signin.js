var CREATE = 0,
	LOGIN = 1; 

(function() {
	window.addEventListener('WebComponentsReady', function() {
		var tabSelected = document.querySelector('template#tabSelector');
		tabSelected.selected = CREATE;

		submitForm = function() {
			if (tabSelected.selected === CREATE)
			{
				document.getElementById('formNewUser').submit();
			}
			else
			{
				document.getElementById('formLoginUser').submit();
			}
		};
	}
})();