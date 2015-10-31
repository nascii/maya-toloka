$('button').on('click', function(e) {
	var btn = $(e.target);
	var girlId = btn.data('id');
	var status = btn.data('status');

	if (btn.parent().hasClass('voted')) return;

	$.ajax({
		type: 'POST',
		url: '/vote',
		data: JSON.stringify({status: status, girlId: girlId}),
		contentType : 'application/json'
	}).done(function(res) {
		console.log(res);
		btn.parent().addClass('voted');
		btn.addClass('voted');
	});
})