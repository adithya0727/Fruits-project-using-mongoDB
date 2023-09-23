const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/fruitsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const vegSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true},
  rating: {
    type: Number,
    min:1,
    max:10
  },
  age: Number
})

const Veggie = new mongoose.model("Veggie",vegSchema);


const veg2 = new Veggie({name:"veg9",rating:2,age:213});
const veg3 = new Veggie({name:"veg10",rating:5,age:231});
Promise.all([veg3.save()])
.then(() => {
  console.log('Veggies saved successfully');
Veggie.deleteMany({name:"veg2"})
  Veggie.find({}, 'name')
    .then(veggies => {
      veggies.forEach(veggie => {
        console.log(veggie.name);
      });
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error retrieving veggies:', err);
      mongoose.connection.close();
    });
})
.catch((err) => {
  console.error('Error saving veggies:', err);
  mongoose.connection.close();
});