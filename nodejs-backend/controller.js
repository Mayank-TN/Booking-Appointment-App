const User = require('./user')

exports.getUsers = async (req,res,next)=>{
    const users = await User.findAll();
    res.json(users)
}

exports.getUserById = async (req,res,next)=>{
    const users = await User.findByPk(req.params.id);
    res.json(users)
}



exports.postUser = async (req,res,next)=>{
    const name = req.body.name ;
    const email = req.body.email ;
    const number = req.body.number ;
    User.create({
        name ,
        email,
        number
    }).then((result)=>{
        res.json({message : 'User Created successfully'})
    })
}

exports.deleteUser = async (req,res,next)=>{
    const userId = req.params.id
    User.findByPk(userId)
  .then( (user)=>{
    return user.destroy()
  })
  .then((result)=>{
    res.json({message : 'User Deleted Successfully'})
  })
  .catch(err=>console.log(err))
}

exports.editUser = (req,res,next)=>{
    const userId = req.params.id
  User.findByPk(userId).then((user)=>{
    user.name = req.body.name ;
    user.email = req.body.email ;
    user.number = req.body.number ;
    return user.save();
  })
  .then((result)=>{
    res.json({message : 'User updated successfully'})
  })
  .catch(err=>console.log(err))
}
