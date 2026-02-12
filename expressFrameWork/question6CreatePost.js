import fs from 'fs';
//creating posts
function createPost(req,res) {
    try{
        let {title,user,content} = req.body;
        if(!title || !user || !content){
            res.status(400).send("All fields required");
        }
        let post = [];
        if(fs.existsSync("posts.json")){
            let data = fs.readFileSync("posts.json","utf-8");
            let parseData = JSON.parse(data);
            post = parseData;
        }
        let ob = {
            id: Date.now(),
            title,
            user,
            content
        };
        post.push(ob);
        fs.writeFileSync("posts.json",JSON.stringify(post,null,2));
        res.status(201).send("Post created");
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

//listing post

export default createPost;