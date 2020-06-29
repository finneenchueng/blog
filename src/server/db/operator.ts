import { Collection } from 'mongodb';
import { dbAction } from "../db/dbhelper";

export async function getUser(){
    return await dbAction({ tblName: 'user'}, (collection: Collection)=>{
        return new Promise(res => {
          collection.find({}).toArray((err, docs) => {
            console.log("Found the following records");
            // console.log(docs)
            res(docs);
          });
        });
        
    });
}