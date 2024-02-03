import axios from 'axios';
import { User } from './models/User';

axios.post('http://localhost:3000/users', { name: 'Daahir Abdi', age: 24})

const user = new User({ name: 'Ismail Eid', age: 25 })
user.on('change', () => {
  console.log('change event is invoked.')
})

user.trigger('change')