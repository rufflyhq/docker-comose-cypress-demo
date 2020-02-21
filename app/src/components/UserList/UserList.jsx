import React from 'react';
import PropTypes from 'prop-types';
import style from './user.module.scss';

function UserList(props) {
  const { users, loading, onDelete } = props;
  const components = users.map((x, index) => {
    const key = `${x.email}, ${index}`;

    return (
      <li key={key} className={`row ${style.cell}`}>
        <div className="col-sm-5">{x.name}</div>
        <div className="col-sm-5">{x.email}</div>
        <div className="col-sm-2">
          <button
            disabled={loading}
            onClick={e => {
              onDelete(x, e);
            }}
            type="button"
            className="btn btn-danger"
          >
            delete
          </button>
        </div>
      </li>
    );
  });
  return (
    <div className={`container ${style.container}`}>
      <h2>Users</h2>
      <ul className={style.list}>{components}</ul>
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({ user: PropTypes.string, email: PropTypes.string })),
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
};

UserList.defaultProps = {
  users: [],
  onDelete: () => {},
};

export default UserList;
