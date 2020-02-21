import React from 'react';
import PropTypes from 'prop-types';
import UserList from '../UserList';
import logoWide from './logoWide.svg';
import style from './app.module.scss';

function AppUI(props) {
  const { users, onDelete, loading, onSubmit, onChange } = props;
  const showUserList = users && users.length > 0 ? true : false;
  return (
    <div>
      <nav class="nav">
        <a href="/" className={`nav-link ${style.logo}`}>
          <img src={logoWide} alt="Incubate" class="logo" />
        </a>
      </nav>
      <main>
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Create Users</h1>
        </div>
        <form
          key={`form-${users.length}`}
          disabled={loading}
          className={style.form}
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className={`form-inputs ${style.inputs}`}>
            <input
              onChange={x => {
                onChange('name', x.target.value);
              }}
              type="name"
              id="inputName"
              className={`form-control ${style.control}`}
              placeholder="Full Name"
              required=""
              autoFocus=""
            />
            <input
              onChange={x => {
                onChange('email', x.target.value);
              }}
              type="email"
              id="inputEmail"
              className={`form-control ${style.control}`}
              placeholder="Email address"
              required=""
              autoFocus=""
            />
          </div>

          <div className={style.footer}>
            <button
              disabled={loading}
              className={`btn btn-lg btn-primary btn-block ${style.submit}`}
              type="submit"
            >
              Create Users
            </button>
            {!loading ? null : (
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </form>

        {showUserList ? <UserList users={users} loading={loading} onDelete={onDelete} /> : null}
      </main>
    </div>
  );
}

AppUI.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({ user: PropTypes.string, email: PropTypes.string })),
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

AppUI.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
};

export default AppUI;
