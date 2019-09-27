$( document ).ready(function() {
    let ids = {};
    $("input:checkbox").on( 'click', function(){
	if ($(this).is(':checked') ) {
	    ids[$(this).attr("data-id")] = $(this).attr("data-name");
	    let str = ""
	    if (Object.keys(ids).length > 1) { str = ", " }
	    else { str = "" }
	    $('.amenities h4').append('<span>' + str + $(this).attr("data-name") +'</span>');
	}
	else {
	    $('.amenities h4 span').remove(':contains(\'' + $(this).attr("data-name") + '\')');
	    delete ids[$(this).attr("data-id")];

	}
    console.log(ids)});
})
