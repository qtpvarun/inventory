/**
 * Created by: dhayes on 4/8/14.
 * Filename: models/items.js
 */
var logger = require('../logger'),
    mongoose = require('mongoose'),
    merge = require('mongoose-merge-plugin'),
    timestamp = require('mongoose-timestamp');

mongoose.plugin(merge);

var VendorPartSchema = new mongoose.Schema({
    vendor: {
        _id: {type: mongoose.Schema.Types.ObjectId},
        code: {type: String},
        name: {type: String}
    },
    unitOfMeasure: {type: String},
    qtyPerUnitOfMeasure: {type: Number},
    vendorPartNumber: { type: String},
    manufacturer: {type: String },
    manufacturerPartNumber: { type: String},
    manufacturerRetailPrice: { type: Number },
    lastPrice: { type: Number }
});

var ItemSchema = new mongoose.Schema({
    partNumber: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    commodity: {
        type: String
    },
    orderUnitOfMeasure: {type: String },
    issueUnitOfMeasure: {type: String },
    rotating: {type: Boolean, default: false},
    kit: {type: Boolean, default: false},
    capitalized: {type: Boolean, default: false},
    conditionEnabled: {type: Boolean, default: false},
    inspectOnReceipt: {type: Boolean, default: false},
    vendorParts: {type:[VendorPartSchema]}
});

ItemSchema.plugin(timestamp);

ItemSchema.pre('save', function(next) {
    var self = this;
    if (!self.isNew) {
        return next();
    } else {
        mongoose.models["Item"].findOne({partNumber : self.partNumber},function(err, item) {
            if (err) return next(err);
            if (item) {
                return next(new Error("Item part number must be unique"));
            } else {
                return next();
            }
        });
    }
});

ItemSchema.post('save', function(item) {
    var Inventory = mongoose.model('Inventory');

    var i = {
        _id: item._id,
        partNumber: item.partNumber,
        description: item.description
    };
    Inventory.update({'item._id': item._id}, { $set: { "item" : i }}, { multi: true}, function(err, updated){
        if (err) {
            logger.error('Error attempting to update inventory.item with updated item information: '+err);
            return next(err);
        }

        logger.debug('Updated '+updated+' inventory with updated item information');
    });
});


mongoose.model('Item', ItemSchema);
