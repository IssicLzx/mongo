var createClient = require('./mongoDb/dbclient');
var dbConfig = require('./config/mongodb');
var db = createClient(dbConfig);
var mongoose = require('mongoose');
var schema = require('./mongoDb/schema');
var async = require('async');

db.once('open',function(){
    var blogModel = db.model('blog',schema);
    async.waterfall([
        /*
         insert
         */
        function( cb){
            var blogEntity = new blogModel({title:'标题', content:'内容',date: new Date()});
            blogEntity.save(function(err, res){
                if (! err)
                    console.log('save success');
                cb(err, res);
            });
        },
        /*
         查找
         */
        function(res,cb){

            blogModel.find(function(err, docs) {
                if (err) console.log(err);
                console.log('docs :',docs);
                cb(err , docs);
            });
        },
        /*
         update
         */
        function(docs, cb){
            var blogEntity = docs[0];
            blogEntity.title = '标题2';
            blogEntity.date = new Date();
            blogEntity.save(function(err, res){
                if (! err)
                    console.log('save success');
                cb(err, res);
            });
        },
        function(res,cb){

            blogModel.find(function(err, docs) {
                if (err) console.log(err);
                console.log('docs :',docs);
                cb(err , docs);
            });
        },
        /*
         delete all
         */
        function(res, cb){
            blogModel.remove(cb);
        }
    ],function(err, res){
        if (err) console.log(err);
        mongoose.disconnect();
    })

});
