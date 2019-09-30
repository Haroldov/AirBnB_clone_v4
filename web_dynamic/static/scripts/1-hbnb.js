$( document ).ready(function() {
    let ids = {};
    let flag = 0;
    $("input:checkbox").on( 'click', function(){
	if ($(this).is(':checked') ) {
	    ids[$(this).attr("data-id")] = $(this).attr("data-name");
	    let str = ""
	    if (Object.keys(ids).length > 1) { str = ", " }
	    else { str = "" }
	    if ((($('.amenities h4 span').length)) < 2) {
		$('.amenities h4').append('<span>' + str + $(this).attr("data-name") +'</span>');
		flag = 0;
	    }
	    else if (flag === 0) {
		$('.amenities h4').append('<span>...</span>');
		flag = 1;
	    } else { null }
	}
	else {
	    $('.amenities h4 span').remove(':contains(\'' + $(this).attr("data-name") + '\')');
	    delete ids[$(this).attr("data-id")];
	    console.log(Object.values(ids).length);
	    if (((Object.values(ids).length)) === 2) {
		$('.amenities h4 span').remove(':contains(\'...\')');
		flag = 0;
	    }
	}
    console.log(ids)});
})
