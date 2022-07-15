import mongoose from "mongoose"
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, {versionKey: false})

studentSchema.index({'$**': 'text'});
// const Student = module.exports = mongoose.model("student", studentSchema, "student")

// const Student = mongoose.model("student", studentSchema, "student")
// module.exports = mongoose.model("student", studentSchema, "student")

export const Student = mongoose.model("student", studentSchema, "student")

export function getStudents(callback){
    Student.find(callback)
}

// export function getStudentById(studentId, callback){
//     Student.findById({_id: studentId}, callback)
// }

export function getStudentByText(text, callback){
    const filter = mongoose.isObjectIdOrHexString(text) ? {_id: text}
                                                        : {$text: {$search: text}}
    Student.find(filter, callback);
}

export function createStudent(student, callback){
    Student.create(student, callback)
}

export function updateStudent(studentId, student, callback){
    Student.updateOne({_id: studentId}, student, callback)
}

export function deleteStudent(studentId, callback){
    Student.deleteOne({_id: studentId}, callback)
}