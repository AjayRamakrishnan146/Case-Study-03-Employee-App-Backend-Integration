// Task1: initiate app and run server at 3000

const express=require('express');
const app=express();

const morgan=require('morgan');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));


// Task2: create mongoDB connection 

const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://AjayRamakrishnan12:Aju12K@cluster0.vmjotav.mongodb.net/database5?retryWrites=true&w=majority')
.then(()=>{
    console.log('MongoDB connection is established');
})
.catch(err => console.log('Error connecting',err));
const employeeDATA=require('./employee');



//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async(req,res)=>{
    try {
        let data= await employeeDATA.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send('error');
    }
})




//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async(req,res)=>{
    try {
        let id1=req.body._id
        const data = await employeeDATA.findOne({ id: id1 });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send('error');
    }
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async(req,res)=>{
    try {
        console.log(req.body);
        let item= req.body;
        const saveddata=await employeeDATA(item);
        saveddata.save();
        res.send('success')
    } catch (error) {
        console.log(error);
        res.send('error');
        
    }
})



//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async(req,res)=>{
    try {
        let id=req.params.id
        const deleted= await employeeDATA.findOneAndDelete({ _id: id })
        res.json(deleted);
    } catch (error) {
        console.log(error);
        res.send('Error occurred while updating employee data');
    }

});



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async(req,res)=>{
    try {
        let id=req.body._id
        let updatedData= {$set:req.body}
        const updated= await employeeDATA.findByIdAndUpdate(id,updatedData);
        res.json(updated);
    } catch (error) {
        console.log(error);
        res.send('Error occurred while updating employee data');
    }

})




//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



