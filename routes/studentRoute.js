var express = require('express')
var router = express.Router()
const Student = require('./../models/Student')
const Address = require('./../models/Address')
const resFormat = require('./../helpers/respponseFormat')
var _ = require('lodash');

async function list(req, res) {
  try{
    Student.find({}, async function (err, students) {
      if(err)
        res.status(500).send(resFormat.rError(err))
      else{
        let data = []
        for(student of students){
          student = JSON.parse(JSON.stringify(student))
          student.address = await  Address.find({user: student._id})
          data.push(student)
        }
        res.send(resFormat.rSuccess(data))
      
      }
    }).sort({createdAt: -1})
  }catch(err){
    console.log(err)
    res.status(500).send(resFormat.rError('Something went wrong'))
  }
}

async function view(req, res) {
  try{
    Student.findById(req.params.id, async function (err, student) {
      if(err)
        res.status(500).send(resFormat.rError(err))
      else if(student){
        student = JSON.parse(JSON.stringify(student))
        student.address = await  Address.find({user: student._id})
        res.send(resFormat.rSuccess(student))
      }else{
        res.status(404).send(resFormat.rError('Student not found'))
      }

    }).populate('address').sort({createdAt: -1})
  }catch(err){
    console.log(err)
    res.status(500).send(resFormat.rError('Something went wrong'))
  }
}

async function create(req, res) {
  let student = req.body.student
  if(!student){
    res.status(500).send(resFormat.rError('Please add student'))
    return
  }
  try{
    let existingStudent = await Student.count({rollNo: student.rollNo, class: student.class})
    if(existingStudent){
      res.status(500).send(resFormat.rError('Duplicate Roll No'))
    }else{
      student = Object.assign(student, {createdAt: new Date(), updatedAt: new Date()})
      Student.create(student,async function(err, newStudent){
        if(err)
          res.status(500).send(resFormat.rError(err))
        else if(newStudent){
          let addresses = []
          student.address.forEach(add => {
            if(! _.isEmpty(add)){
              add.user = newStudent._id
              add = Object.assign(add, {createdAt: new Date(), updatedAt: new Date()})
              addresses.push(add)
            }
          })
          await Address.insertMany(addresses)
          res.send(resFormat.rSuccess())
        }else
          res.status(500).send(resFormat.rError('Something went wrong'))
      })
    }
  }catch(err){
    console.log(err)
    res.status(500).send(resFormat.rError('Something went wrong'))
  }
}

async function remove(req, res) {
  try{
    Student.deleteOne({_id: req.params.id}, async function(err, student){
      if(err)
        res.status(500).send(resFormat.rError(err))
      else if(student){
        Address.deleteMany({user: req.params.id},function(err, add){
          if(err)
            res.status(500).send(resFormat.rError(err))
          else
            res.send(resFormat.rSuccess())
        })
      }
    })
  }catch(err){
    console.log(err)
    res.status(500).send(resFormat.rError('Something went wrong'))
  }
}


async function update(req, res) {
  let student = req.body.student
  student = Object.assign(student, {updatedAt: new Date()})
  try{
    let existingStudent = await Student.count({rollNo: student.rollNo, class: student.class, _id: {$ne: student._id}})
    if(existingStudent)
      res.status(500).send(resFormat.rError('Duplicate Roll No'))
    else{
    
      Student.update({_id: req.params.id},{$set: student}, async function(err, studentObj){
        if(err)
          res.status(500).send(resFormat.rError(err))
        else if(student){
          if(student.address){
            for(add of student.address){
            
              if(add._id && add.deleted){
                await Address.deleteOne({_id: add._id})
              }
              else if(add._id && !add.deleted){
                add = Object.assign(add, {updatedAt: new Date()})
                await Address.update({_id: add._id},{$set: add})
              }else{
              
                if(! _.isEmpty(add)){
                  add.user = req.params.id
                  add = Object.assign(add, {createdAt: new Date(), updatedAt: new Date()})
                  await Address.create(add)
                }
              }
            }
          }
          res.send(resFormat.rSuccess())
        }
      })
    }
   
  }catch(err){
    console.log(err)
    res.status(500).send(resFormat.rError('Something went wrong'))
  }
}





router.get("/", list)
router.get("/:id", view)
router.post("/",create)
router.put("/:id",update)
router.delete("/:id", remove)


module.exports = router