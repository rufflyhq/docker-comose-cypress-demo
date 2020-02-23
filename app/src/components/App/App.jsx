import React, { useEffect, useState } from 'react';
import AppUI from './AppUI';
import userService from '../../services/user';

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const _loadUser = () => {
    return userService.getUsers().then(({ data }) => setUsers(data));
  };

  const loadUser = () => {
    setLoading(true);
    return _loadUser()
      .catch(e => {
        console.log(e);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const handleOnChange = (id, value) => {
    const userCopy = { ...user };
    userCopy[id] = value;
    setUser(userCopy);
  };

  const handleOnDelete = ({ email }) => {
    setLoading(true);
    userService
      .deleteUser({ email })
      .then(_loadUser)
      .catch(e => {
        console.log(e);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const handleOnSubmit = () => {
    if (!user || !user.name || !user.email) {
      return;
    }

    setLoading(true);
    userService
      .createUser(user)
      .then(_loadUser)
      .catch(e => {
        console.log(e);
      })
      .then(() => {
        setUser(null)
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AppUI
      users={users}
      loading={loading}
      onChange={handleOnChange}
      onSubmit={handleOnSubmit}
      onDelete={handleOnDelete}
    />
  );
}

export default App;
