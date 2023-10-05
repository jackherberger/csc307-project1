import Table from "./Table"
import Form from "./Form"
import React, {useState, useEffect} from 'react';




function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter (index) {
      const updated = characters.filter((character, i) => {
          return i !== index
      });
    setCharacters(updated);
  }

  

  function updateList(person) {
    postUser(person)
      .then(res => {
        if (res.status === 201) {
          return res.json();
        }
        else {
          throw new Error(`Received status code ${res.status}`);
        }  
       })

        .then(data => {
            setCharacters([...characters, data]);
          })
      .catch(error => {
        console.error('There was a problem with the POST request:', error);
      });
  }



  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }


  return (
    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
      

    </div>
  )
}

export default MyApp;
