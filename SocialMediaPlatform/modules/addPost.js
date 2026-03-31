import fs from 'fs';
function postAdd(req,res){
    try{
        let {imageURL,title,description} = req.body;
        let userId = req.body.userId;
        if(!userId){
            return res.status(400).send("User ID Required");
        }
        if(!imageURL || !title || !description){
            return res.status(400).send("All Fields Required");
        }
        let posts = [];
        if(fs.existsSync("posts.json")){
            posts = JSON.parse(fs.readFileSync("posts.json","utf-8"));
        }
        let newPost = {
            userId,
            postId : Date.now(),
            imageURL,
            title,
            description,
            likes : [],
            comments : [],
        };
        posts.push(newPost);
        fs.writeFileSync("posts.json",JSON.stringify(posts,null,2));
        res.status(200).send("Post Created");
    }   
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
export default postAdd;