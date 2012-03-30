Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    models: [
        'Listing',
        'Category',
        'Navigation',
		'Treasury'
    ],

    stores: [
        'LatestListings',
        'Listings',
        'Categories',
        'Navigation',
		'Treasuries',
		'FavoriteListings'
    ],

    views: [
		// core panels
        'SearchPanel',
        'NavPanel',
        'AppPanel',

		// other panels
        'HomePanel',
        'CategoriesPanel',
        'TreasuriesPanel',
        'FavoritesPanel',
        'DetailPanel',
        'ListingsCarousel',
        'Listings',
        'FavoriteListingsCarousel',
        'FavoriteListings',
    ],

    name: 'Etsy',

    controllers: [
        'Browser'
    ],

    launch: function() {
        var self = this;
        
        self.mainView = Ext.create('Ext.Panel', {
            fullscreen: true,
            height: 748,
            width: 1024
        });
        
        self.mainView.add(Ext.create('Etsy.view.AppPanel'));
        self.mainView.add(Ext.create('Etsy.view.NavPanel'));
        self.mainView.add(Ext.create('Etsy.view.SearchPanel'));

    }
});
