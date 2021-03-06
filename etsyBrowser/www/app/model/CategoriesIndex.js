/*
 * File: app/model/Listing.js
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

Ext.define('Etsy.model.CategoriesIndex', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        'id',
        {
            name: 'title',
            convert: function(value, record) {
                return record.data.short_name;
            }
        },
        'listings',
        'short_name',
        {
            name: 'name',
            convert: function(value, record) {
                return record.data.id;
            }
        },
        {
            name: 'category_index',
            convert: function(value, record) {
                return true;
            }
        },
        {
            name: 'image_1',
            convert: function(value, record) {

                return record.data.listings[2].Images[0].url_170x135
            }
        },
        {
            name: 'image_2',
            convert: function(value, record) {
                return record.data.listings[1].Images[0].url_170x135
            }
        },
        {
            name: 'image_3',
            convert: function(value, record) {
                return record.data.listings[0].Images[0].url_170x135
            }
        },

        ],

        proxy: {
            type: 'ajax',
            url: GLOBAL.api + 'categoriesIndex',
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    },
});