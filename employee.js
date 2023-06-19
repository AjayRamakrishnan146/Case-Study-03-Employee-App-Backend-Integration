const mongoos=require('mongoose');
const employeeSchema=mongoos.Schema({
    name:{
        type:String,
        requred:true
    },
    location:{
        type:String,
        requred:true
    },
    position:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }

})

const employeeModel=mongoos.model('employee',employeeSchema)
module.exports=employeeModel;