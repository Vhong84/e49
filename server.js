//---import express modules
const express = require("express");
//---import utils using destructuring
const {createFolder, createFile} =require("./utils");
const postsData=require("./data/post.json");
//console.log(express);
const app = express();
//--to pass incoming data
app.use(express.json());
//---create folder data
createFolder("data");
//---create file json
createFile("data/post.json");
//-----routing api demo
//---home root route
app.get("/", (req, res)=>{
    res.send("HOME Route");
});
//---fetch all posts
app.get("/posts", function(req, res){
    // res.send("Fetch all post route");
    // res.json(postsData);
    res.json({
        message: 'Fetch Data Successfully',
        postsData
    });
});
//--fetch single post
app.get("/posts/:id", (req, res)=>{
    //--get dynamic id
    // console.log(req.params.id);
    const id = req.params.id;
    console.log(id);
    // res.send("Fetch single posts");
    const postFound= postsData.find((post)=>{
        return post.id === id;
    });
    if(!postFound){
        res.json({message:"Post not Found"});
    }else{
        res.json({postFound});
    }
});
//---create post
app.post("/posts", (req, res)=>{
    // res.send("Create post api route");
    // console.log(req.body)
    // 
    const newPost = req.body;
    //push existing
    postsData.push({
        ...newPost,
        id: postsData.length.toString(),
    });
    console.log(postsData);
    res.send("Create post")
});
app.post("/posts/:id", (req, res)=>{
    res.send("Create single post");
});
//---update post a url with params
app.put("/posts/:id", (req, res)=>{
    //get the dynamic id from url params
    //const id= req.params;
    const id= req.params.id;
    console.log(id);
    res.send("update posts route using id");
});
//---delete a single posts
app.delete("/posts/:id",(req, res)=>{
    res.send("delete posts route");
});
//---create a single posts
app.get("/posts/:id",(req, res)=>{
    res.send("create single posts route");
});
//--create post
app.post("/posts",(req, res)=>{
    res.send("Create post");
})
//--update post with url params
app.put("/posts/:id", (req, res)=>{
    //--get dynamic id
    // console.log(req.params.id);
    const id = req.params.id;
    console.log(id);
    res.send("update posts using id");
});
app.delete("/posts/:id",(req, res)=>{
    res.send("delete single post");})
//---create a server
app.listen(3000,function(){
    console.log("Server running at port 3000");
});