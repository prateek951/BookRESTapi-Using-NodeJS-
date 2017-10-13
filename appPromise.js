var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Book = require('./models/Book');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//ROUTES CRUD
app.get('/',(req,res)=>{
    res.render('index');
});

//REFACTORING THE PREVIOUS CODE USING PROMISES AND REMOVING THE IF...ELSE
app.get('/books',(req,res)=>{
    //RETRIEVE ALL THE BOOKS
    Book.find({})
        .exec()
            .then(books => res.json(books))
                .catch(err => res.send('error occured'));
});
app.get('/books/:id',(req,res)=> {
    //TAP A BOOK WITH THE MATCHING ID
    var id = req.params.id;
    Book.findOne(id)
        .exec()
            .then(book => res.json(book))
            .catch(err=> res.send('error occured'));
});

app.post('/books', (req,res)=>{
    Book.create(req.body)
        .then(book=> res.json(book))
            .catch(err=> res.send('error occured'));
});

app.put('/books/:id', (req,res)=> {
    Book.findOneAndUpdate({_id : req.params.id}, { $set : {title : req.body.title}})
        .exec()
            .then(book=>res.json(book))
                .catch(err=> res.send('error occured'));
});

app.delete('/books/:id',(req,res)=> {
    Book.findOneAndRemove({_id : req.params.id})
        .exec()
            .then(book=>res.json(book))
                .catch(err=> res.send('error occured'));
});

app.listen(1337, ()=> console.log('Server running on port 1337 successfully'));