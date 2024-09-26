import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then((result) => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return /^\d{2,3}-\d{5,}$/.test(value)
      },
      message: (props) => `${props.value} is not a valid number`,
    },
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model('Person', personSchema)
