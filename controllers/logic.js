const employees = require("../models/emsschema");



// logic to register new employees
exports.employeeRegister = async (req, res) => {

    //acessing file from multer
    const file = req.file.filename
    const { fname, lname, email, phn, mobile, gender, status, location } = req.body

    if (!fname || !lname || !email || !phn || !mobile || !gender || !status || !location || !file) {
        res.status(403).json("all inputs are required")
    }

    try {
        const preEmployee = await employees.findOne({ email: email })
        if (preEmployee) {
            res.status(403).json("employee already exist")
        }
        else {
            const newEmployee = new employees({
                fname, lname, email, phn, mobile, gender, status, profile: file, location
            })
            await newEmployee.save()
            res.status(200).json(newEmployee)
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//logic to get all employees
exports.getAllEmployees = async (req, res) => {


    // acess query parameter from req
    const searchKey = req.query.search
    // create regular expression to match with the name
    const query={
        fname:{$regex:searchKey,$options:"i"} // "i"=donot check whether the word is case sensitive
    }

    try {
        const allEmployees = await employees.find(query)
        res.status(200).json(allEmployees)
    }
    catch (err) {
        res.status(401).json(err)
    }


}

// logic to get Profile
exports.getProfile=async(req,res)=>{
    const {id}=req.params

    // to find employee in data base

    try{
        const preuser= await employees.findOne({_id:id})
        res.status(200).json(preuser)
    }
    catch{
        res.status(401).json("employee not exist")
    }
  

}

// logic to delete Profile
exports.deleteEmployee=async(req,res)=>{
    const {id}=req.params

    // to delete employee in data base

    try{
        const deletedItem= await employees.findByIdAndDelete({_id:id})
        res.status(200).json(deletedItem)
    }
    catch{
        res.status(401).json("employee not exist")
    }
  

}

// logic to edit employee

exports.editUser=async(req,res)=>{
    const {id}=req.params

   
    const { fname, lname, email, phn, mobile, gender, status, location, user_profile } = req.body

    const file = req.file?req.file.filename:user_profile

    try{
     const user = await employees.findOne({_id:id})
     if(user){
        user.fname=fname
        user.lname=lname
        user.email=email
        user.phn=phn
        user.mobile=mobile
        user.gender=gender
        user.status=status
        user.location=location
        user.profile=file

        await user.save()
        res.status(200).json(fname)
     }
    }
    catch(error){
        res.status(401).json(error)
    }

}

