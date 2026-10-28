import mongoose from 'mongoose';

const sessionHistorySchema = new mongoose.Schema({
    action: {
        type: String,
        enum: ['created', 'rescheduled', 'completed', 'undone', 'cancelled'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    details: {
        type: Object,
        default: {}
    }
},
{_id: false}
);

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal',
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
    startTime: {
        type: Date, 
        required: true
    },
    durationMinutes:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'sheduled'
    },
    actualCompletedAt: {
        type: Date,
        default: null
    },
    history: [sessionHistorySchema]
},
{timestamps: true}
);

const sessionModel = mongoose.model('Session', sessionSchema);

export default sessionModel;