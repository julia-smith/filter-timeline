function getData(){

	$.getJSON('http://cors.io/?u=https://spreadsheets.google.com/feeds/list/<YOUR DOCUMENT KEY HERE>/od6/public/values?alt=json', function(data) {


		var count = cards.length,
		uniques = [];

		for (var i = 0; i < data.feed.entry.length; i++) {

			var card 	= data.feed.entry[i],
				start 	= card.gsx$startdate.$t,
				end 	= card.gsx$enddate.$t,
				label 	= card.gsx$label.$t,
				categories 	= card.gsx$categories.$t.split(', '),
				details = card.gsx$details.$t, 
				html 	= '',
				control = '',
				card_class;

			html += '<section class="card ';
			for (var j=0; j<categories.length; j++){
				var category = categories[j];

				if (category != '-'){
					var in_array;

					card_class = category;

					in_array = jQuery.inArray( card_class, uniques );
					
					if (in_array < 0){
						uniques.push(card_class);
						control += '<div class="seg-section ' + card_class.toLowerCase() + '" tabindex="0" role="button">' + category + '</div>';
					}
					
				} else {
					card_class = 'all';
				}

				card_class = card_class.toLowerCase();
				html += card_class + ' ';
				
			}

			html += '"><div><h4>' + label + '</h4><p> <time>' + start + '</time></p><p>' + details + '</p></div></section>';

			$('section.timeline').append(html);
			$('.lv-segmented').append(control);

		}

		filters();

	});
}

function createCards(){
	var count = cards.length,
		uniques = [];
	
	for (var i=0; i<count; i++){
		var card 	= cards[i],
			start 	= card.startDate,
			end 	= card.endDate,
			label 	= card.label,
			categories 	= card.categories.split(', '),
			details = card.details, 
			html 	= '',
			control = '',
			card_class;

		html += '<section class="card ';
		for (var j=0; j<categories.length; j++){
			var category = categories[j];

			if (category != '-'){
				var in_array;

				card_class = category;

				in_array = jQuery.inArray( card_class, uniques );
				
				if (in_array < 0){
					uniques.push(card_class);
					control += '<div class="seg-section ' + card_class.toLowerCase() + '" tabindex="0" role="button">' + category + '</div>';
				}
				
			} else {
				card_class = 'all';
			}

			card_class = card_class.toLowerCase();
			html += card_class + ' ';
			
		}

		html += '"><div><h4>' + label + '</h4><p> <time>' + start + '</time></p><p>' + details + '</p></div></section>';

		$('section.timeline').append(html);
		$('.lv-segmented').append(control);
	}
}

function filters(){
	$('.seg-section').click(function(){
		var $filter = $(this);
		var name = $filter.text().toLowerCase();
		if ($filter.hasClass('filtered')){
			$filter.removeClass('filtered');
			$('.card').each(function(){
				var $this = $(this);
				$this.show();
			});
		} else {
			$('.filtered').removeClass('filtered');
			$filter.addClass('filtered');
			$('.card').each(function(){
				var $this = $(this);
				if (!$this.hasClass(name)) {
					$this.hide();
				} else {
					$this.show();
				}
				if ($this.hasClass('all')) {
					$this.show();
				} 
			});
		}
	});
	$('.seg-section').keydown(function(e){ // Trigger the click event from the keyboard
		var code = e.which;
		// 13 = Return, 32 = Space
		if ((code === 13) || (code === 32)) {
			$(this).trigger('click');
		}
	});
}

$(document).ready(function(){
	var live = true;
if (live){
		createCards();
		filters();
	} else {
		getData();
	}
});