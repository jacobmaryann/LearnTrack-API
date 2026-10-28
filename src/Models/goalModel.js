import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    targetDate: {
        type: Date,
        required: false
    },
    resourceLink:{
        type: String,
        default: null
    }
},
{timestamps: true}
);

const goalModel = mongoose.model('Goal', goalSchema);

export default goalModel;