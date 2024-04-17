const exp = require('express');
const mon = require('mongoose');
const bodyparser= require('body-parser')
const cors = require('cors');
const { Expences,User } = require('./schemas.js');

const app = exp();
app.use(bodyparser.json());
app.use(cors());  
async function connectToDB(){
    try{
        await mon.connect('mongodb+srv://kishore:0000@cluster0.gfhuzmt.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connection Established!");
        const port= process.env.PORT ||8000
        app.listen(port,function (){
            console.log(`Listenning on the port ${port}..`);
        });
    }
    catch(error){
        console.log(error);
        console.log("Could not establis connection");
    }
    
}
connectToDB();

app.post('/add-expenses',async function(req,res){
    try{
        await Expences.create({
            "amount" : req.body.amount,
            "category" :req.body.category,
            "date" : req.body.date
        })
        res.status(201).json({
            "status" : "success",
            "message" : "Entry added successfully"
        })
    }
    catch(error){
        res.status(500).json({
            "status":"failure",
            "message" : "Internal server error",
            "erroe":error
        });
    }
    
});
app.get('/get-expenses', async function(request, response) {
    try {
        const expenseDetails = await Expences.find()
        response.status(200).json(expenseDetails)
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch data",
            "error" : error
        })
    }
});
app.delete("/delete-expenses/:id",async function(req,res){
    try{
        await Expences.findByIdAndDelete(req.params.id);
        res.status(200).json({
            "status" : "success",
            "message" : "entry deleted"
        })
    } catch(error) {
        res.status(500).json({
            "status" : "failure",
            "message" : "could not delete entry",
            "error" : error
        })
    }
});
app.patch('/update-expenses/:id',async function(req,res){
    try{
        await Expences.findByIdAndUpdate(req.params.id,{
            "amount": req.body.amount,
            "category": req.body.category,
            "date": req.body.date
        }); 
        res.status(200).json({
            "status" : "success",
            "message" : "entry updated"
        });
    }
    catch(e){
        res.status(500).json({
            "status" : "failed",
            "message" : "entry udate failed",
            "error" : e
        })
    }
    

});