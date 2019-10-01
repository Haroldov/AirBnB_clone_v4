$(document).ready(function () {
  const ids = {};
  let flag = 0;
  $('input:checkbox').on('click', function () {
    if ($(this).is(':checked')) {
	    ids[$(this).attr('data-id')] = $(this).attr('data-name');
	    let str = '';
	    if (Object.keys(ids).length > 1) { str = ', '; } else { str = ''; }
	    if ((($('.amenities h4 span').length)) < 2) {
              $('.amenities h4').append('<span>' + str + $(this).attr('data-name') + '</span>');
              flag = 0;
	    } else if (flag === 0) {
              $('.amenities h4').append('<span>...</span>');
              flag = 1;
	    } else { null; }
    } else {
	    $('.amenities h4 span').remove(':contains(\'' + $(this).attr('data-name') + '\')');
	    delete ids[$(this).attr('data-id')];
	    console.log(Object.values(ids).length);
	    if (((Object.values(ids).length)) === 2) {
              $('.amenities h4 span').remove(':contains(\'...\')');
              flag = 0;
	    }
    }
    console.log(ids);
  });

    let done = () => { $("#api_status").addClass("available") }
    let fail = () => { $("#api_status").removeClass("available") }
    let resp = $.ajax("http://0.0.0.0:5001/api/v1/status/").done(done).fail(fail)

    let donePost = (data) => {
	for (obj of data.responseJSON) {
	    $.ajax({ url: "http://0.0.0.0:5001/api/v1/users/" + obj.user_id + '/',
		     async: false,
		     complete: ((data2) => {
			 data2 = data2.responseJSON
			 $(".places").append(`<article> 
					     <div class="title">
					     <h2> ${obj.name} </h2>
					     <div class="price_by_night">$${obj.price_by_night} </div>
					     </div>
					     <div class="information">
					     <div class="max_guest">
					     <i class="fa fa-users fa-3x" aria-hidden="true"></i>
					     <br /> ${obj.max_guest} Guests </div>
					     <div class="number_rooms">
					     <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
					     <br /> ${obj.number_rooms} Bedrooms </div>
					     <div class="number_bathrooms">
					     <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
					     <br /> ${obj.number_bathrooms} Bathroom </div>
					     </div>
					     <div class="user">
					     <strong>Owner: ${data2.first_name} ${data2.last_name}</strong>
					     </div>
					     <div class="description">
					     ${ obj.description }
					     </div>
					     </article>`)
		     })
		   })
	}
    }
    resp = $.ajax({
	type: "POST",
	url:"http://0.0.0.0:5001/api/v1/places_search/",
	data: '{}',
	contentType: "application/json",
	dataType: "json",
	complete: donePost})
});
