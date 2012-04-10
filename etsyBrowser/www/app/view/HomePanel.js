Ext.define('Etsy.view.HomePanel', {
    extend: 'Ext.Panel',
    alias: 'widget.homePanel',
    
    requires: ['Etsy.view.SmallTreasuries'],
    config: {
        title: 'Home',
        id: 'homePanel',
        layout: {
            type: 'hbox'
        },
        items: [
        {
            xtype: 'maintoolbar',
            title: 'Home'
        },
        {
            flex: 1,
            id: 'homePanelLeft',
            xtype: 'container',
            layout: 'vbox',
            items: [
            {

                xtype: 'searchfield',
                id: 'homeSearch',
                placeHolder: 'Search Etsy',
                listeners: {
                  keyup: function(textfield, e, options){
                    APP.onSearchKeyup(textfield, e, options);
                  }
                }
            },
            {   
                xtype: 'button',
                ui: 'plain',
                html: '<div class="browse-categories">Browse Categories</div>',
                listeners: {
                    tap: function(){
                        APP.onNavListTap(null, null, null, {'panel': 'categoriesPanel'});
                    }
                }
            },
            {
                cls: 'grey-box',
                height: 250,
                id: 'homeCategoriesCarousel',
                xtype: 'treasuriesCarousel',
                count: 5,
                innerItemConfig: {
                    xclass: 'Etsy.view.SmallTreasuries'
                },
            },
            {
                xtype: 'button',
                ui: 'plain',
                html: '<div class="hottest-treasuries">Hottest Treasuries</div>',
                listeners: {
                    tap: function(){
                        APP.onNavListTap(null, null, null, {'panel': 'treasuriesPanel'});
                    }
                }
            },
            {
                cls: 'grey-box',
                height: 230,
                id: 'homeTreasuriesCarousel',
                xtype: 'treasuriesCarousel',
                count: 5,
                innerItemConfig: {
                    xclass: 'Etsy.view.SmallTreasuries'
                },
            },
            ]
        }]
    }

});
