Ext.define('Etsy.model.Category', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'name',
            'short_name'
        ],

        proxy: {
            type: 'ajax',
            url: 'js/top_categories.json'
        },

    }
});
