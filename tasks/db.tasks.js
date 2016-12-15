/**
 * Created by: dhayes on 4/9/14.
 * Filename: db.tasks
 */


module.exports = function(grunt) {
    grunt.registerTask('dropDatabase', 'Drop the database', function() {
        var config = require('../lib/configuration');
        var dbURI = config.get('mongodb:dbURI');
        var mongoose = require('mongoose');

        // async mode
        var done = this.async();

        mongoose.connect(dbURI);

        mongoose.connection.on('open', function () {
            mongoose.connection.db.dropDatabase(function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('Successfully dropped db');
                }
                mongoose.connection.close(done);
            });
        });

    });

    grunt.registerTask('addUsers', 'create users', function() {
        var config = require('../lib/configuration');
        var dbURI = config.get('mongodb:dbURI');
        var mongoose = require('mongoose');

        // async mode
        var done = this.async();

        mongoose.connect(dbURI);

        require('../lib/models/user');

        var User = mongoose.model('User');

        var user = new User({username:'admin',password:'admin',email:'admin@storeroom83.com',firstName:'Admin',lastName:'Administrator'});

        mongoose.connection.on('open', function () {
            console.log("in create users");
            user.save(function(err) {
                if(err) {
                    console.log('Error: ' + err);
                    mongoose.connection.close(done);
                } else {
                    console.log('saved user: ' + user.username);
                    mongoose.connection.close(done);
                }

            });
        });

    });

    grunt.registerTask('addStorerooms','create storerooms', function() {
        var config = require('../lib/configuration');
        var dbURI = config.get('mongodb:dbURI');
        var mongoose = require('mongoose');

        // async mode
        var done = this.async();

        mongoose.connect(dbURI);

        require('../lib/models/storerooms');

        var Storeroom = mongoose.model('Storeroom');
        var storeroom1 = new Storeroom({'name':'CENTRAL', 'description': 'Central Storeroom', 'useInPurchasing': true, 'controlAccount': '0600-100-1000', 'costAdjAccount': '0600-100-1100', 'receiptVarAccount': '0600-100-1200', 'purchaseVarAccount': '0600-100-1300', 'shrinkageAccount': '0600-100-1400', 'invoiceVarAccount': '0600-100-1500', 'currencyVarAccount': '0600-100-1600'});
        var storeroom2 = new Storeroom({'name':'EAST', 'description': 'East Storeroom', 'useInPurchasing': true, 'controlAccount': '0600-100-1000', 'costAdjAccount': '0600-100-1100', 'receiptVarAccount': '0600-100-1200', 'purchaseVarAccount': '0600-100-1300', 'shrinkageAccount': '0600-100-1400', 'invoiceVarAccount': '0600-100-1500', 'currencyVarAccount': '0600-100-1600'});
        var storeroom3 = new Storeroom({'name':'WEST', 'description': 'West Storeroom', 'useInPurchasing': true, 'controlAccount': '0600-100-1000', 'costAdjAccount': '0600-100-1100', 'receiptVarAccount': '0600-100-1200', 'purchaseVarAccount': '0600-100-1300', 'shrinkageAccount': '0600-100-1400', 'invoiceVarAccount': '0600-100-1500', 'currencyVarAccount': '0600-100-1600'});
        var storeroom4 = new Storeroom({'name':'NORTH', 'description': 'North Storeroom', 'useInPurchasing': false, 'controlAccount': '0600-100-1000', 'costAdjAccount': '0600-100-1100', 'receiptVarAccount': '0600-100-1200', 'purchaseVarAccount': '0600-100-1300', 'shrinkageAccount': '0600-100-1400', 'invoiceVarAccount': '0600-100-1500', 'currencyVarAccount': '0600-100-1600'});
        var storeroom5 = new Storeroom({'name':'SOUTH', 'description': 'South Storeroom', 'useInPurchasing': true, 'controlAccount': '0600-100-1000', 'costAdjAccount': '0600-100-1100', 'receiptVarAccount': '0600-100-1200', 'purchaseVarAccount': '0600-100-1300', 'shrinkageAccount': '0600-100-1400', 'invoiceVarAccount': '0600-100-1500', 'currencyVarAccount': '0600-100-1600'});
        var storeroom6 = new Storeroom({'name':'SOUTHWEST', 'description': 'Southwest Storeroom', 'useInPurchasing': true, 'controlAccount': '0600-100-1000', 'costAdjAccount': '0600-100-1100', 'receiptVarAccount': '0600-100-1200', 'purchaseVarAccount': '0600-100-1300', 'shrinkageAccount': '0600-100-1400', 'invoiceVarAccount': '0600-100-1500', 'currencyVarAccount': '0600-100-1600'});
        var storeroom7 = new Storeroom({'name':'NORTHEAST', 'description': 'Northeast Storeroom', 'useInPurchasing': false, 'controlAccount': '0600-100-1000', 'costAdjAccount': '0600-100-1100', 'receiptVarAccount': '0600-100-1200', 'purchaseVarAccount': '0600-100-1300', 'shrinkageAccount': '0600-100-1400', 'invoiceVarAccount': '0600-100-1500', 'currencyVarAccount': '0600-100-1600'});
        var storeroom8 = new Storeroom({'name':'NORTHWEST', 'description': 'Northwest Storeroom', 'useInPurchasing': true, 'controlAccount': '0600-100-1000', 'costAdjAccount': '0600-100-1100', 'receiptVarAccount': '0600-100-1200', 'purchaseVarAccount': '0600-100-1300', 'shrinkageAccount': '0600-100-1400', 'invoiceVarAccount': '0600-100-1500', 'currencyVarAccount': '0600-100-1600'});
        var storeroom9 = new Storeroom({'name':'SOUTHEAST', 'description': 'Southeast Storeroom', 'useInPurchasing': false, 'controlAccount': '0600-100-1000', 'costAdjAccount': '0600-100-1100', 'receiptVarAccount': '0600-100-1200', 'purchaseVarAccount': '0600-100-1300', 'shrinkageAccount': '0600-100-1400', 'invoiceVarAccount': '0600-100-1500', 'currencyVarAccount': '0600-100-1600'});

        mongoose.connection.on('open', function () {
            Storeroom.create([storeroom1, storeroom2, storeroom3, storeroom4, storeroom5, storeroom6, storeroom7, storeroom8, storeroom9], function(err) {
                if (err) {
                    console.log(err);
                    mongoose.connection.close(done);
                } else {
                    console.log('Created Storerooms');
                    mongoose.connection.close(done);
                }

            });
        });

     });

    grunt.registerTask('addItems', 'Add Items', function() {
        var config = require('../lib/configuration');
        var dbURI = config.get('mongodb:dbURI');
        var mongoose = require('mongoose');
        var path = require('path');
        var csv = require('csv');

        // async mode
        var done = this.async();

        require('../lib/models/items');
        var Item = mongoose.model('Item');

        var items = [];
        csv().from.path(path.join(__dirname,'seed_items.csv'))
            .on('record', function(row){
                items.push(new Item({
                    partNumber: row[0],
                    commodity: row[1],
                    description: row[2],
                    orderUnitOfMeasure: row[4],
                    issueUnitOfMeasure: row[4],
                    vendorParts: [
                        {
                            vendor: {
                                _id: "536d14925d5b3321c2f15cb5",
                                code: "GRAINGER",
                                name: "Grainger LLC"
                            },
                            unitOfMeasure: row[4],
                            qtyPerUnitOfMeasure: row[5],
                            vendorPartNumber: row[8],
                            manufacturer: row[6],
                            manufacturerPartNumber: row[7],
                            manufacturerRetailPrice: row[9],
                            lastPrice: row[10]
                        }]
                }));
            })
            .on('end', function(count){
                console.log('Number of lines: '+count);
                mongoose.connect(dbURI);

                mongoose.connection.on('open', function () {
                    Item.create(items, function(err) {
                        if (err) {
                            console.log(err);
                            mongoose.connection.close(done);
                        } else {
                            console.log('Created Items');
                            mongoose.connection.close(done);
                        }

                    });
                });
            })
            .on('error', function(error){
                console.log(error.message);
                done();
            });
    });

    grunt.registerTask('addInventories', 'Add Inventories', function() {
        var config = require('../lib/configuration');
        var dbURI = config.get('mongodb:dbURI');
        var mongoose = require('mongoose');
        var path = require('path');
        var csv = require('csv');

        // async mode
        var done = this.async();

        require('../lib/models/inventories');
        var Inventory = mongoose.model('Inventory');

        var inventories = [];
        csv().from.path(path.join(__dirname,'seed_inventories.csv'))
            .on('record', function(row){
                inventories.push(new Inventory({
                    item: {
                        _id: row[0],
                        partNumber: row[1],
                        description: row[2]
                    },
                    storeroom: {
                        _id: "536be62bd8898ce0b7d2a2e3",
                        name: "NORTH",
                        description: "North Storeroom"
                    },
                    stockCategory: 'STOCK',
                    defaultBin: row[3],
                    abcType: row[4],
                    countFrequency: 30,
                    reorderPoint: 0.00,
                    leadTimeDays: 0.00,
                    safetyStock: 0.00,
                    economicOrderQty: 0.00
                }));
            })
            .on('end', function(count){
                console.log('Number of lines: '+count);
                mongoose.connect(dbURI);

                mongoose.connection.on('open', function () {
                    Inventory.create(inventories, function(err) {
                        if (err) {
                            console.log(err);
                            mongoose.connection.close(done);
                        } else {
                            console.log('Created Inventories');
                            mongoose.connection.close(done);
                        }

                    });
                });
            })
            .on('error', function(error){
                console.log(error.message);
                done();
            });

    });

};