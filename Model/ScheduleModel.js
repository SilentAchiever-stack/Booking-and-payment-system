const Mongoose = require('mongoose');

const ScheduleSchema = new Mongoose.Schema({
    businessId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: true
    },
weeklySchedule:{//its specific cause you know then
    
    monday:{
     is_open: Boolean,
    open_time: String,
    close_time : String
    },
    tuesday:{
       isOpen: Boolean,
       openTime: String,
       closeTime: String
    },
    wednesday:{
        isOpen: Boolean, //will be open for that day or not
       openTime:String, //the time i will be open for that day
       closeTime:String //the time i will be closed for that day
    },
    thursday:{
        isOpen: Boolean,
       openTime: String,
       closeTime: String
    },
    friday:{
        isOpen: Boolean,
       openTime: String,
       closeTime: String
    },
    saturday:{
        isOpen: Boolean,
       openTime: String,
       closeTime: String
    },
    sunday:{
        isOpen: Boolean,
       openTime: String,
       closeTime: String
}},
//i am not coming at all : it does not need time cause u are not coming at all, so it is a full day
closedDates: [{ // you are not sure about this part, but it is a good idea to have a closed dates array to handle holidays or special events instead of a plain object
        date: {
            type: Date,
            required: true
        },
        reason: {
            type: String
        }
    }],

//i am coming but not the usaual time, so its needs time
    availabilityOverrides: [{//you are not sure about this part, but it is a good idea to have a availability dates array to handle holidays or special events instead of a plain object
        date: {
            type: Date,
            required: true
        },
        isOpen: {
            type: Boolean,
            required: true
        },
        openTime: {
            type: String
        },
        closeTime: {
            type: String
        }
    }]

},{ timestamps: true });


module.exports = Mongoose.model('Schedule', ScheduleSchema);