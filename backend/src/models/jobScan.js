const mongoose = require("mongoose");

const jobScanSchema = new mongoose.Schema({

    jobTitle:{
        type:String,
        trim: true,
        maxlength:200,
        default:""
    },

    companyName:{
        type:String,
        trim:true,
        maxlength:200,
        default:""
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    sourcePlatform:{
        type:String,
        enum:[
            "LinkedIn",
            "Naukri",
            "Unstop",
            "Company Website",
            "Other"
        ],
        default:"Other"
    },

    jobDescription:{
        type:String,
        required:true,
        trim:true,
        minlength:20,
        maxlength:20000
    },

    jonUrl:{
        type:String,
        trim:true,
        maxlength:2048,
        default:""
    },

    riskScore:{
        type:Number,
        min:0,
        max:100,
        required:true
    },

    riskLevel:{
        type:String,
        enum:[
            "Low",
            "Medium",
            "High",
            "Needs Review"
        ],
        required: true
    },

    detectedFlags:[{
        flagType:{
            type:String,
            required:true
        },

        severity:{
            type:String,
            enum:[
                "Low",
                "Medium",
                "High"
            ],
            required:true
        },

        explanation:{
            type:String,
            required:true
        }
    }],

    analysisVersion:{
        type:String,
        default:"rules-v1"
    }


},{ timestamps:true} );

const jobScanModel = mongoose.model("jonScan",jobScanSchema );

module.exports = jobScanModel;