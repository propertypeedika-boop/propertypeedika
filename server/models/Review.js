const mongoose=require('mongoose');
const schema=new mongoose.Schema({name:{type:String,required:true,maxlength:80},location:{type:String,maxlength:100,default:''},text:{type:String,required:true,maxlength:1200},rating:{type:Number,min:1,max:5,required:true},published:{type:Boolean,default:false},consent:{type:Boolean,default:false}},{timestamps:true});
schema.index({published:1,createdAt:-1});
module.exports=mongoose.model('Review',schema);
