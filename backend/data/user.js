import bcrypt from "bcrypt";

const users = [
    {
      name: 'admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('password123', 10),
      isAdmin: true, 
    },
    {
      name: 'Priya Sharma',
      email: 'priya@gmail.com',
      password: bcrypt.hashSync('password456', 10),
      isAdmin: false, 
    },
    {
      name: 'Ravi Patel',
      email: 'ravi@gmail.com',
      password: bcrypt.hashSync('password789', 10),
      isAdmin: false, 
    },
    {
      name: 'Neha Gupta',
      email: 'neha@gmail.com',
      password: bcrypt.hashSync('password101', 10),
      isAdmin: false, 
    },
  ];  

  export default users;