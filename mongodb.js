const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/insta_db')

const db= mongoose.connection 
db.on('error',console.error.bind(console,'eror connetctiong to the database'))
db.once('open',function(){
    console.log('conntected');
})