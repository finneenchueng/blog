import { Collection, Cursor } from "mongodb";
import { dbAction, dbCRUD } from "../db/dbhelper";
/* 
 * todo
export async function getUserById(id: string){
  return await dbAction({ tblName: 'user'}, (collection: Collection)=>{
      return new Promise(res => {
        collection.find({}).toArray((err, docs) => {
          // console.log("Found the following records");
          res(docs);
        });
      });
      
  });
}
*/
export enum OperateTypes {
    Aggregate = "aggregate",
    Count = "count",
    CountDocuments = "countDocuments",
    Find = "find",
    FindOne = "findOne",
    FindOneAndReplace = "findOneAndReplace",
    FindOneAndUpdate = "findOneAndUpdate",
    FindOneAndDelete = "findOneAndDelete",
    Insert = "insert",
    InsertOne = "insertOne",
    InsertMany = "insertMany",
    Delete = "delete",
    DeleteOne = "deleteOne",
    DeleteMany = "deleteMany",
    Update = "update",
    UpdateOne = "updateOne",
    UpdateMany = "updateMany",
    Distinct = "distinct",
    Drop = "drop",
    DropIndex = "dropIndex",
    DropIndexes = "dropIndexes",
}

export async function getUser() {
    const result = await dbCRUD({ tblName: 'user', operatedType: OperateTypes.Find }, {});
    return result;
}

export async function getUserById(id: string) {
  const result = await dbCRUD({ tblName: 'user', operatedType: OperateTypes.FindOne }, {
    query: {
      user_id: id
    } 
  });
  return result[0];
}
