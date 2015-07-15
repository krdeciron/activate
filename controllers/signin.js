var CREATE = 0,
	LOGIN = 1; 

var tabSelected;

window.addEventListener('WebComponentsReady', function() {
	tabSelected = document.querySelector('template#tabSelector');
	tabSelected.selected = CREATE;
});

submitForm = function() {
	if (tabSelected.selected === CREATE)
	{
		document.getElementById('formNewUser').submit();
	}
	else
	{
		var form = document.getElementById('formLoginUser');
		form.addEventListener('iron-form-response', function(e) {
			window.location = e.detail.redirect;
		});
		form.submit();
	}
};
