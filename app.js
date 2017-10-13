var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./models/book');

mongoose.connect('mongodb://localhost:27017/test');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//ROUTES
//CRUD
app.get('/',(req,res)=>{
    res.send("Hello Boy!!");
});

app.get('/books',(req,res)=> {
    Book.find({}).exec((err,data)=>{
        if(err){
            res.status(404).send('Error');
        }else{
            res.json(data);
        }
    });
});
app.get('/books/:id',(req,res)=>{
    //WHICH BOOK TO TAP
    // var book = req.params.id;
    Book.findOne({_id : req.params.id}).exec((err,book)=>{
        if(err){
            res.status(404).send('Error');
        }else{
            res.json(book);
        }
    });
});

//POST A BOOK
app.post('/books',(req,res)=>{
    //Create a new book
    var book = new Book();
    book.title = req.body.title;
    book.author = req.body.author;
    book.category = req.body.category;

    book.save((err,data)=>{
        if(err){
            res.send('error');
        }else{
            //console.log(data);
            res.json(data);
        }
    });
});

//POSTING USING ANOTHER MONGOOSE METHOD

app.post('/books2',(req,res)=>{
    Book.create(req.body,(err,book)=>{
        if(err){
            res.send('error');
        }else{
            res.json(book);
        }
    });
});

//UPDATING A BOOK
//ONE WAY TO UPDATE

app.put('/books/:id',(req,res)=>{
    Book.findByIdAndUpdate({_id : req.params.id},{$set : {
        title : req.body.title
    }},(err,book)=> {
        if(err){
            res.send('error');
        }else{
            res.json(book);
        }
    });
});


//DELETE A BOOK
app.delete('/books/:id',(req,res)=>{
    Book.findOneAndRemove({_id: req.params.id},(err,book)=>{
        if(err){
            res.send('error');
        }else{
            //console.log(book);
            res.json(book);
        }
    });
});

app.listen(1337,() => console.log('Server running successfully!!'));

