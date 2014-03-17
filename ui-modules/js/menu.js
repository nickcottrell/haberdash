$(document).ready(function() {
		$('.OPEN_MENU_CTL').click(function(){
			$( ".MENU_ITM" ).addClass( "menu-on" );
			$('.OPEN_MENU_CTL').hide();
			$('.CLOSE_MENU_CTL').show();
		});

		$('.CLOSE_MENU_CTL').click(function(){
			$( ".MENU_ITM" ).removeClass( "menu-on" );
			$('.CLOSE_MENU_CTL').hide();
			$('.OPEN_MENU_CTL').show();			
		});
});





































