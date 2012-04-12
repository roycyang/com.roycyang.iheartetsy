var ETSY = {
	toggleSignIn: function(signed_in){
		if(localStorage['accessTokenKey'] || signed_in){
			$('body').addClass('signed-in-flag');
			if(!GLOBAL.oauth){
				GLOBAL.oauth;
			}
			options = {
				consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
				consumerSecret: '2dvoqadnxo',
		    accessTokenKey: localStorage['accessTokenKey'],
		    accessTokenSecret: localStorage['accessTokenSecret']
			};
			GLOBAL.oauth = OAuth(options);
			GLOBAL.signed_in = true;
			
			Ext.getCmp('userInformation').setHtml('<div class="user-info"><img src="' + localStorage.avatar + '" />' + localStorage.name + '</div>');
			Ext.getCmp('userInformation').show();
			Ext.getCmp('signUpButton').hide();
			//Ext.getCmp('signUpButton').hide();
			$('.sign-out-link').parents('.x-list-item').show();
			ETSY.updateCartInfo();
	        ETSY.updateFavoritesInfo();			
		}else{
			$('body').removeClass('signed-in-flag');
			GLOBAL.signed_in = false;
			Ext.getCmp('userInformation').hide();
			Ext.getCmp('signUpButton').show();
			$('.sign-out-link').parents('.x-list-item').hide();
			//Ext.getCmp('signUpButton').show();
		}
	},
	
	initAuthorization: function(){
		var mask = Ext.Viewport.add({
			masked: {
				xtype: 'loadmask',
				message: 'Linking App',
				zIndex: 10000,
			}
		});
		mask.show();
		console.log('\n\n\n\n\n\n\n\n\n\nin login tap');
		var oauth;
		var localStoreKey = "heart";
		var options = {
			consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
			consumerSecret: '2dvoqadnxo',
			callbackUrl: 'https://www.etsy.com/cart'
		};

		oauth = OAuth(options);
		oauth.get('http://openapi.etsy.com/v2/oauth/request_token?scope=cart_rw favorites_rw', function(data) {
			setTimeout(function() {
				GLOBAL.params = $.deparam(data.text);
				window.plugins.childBrowser.showWebPage(GLOBAL.params.login_url, {
					showLocationBar: false
				});
				mask.hide();
			},
			1000);
		},
		function(data) {
			alert('Error : No Authorization');
			console.log(data.text);
			//$('#oauthStatus').html('<span style="color:red;">Error during authorization</span>');
		});

	},
	
	askForSignIn: function(msg){
		ETSY.confirm(msg, function(buttonId) {

		if (buttonId == 'yes' || buttonId == '1') {
      ETSY.initAuthorization();
		} 
	});
	},
	
	/**
	 * Add and item to the favorites list.
	 * @param {String|Number} id An items ID number
	 * @param {Function} [callback] Callback
	 * @returns True or False if signed in.
	 * @type Boolean
	 */
  toggleFavorites: function (id, element, detailPanel) {
    var url;
    
    // Prompt the user and return false if the user is not signed in.
    if (!GLOBAL.signed_in) {
      ETSY.askForSignIn('You are trying to add an item to your cart, would you like to sign in?');
      return false;
    }
    
    // If the id is missing or blank, log a warning.
    if (!id || id === '') {
      console.log('addToFavorites(): ID cannot be blank.');
      return false;
    }
    
    // Convert the ID to a number.
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    
    if(element.hasClass('favorite-flag')){
      url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings/' + id + '?method=DELETE'; 
      localStorage.favorites_listing_ids = localStorage.favorites_listing_ids.replace(id, 'DELETED');      
    }else{
      url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings/' + id;
      localStorage.favorites_listing_ids = localStorage.favorites_listing_ids + ',' + id;
    }
    
    GLOBAL.oauth.post(url, {}, function (data) {
      ETSY.updateFavoritesInfo();
      if(element.hasClass('favorite-flag')){
        element.removeClass('favorite-flag'); 
        if(detailPanel){
          $('.product[ref=' + id + ']').removeClass('favorite-flag'); 
        }
      }else{
        element.addClass('favorite-flag'); 
        if(detailPanel){
          $('.product[ref=' + id + ']').addClass('favorite-flag'); 
        }
      }
    }  ,
  		function(data) {
//        ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
  		});
    
    // wait until the animation is over before we remove the favoriting flag
    setTimeout(function(){
      element.removeClass('favoriting'); 
    }, 1000);
            
    return true;
  },

	updateFavoritesInfo: function(offset){
		if(!GLOBAL.signed_in){
			return false;
		}
		var offset = offset || 0;
		if(offset){
			var url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings?limit=100&offset=' + offset;
		}else{
			var url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings?limit=100';
		}
		
		GLOBAL.oauth.get(url, function(data) {
			var data = JSON.parse(data.text);
			
			var listingIds = [];
			for(i = 0; i < data.results.length; i++){
				listingIds.push(data.results[i].listing_id);
			}
			
			if(offset){
				localStorage['favorites_listing_ids'] = localStorage['favorites_listing_ids'] + listingIds.join();
			}else{
				localStorage['favorites_listing_ids'] = listingIds.join();
			}
			
			if(data.count > (100 + offset)){
				ETSY.updateFavoritesInfo(100 + offset);
			}
			
			localStorage['favorites_count'] = data.count;
            // console.log("localStorage['favorites_listing_ids']", localStorage['favorites_listing_ids']);
            // console.log("localStorage['favorites_count']", localStorage['favorites_count']);
			
			// update the left rail
			$('.favorites-label span').html(data.count);
			

		},
		function(data) {
			// ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
		});

	},

	toggleCart: function(id, element, detailPanel) {
	  // if the item is sold, we cannot add it to the cart
    if(element.hasClass('sold-flag')){
      return false;
    }
    
    // if the user is not signed in, they will be prompted to sign in
    if(!GLOBAL.signed_in){
     ETSY.askForSignIn('You are trying to add an item to your cart, would you like to sign in?');
     return false;
    }
    
    // test to see if the item is in the cart or not
    if(element.hasClass('cart-flag')){
      var url = 'http://openapi.etsy.com/v2/users/__SELF__/carts?method=DELETE';
      localStorage.cart_listing_ids = localStorage.cart_listing_ids.replace(id, 'DELETED');
    }else{
      var url = 'http://openapi.etsy.com/v2/users/__SELF__/carts';
      localStorage.cart_listing_ids = localStorage.cart_listing_ids + ',' + id;
    }

		GLOBAL.oauth.post(url, {
			'listing_id': id
		},
		function(data) {
      // after add success
      if(element.hasClass('cart-flag')){
        element.removeClass('cart-flag'); 
        if(detailPanel){
          $('.product[ref=' + id + ']').removeClass('cart-flag'); 
        }
      }else{
        element.addClass('cart-flag'); 
        if(detailPanel){
          $('.product[ref=' + id + ']').addClass('cart-flag'); 
        }
      }
			ETSY.updateCartInfo();
		},
		function(data) {
      // ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');

		});
	},
	
	updateCartInfo: function(){
		if(!GLOBAL.signed_in){
			ETSY.askForSignIn();
			return false;
		}
		var url = 'http://openapi.etsy.com/v2/users/__SELF__/carts';
		
		GLOBAL.oauth.get(url, 
		function(data) {
		    // adding this to my cart!
            // console.log(JSON.parse(data.text));
			var data = JSON.parse(data.text);
			var listingIds = [];
			for(i = 0; i < data.results.length; i++){
				for (j = 0; j < data.results[i].listings.length; j++){
					listingIds.push(data.results[i].listings[j].listing_id);
				}
			}			
			localStorage['cart_listing_ids'] = listingIds.join();
			localStorage['cart_count'] = data.count;
            // console.log("localStorage['cart_listing_ids']", localStorage['cart_listing_ids']);
            // console.log("localStorage['cart_count']", localStorage['cart_count']);
			
			// update the left rail
			$('.cart-label span').html(data.count);
		},
		function(data) {
			// ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
		});
		
	},

	alert: function(msg) {
		try {
			navigator.notification.alert(msg);
		} catch(err) {
			var msg = Ext.Msg.alert('Alert', msg);
			msg.setZIndex(1000000000000000);
		}
	},
	
	confirm: function(msg, callback) {
		try {
			navigator.notification.confirm(msg, callback);
		}
		catch(err) {
			var msg = Ext.Msg.confirm('Confirm', msg, callback);
			msg.setZIndex(1000000000000000);
		}
	},
}