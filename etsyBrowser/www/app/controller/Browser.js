/*
 * File: app/controller/Browser.js
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Designer does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Etsy.controller.Browser', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            appPanel: '#appPanel',
            homePanel: '#homePanel',
            browserPanel: '#browserPanel',
            browserCarousel: '#tester',
            browserToolbar: '#browserToolbar',
            fullBrowserCarousel: '#fullBrowserCarousel',
            detailPanel: '#detailPanel',
            listingsCarousel: 'listingsCarousel',
            categoryList: '#categoryList',


        },
        control: {
            listingsCarousel: {
                itemtap: 'onListingTap'
            },
            categoryList: {
                itemtap: 'onCategoryListTap'
            },
            '#browserBackButton': {
                tap: 'onBrowserBackButtonTap'
            },
            '#browserSearchButton': {
                tap: 'onBrowserSearchButtonTap',
            },
            '#browserSearchCancelButton': {
                tap: 'onBrowserSearchCancelButtonTap',
            },
            "#browserPanelSearch": {
				keyup: 'onSearchKeyup',
			},
			'#browserFullCarouselButton': {
			    tap: 'onBrowserFullCarouselButtonTap'
			},
			'#closeFullBrowserButton': {
			    tap: 'onCloseFullBrowserButtonTap'
			},
            "#homePanelSearch": {
				keyup: 'onSearchKeyup',
			},
        },
    },
    
    
    
    

    launch: function() {
        window.self = this;

        self.homePanel = Ext.create('Etsy.view.HomePanel');
        self.browserPanel = Ext.create('Etsy.view.BrowserPanel');
        self.fullBrowserPanel = Ext.create('Etsy.view.FullBrowserPanel');
        self.detailPanel = Ext.create('Etsy.view.DetailPanel');
        self.heartPanel = Ext.create('Etsy.view.HeartPanel');
        self.discoverPanel = Ext.create('Etsy.view.DiscoverPanel');

        // Latest Listings Store for HOME PANEL
        self.latestListingsStore = Ext.data.StoreManager.lookup('LatestListings');
        self.latestListingsStore.load();
		this.getListingsCarousel().setStore(this.latestListingsStore);

        // Listings Store for BROWSER PANEL
        self.listingsStore = Ext.data.StoreManager.lookup('Listings');

        // adding the homepage to the getAppPanel
        self.getAppPanel().add([self.homePanel, self.browserPanel, self.heartPanel, self.discoverPanel]);
    },
    
    // ==========
    // = Search =
    // ==========

	onSearchKeyup: function(textfield, e, options) {
		/**
		 * Called when the search field has a keyup event.
		 *
		 * This will filter the store based on the fields content.
		 */
		 

		var self = this;
		console.log('textfield search term is: ', textfield.getValue());
		if (e.event.keyCode == 13) {
		            Ext.getCmp('browserSearchPanel').setStyle('-webkit-transform:translate3d(0,-50px,0)');
			this.showListings('keyword', textfield.getValue());
		}

	},
	
    // ================================
    // = Whenever a product is tapped =
    // ================================
    
    onListingTap: function(view, record) {
		console.log('**on onListingTap!');

        this.detailPanel.setData(record.data);

        if (!this.detailPanel.getParent()) {
            Ext.Viewport.add(this.detailPanel);
        }

        this.detailPanel.show();
    },
    
    // ================================
    // = Whenever a category is tapped =
    // ================================
    
    onCategoryListTap: function(view, index, item, record) {
		this.showListings('category', record);
    },
    
    
    showListings: function(type, record){
        Ext.getCmp('browserFullCarouselButton').show();
        Ext.getCmp('browserBackButton').show();
        var self = this;
        var store = self.listingsStore;
        switch(type){
            case 'category':
                store.getProxy().setExtraParam('category', record.get('name'));  
                self.getBrowserToolbar().setTitle(record.get('short_name'));
				Ext.getCmp('categoriesSearch').setPlaceHolder('Search ' + record.get('short_name'));
                break;
            case 'keyword':
                store.getProxy().setExtraParam('keywords', record);  
                self.getBrowserToolbar().setTitle('Search results for: ' + record);
                break;
        }
        store.load();
    
        //empty the store before adding the new one
       var browserCarouselStore = self.getBrowserCarousel().getStore();
       if (browserCarouselStore) {
           // if there is already a store, then it needs to be updated, not set
           self.getBrowserCarousel().updateStore(store);
       }else{
           self.getBrowserCarousel().setStore(store);
       }
    
        
        self.getBrowserPanel().getLayout().setAnimation({
            type: 'slide',
            duration: 300,
            direction: 'left'
        });
		
        self.getBrowserPanel().setActiveItem(self.getBrowserCarousel());
        
    },
    
    // =========================
    // = Browser Panel Actions =
    // =========================
    
    onBrowserBackButtonTap: function(){
        this.getBrowserPanel().getLayout().setAnimation({
            type: 'slide',
            duration: 300,
            direction: 'right'
        });
        Ext.getCmp('browserFullCarouselButton').hide();
        Ext.getCmp('browserBackButton').hide();
		self.getBrowserToolbar().setTitle('Categories');
		Ext.getCmp('categoriesSearch').setPlaceHolder('Search Etsy');
        self.getBrowserPanel().setActiveItem(0);
    },
    
    onBrowserSearchButtonTap: function(){
        Ext.getCmp('browserSearchPanel').setStyle('-webkit-transform:translate3d(0,0px,0)');
    },
    
    onBrowserSearchCancelButtonTap: function(){
        Ext.getCmp('browserSearchPanel').setStyle('-webkit-transform:translate3d(0,-50px,0)');
    },
    
    onBrowserFullCarouselButtonTap: function(){
        var self = this;
         //empty the store before adding the new one
           var browserCarouselStore = self.getFullBrowserCarousel().getStore();
           if (browserCarouselStore) {
               // if there is already a store, then it needs to be updated, not set
               self.getFullBrowserCarousel().updateStore(self.listingsStore);
           }else{
               self.getFullBrowserCarousel().setStore(self.listingsStore);
           }
        self.fullBrowserPanel.show();
    },
    
    onCloseFullBrowserButtonTap: function(){
        var self = this;
        self.fullBrowserPanel.hide();
    }
    
    
});