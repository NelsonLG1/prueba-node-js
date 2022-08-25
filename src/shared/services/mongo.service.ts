import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { connectionDb } from 'src/config/mongo-connect';
import { ResponseModel } from '../models/response.model';
import { ResponseService } from './response.service';
const _ = require('underscore');

@Injectable()
export class MongoService extends ResponseService {
    private connection: any = connectionDb;
    private responseMongo: ResponseModel;

    public constructor() {
        super();
    }

    public async getAll(collection, query, select = null, sort = {}, limit = 999999, page = 1) {
        try {
            const find = await this.connection.then(db => {
                return db.collection(collection).find(query, { fields: select }).sort(sort).skip((Number(limit) * Number(page)) - Number(limit)).limit(Number(limit)).toArray()
            });
            if(find !== null) {
                this.responseMongo = this.responseOK(find);
            } else {
                this.responseMongo = this.responseOK({}, 'La consulta no encontro datos');
            }
        } catch (error) {
            this.responseMongo = this.responseError(error.toString());
        } 
        
        return this.responseMongo;
    }

    public async get(collection, id, select = null) {
        try {
            const find = await this.connection.then(db => {
                return db.collection(collection).findOne({ _id: new ObjectId(id) }, { fields: select })
            });
            if(find !== null) {
                this.responseMongo = this.responseOK(find);
            } else {
                this.responseMongo = this.responseOK({}, 'La consulta no encontro datos');
            }
        } catch (error) {
            this.responseMongo = this.responseError(error.toString());
        } 
        
        return this.responseMongo;
    }

    public async getQuery(collection, query, select = null) {
        try {
            const find = await this.connection.then(db => {
                return db.collection(collection).findOne(query, { fields: select })
            })
            if(find !== null) {
                this.responseMongo = this.responseOK(find);
            } else {
                this.responseMongo = this.responseOK({}, 'La consulta no encontro datos');
            }
        } catch (error) {
            this.responseMongo = this.responseError(error.toString());
        } 
        
        return this.responseMongo;
    }

    public async create(collection, data) {
        try {
            const insert = await this.connection.then(db => {
                return db.collection(collection).insertOne(data)
            }).then(result => { return result.insertedId })
                .catch(function (err: any) { return err });
            if(insert !== null) {
                const newCreate = (await this.get(collection, insert)).data;
                this.responseMongo = this.responseOK(newCreate);
            }
            else {
                this.responseMongo = this.responseError('Ha ocurrido un error en la creación.', 404);
            }
        } catch (error) {
            this.responseMongo = this.responseError(error.toString());
        } 
        
        return this.responseMongo;
    }

    public async update(collection, id, data, unset?) {
        try {
            let datos: Object = { $set: data };
            if (unset != null) {
                datos = { $unset: unset };
            }
            const updateOne = await this.connection.then(db => {
                return db.collection(collection).updateOne(
                    { _id: new ObjectId(id) },
                    datos,
                    { upsert: false }
                )
            }).then(result => { return result.upsertedId || id })
                .catch(function (err: any) { return err });
            if(updateOne !== null) {
                const newUpdate = (await this.get(collection, updateOne)).data;
                this.responseMongo = this.responseOK(newUpdate);
            }
            else {
                this.responseMongo = this.responseError('Ha ocurrido un error en la actualización.', 405);
            }
        } catch (error) {
            this.responseMongo = this.responseError(error.toString());
        } 
        
        return this.responseMongo;        
    }

    public async updateQuery(collection, query, data, unset?) {
        let datos: Object = { $set: data };
        if (unset != null) {
            datos = { $unset: unset };
        }
        return this.connection.then(db => {
            return db.collection(collection).updateOne(
                query,
                datos,
                { upsert: false, returnNewDocument: true }
            )
        }).then(result => { return result.upsertedId || query })
            .catch(function (err: any) { return err });
    }

    public async delete(collection, id) {
        try {
            const deleteOne = await this.connection.then(db => {
                return db.collection(collection).deleteOne({ _id: new ObjectId(id) })
            }).then(result => { return result._id })
                .catch(function (err: any) { return err });
            if(deleteOne !== null) {
                this.responseMongo = this.responseOK({});
            }
            else {
                this.responseMongo = this.responseError('Ha ocurrido un error en la eliminación.', 405);
            }
        } catch (error) {
            this.responseMongo = this.responseError(error.toString());
        } 
        
        return this.responseMongo;
    }

    public async deleteQuery(collection, query) {
        return this.connection.then(db => {
            return db.collection(collection).deleteOne(query)
        }).then(result => { return result._id })
            .catch(function (err: any) { return err });
    }

    public async findAndModify(collection, key) {
        let value = { seq: 0 };
        return this.connection.then(db => {
            return db.collection(collection).findAndModify({ _id: key }, null, { $inc: { seq: 1 } }, { new: true });
        });
    }

}

