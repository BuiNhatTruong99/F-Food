const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Product',
            quantity: { type: Number, default: 1 },
        },
    }],
    status: {
        type: String,
        default: 'Processing',
        enum: ['Cancel', 'Processing', 'Success'],
    },
    total: { type: Number, default: 0 },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);