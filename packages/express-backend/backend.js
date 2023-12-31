// backend.js
import express from "express";
import cors from "cors";


const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}
const generateRandomID = () => {
    const randomLetters = Array.from({ length: 3 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('');
    const randomNumbers = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join('');
    const random = randomLetters + randomNumbers;
    return random;
}

const addUser = (user) => {
    const random = generateRandomID();
    user["id"] = random.toString();
    users['users_list'].push(user);
    return user;
}

const deleteUser = (id) => {
    const userIndex = users.users_list.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    users.users_list.splice(userIndex, 1);
  
    return { message: 'User deleted successfully' }; // Return an object, not res.json() - will do that in return 
  };
  const findUserByNameAndJob = (name, job) => { 
    return users['users_list']
        .filter( (user) => 
            user['name'] === name && user['job'] == job); 
}


const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);

        
app.get('/', (req, res) => {
    res.send('Hello World!');
});    

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id); 
    if (result === undefined) {
        res.status(404).send('Resource not found.');    
    } else {
        res.send(result);
    }
});



app.post('/users', (req, res) => {
    const userToAdd = req.body;
    const user = addUser(userToAdd);
    res.status(201).send(user);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = deleteUser(id);
    if (result === undefined) {
      res.status(404).send('Resource not found.');
    } else {
      res.json(result); // Send the result as JSON
    }
  });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  