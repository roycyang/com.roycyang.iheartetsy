/*
 * File: app/store/Listings.js
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

Ext.define('Etsy.store.Listings', {
    extend: 'Ext.data.Store',
    requires: [
        'Etsy.model.Listing'
    ],

    config: {
        clearOnPageLoad: false,
        model: 'Etsy.model.Listing',
        storeId: 'Listings',
        pageSize: 100,
    }
});