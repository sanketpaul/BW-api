const express=require('express')
const app=express()
const fs=require('fs')
const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')
const Port=process.env.PORT||5000
const morgan=require('morgan')
const mongo=require('mongodb')
let MongoClient=mongo.MongoClient
let mongoUrl=process.env.MongoLocal
let db;

app.use(morgan('short',{stream:fs.createWriteStream('./app.logs')}))
app.use(cors())

app.get('/',(req,res)=>{
    sort={Price:1}
    if(req.query.sort){
        sort={Price:req.query.sort}
    }
    
    db.collection('bikes').find().sort(sort).toArray((err,result)=>{
        res.send(result)
    })
})
// 1
app.get('/categories',(req,res)=>{
    db.collection('category').find().toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})
// 2
app.get('/bikes',(req,res)=>{
    query={}
    brand=Number(req.query.brand)
    if(brand){
        query={Brand_id:brand}
    }
    db.collection('bikes').find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})
// bikes wrt category
app.get('/catbike',(req,res)=>{
    query={}
    categoryId=Number(req.query.categoryId)
    if(categoryId){
        query={
            category_id:categoryId
        }
    }
    db.collection('bikes').find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
        
    })

})

app.get('/filter/:brandId',(req,res)=>{
    query={}
    brandId=Number(req.params.brandId)
    lprice=Number(req.query.lprice)
    hprice=Number(req.query.hprice)
    category=(req.query.category)
    if(category&&lprice&&hprice){
        query={
            Brand_id:brandId,
            category:category,
            $and:[{Price:{$lt:hprice,$gt:lprice}}]

        }
    }

    else if(lprice&&hprice){
        query={
            Brand_id:brandId,
           $and:[{Price:{$lt:hprice,$gt:lprice}}]
        }
    }
    else if(category){
        query={
            category:category
        }
    }






    db.collection('bikes').find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
        
    
})


app.get('/filtercat/:categoryId',(req,res)=>{
    categoryId=Number(req.params.categoryId)
    brandId=Number(req.query.brandId)
    lprice=Number(req.query.lprice)
    hprice=Number(req.query.hprice)
    sort={Price:1}

    query={}
    if(req.query.sort){
        sort={Price:req.query.sort}
    }
    if(brandId&&lprice&&hprice){
        query={
            category_id:categoryId,
            Brand_id:brandId,
            $and:[{Price:{$lt:hprice,$gt:lprice}}]
        }

    }
    else if(lprice&&hprice){
        query={
            category_id:categoryId,
            $and:[{Price:{$lt:hprice,$gt:lprice}}]
        }

    }
    else if(brandId){
        query={
            category_id:categoryId,
            Brand_id:brandId

        }
    }
    db.collection('bikes').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

// Details Page
app.get('/details/:id',(req,res)=>{
    let id=Number(req.params.id)
   db.collection('bikes').find({id:id}).toArray((err,result)=>{
    if(err) throw err
    res.send(result)
   })
})




MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log("error while connecting")
    db=client.db('bikewale')
    app.listen(Port,()=>{
        console.log(`server is running at ${Port}`)
    })
})