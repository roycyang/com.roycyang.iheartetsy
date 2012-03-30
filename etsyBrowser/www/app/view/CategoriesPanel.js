Ext.define('Etsy.view.CategoriesPanel', {
    extend: 'Ext.Panel',

    config: {
        title: 'Categories',
        iconCls: 'spaces2',
        id: 'categoriesPanel',
        layout: 'card',
        items: [
        
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'categoriesToolbar',
                title: 'Categories',
                items: [{
                    xtype: 'button',
                    ui: 'plain', action: 'showNav',width: 60,
                    iconCls: 'list',
    				iconMask: true,
                },
                    // {
                    //     xtype: 'button',
                    //     ui: 'back',
                    //     text: 'Back',
                    //     id: 'browserBackButton',
                    //     hidden: true
                    // },
                    {
                        xtype: 'spacer'
                    },
                             //                    {
                            //                         xtype: 'button',
                            //                         id: 'browserFullCarouselButton',
                            // iconCls: 'expand',
                            // iconMask: true,
                            // hidden: true
                            //                     },
                    // {
                    //     xtype: 'button',
                    //     iconCls: 'search',
                    //     id: 'browserSearchButton',
                    //     iconMask: true
                    // },
					{
                        xtype: 'button',
                                            ui: 'plain', action: 'showSearch',width: 60,
                        iconCls: 'search',
        				iconMask: true,
                    },
                ]
            },
            
            {

            xtype: 'dataview',
            id: 'categoryList',
            cls: 'products',
            store: 'Categories',
                itemTpl: [
                '<div class="product category"><div class="category-name">{short_name}</div></div>'
                ]
            },
            {
                id: 'browserCarousel',
                xtype: 'listingsCarousel',
                flex: 2
            }
        ]
    }

});