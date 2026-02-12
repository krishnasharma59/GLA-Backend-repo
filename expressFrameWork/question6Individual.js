import fs from 'fs';
function individualPost(req,res){
    try{
        let {id} = req.params;
        id = Number(id.slice(1));
        if(!id){
            return res.status(400).send("all fields required");
        }
        if(!fs.existsSync("posts.json")){
            return res.status(404).send("No Post found");
        }
        let data = fs.readFileSync("posts.json","utf-8");
        let parseData = JSON.parse(data);
        let isUser = parseData.filter(a=>a.id===id)
        if(!isUser){
            return res.status(404).send("User not Found");
        }
        res.status(201).send(isUser);
        
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
export default individualPost;