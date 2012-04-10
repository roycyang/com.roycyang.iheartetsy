Ext.define('Etsy.view.CategoriesPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.categoriesPanel',
    config: {
        title: 'Categories',
        id: 'categoriesPanel',
        layout: 'vbox',
        items: [
        {
          hidden: true,
            xtype: 'searchfield',
            id: 'searchSearch',
            placeHolder: 'Search Etsy'
        },
        {
            xtype: 'maintoolbar',
            title: 'Categories',
            id: 'categoriesToolbar'
        },
        {
            xtype: 'button',
            cls: 'leftArrow',
            width: 46,
            left: 0,
            hidden: true,
            top: 0,
            height: 701,
            ui: 'plain',
            listeners: {
              tap: function(){
                self.getCategoriesCarousel().previous();
                
              }
            }
        },
        {
            xtype: 'button',
            cls: 'rightArrow',
            right: 0,
            ui: 'plain',
            width: 49,
            top: 0,
            height: 701,
            listeners: {
              tap: function(){

                self.getCategoriesCarousel().next();
              }
            }
        },
        {
            flex: 1,
            id: 'categoriesCarousel',
            xtype: 'listingsCarousel',
        }
        ]
    }

});
