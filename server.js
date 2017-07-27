var express=require("express");
var app=express();
var mongojs=require("mongojs");
var db=mongojs('projectlist',['projectlist']);
var bodyParser=require('body-parser');


app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/projectlist',function(req,res){
console.log('i receuved a get request');
db.projectlist.find(function(err,docs){
console.log(docs);
res.json(docs);
});

});

app.post('/projectlist',function(req,res){
console.log(req.body);
db.projectlist.insert(req.body,function(err,docs){

res.json(docs);
});
});


app.delete('/projectlist/:id',function(req,res){
var id=req.params.id;
console.log(id);
db.projectlist.remove({_id:mongojs.ObjectId(id)},function(err,docs){
res.json(docs);
});
});

app.get('/projectlist/:id',function(req,res){

var id=req.params.id;
console.log(id);
db.projectlist.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
res.json(docs);
});
});

app.put('/projectlist/:id',function(req,res){
var id=req.params.id;
console.log(req.body.name);
db.projectlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
update:{$set:{name:req.body.name,email:req.body.email,details:req.body.details}},
new:true},function(err,docs){
res.json(docs);
});
});


app.get('/tasklist/:id',function(req,res){
var id=req.params.id;
//console.log(id);
db.task.find({project_id:mongojs.ObjectId(id)},function(err,docs){
res.json(docs);
});

});

app.post('/tasklist',function(req,res){
//console.log(req.params.id);
console.log(req.body.id);
console.log(req.body.task.name);
var doc={project_id:mongojs.ObjectId(req.body.id),name:req.body.task.name,DeveloperName:req.body.task.DeveloperName,details:req.body.task.details};
db.task.insert(doc,function(err,docs){
res.json(docs);
});
});


app.delete('/tasklist/:id',function(req,res){
var id=req.params.id;
console.log(id);
db.task.remove({_id:mongojs.ObjectId(id)},function(err,docs){
res.json(docs);
});
});



app.listen(3000);
console.log('server running on port 3000');
