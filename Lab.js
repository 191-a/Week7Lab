let express = require('express');
let mongoose = require('mongoose');
let app = express();
let bodyParser = require('body-parser');


let Developer = require('./models/developer.js');
let Task = require('./models/task.js');


let url = "mongodb://localhost:27017/week7Lab";

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('images'));
app.use(express.static('css'));


app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

path = __dirname + '/views/';

mongoose.connect(url,function(err){
    if (err){
        console.log(err);
    }
    console.log("Connected sucessfully");
});



app.get('/',function(req,res){
    res.sendFile(path + 'home.html');
});

app.get('/addNewDeveloper',function(req,res){
    res.sendFile(path + 'addNewDeveloper.html');
});

app.post('/addNewDeveloper',function(req,res){
    let newDeveloper = new Developer({
        _id: mongoose.Types.ObjectId(),
        name:{
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        level: req.body.level,
        address:{
            state: req.body.state,
            suburb: req.body.suburb,
            street: req.body.street,
            unit: req.body.unit
        }
    });
    newDeveloper.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('Developer saved');
        }
    })
    res.redirect('/getAllDeveloper');
});


app.get('/getAllDeveloper',function(req,res){
   Developer.find().exec(function(err,data){
       if(err){
           console.log(err);
       }
       else{
           res.render('getAllDeveloper',{developerDb:data})
       }
   });
});

app.get('/addNewTask',function(req,res){
    res.sendFile(path + 'addNewTask.html');
});

app.post('/addNewTask',function(req,res){
    let newTask = new Task({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        assignTo: req.body.assignTo,
        dueDate: req.body.dueDate,
        taskStatus: req.body.status,
        taskDescription: req.body.description
    })
    newTask.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('Task saved');
        }
    });
    res.redirect('/getAllTasks');
});

app.get('/getAllTasks',function(req,res){
    Task.find({},function(err,docs){
        if(err){
            console.log(err);
        }
        res.render('getAllTasks',{taskDb: docs});
    
    });
});


app.get('/deleteTask',function(req,res){
    res.sendFile(path + '/deleteTask.html');
});

app.post('/deleteTask',function(req,res){
    Task.deleteOne({'_id': req.body.ID},function(err,obj){
        console.log(obj);
    });
    res.redirect('/getAllTasks');
   
});

app.get('/deleteAllCompletedTasks',function(req,res){
    res.sendFile(path + '/deleteAllCompletedTasks.html');
});

app.post('/deleteAllCompletedTasks',function(req,res){
    if(req.body.deleteAll === "YES")
    {
        Task.deleteMany({'taskStatus':"Complete"},function(err,obj){
            console.log(obj);
        })
        res.redirect('/getAllTasks');
    }
    else
    {
        res.redirect('/getAllTasks');
    }
});

app.get('/updateTask',function(req,res){
    res.sendFile(path + '/updateTask.html');
})

app.post('/updateTask',function(req,res){
    Task.updateOne({'_id': req.body.ID}, {$set: {'taskStatus': req.body.status}},function(err,doc){
        console.log(doc);
    });
    res.redirect('/getAllTasks');
});

app.get('/newGet',function(req,res){
    Task.find({'taskStatus':"Complete"}).sort('name').limit(3).exec(function(err,docs){
        if(err){
            console.log(err);
        }
        res.render('newGet',{taskDb: docs});
    });
});


app.listen(8080);