/* Api methods to call /functions */

const create = (data) => {
  return fetch("/.netlify/functions/cv-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/cv-read-all").then((response) => {
    return response.json();
  });
};

const update = (todoId, data) => {
  return fetch(`/.netlify/functions/cv-update/${todoId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const deleteTodo = (todoId) => {
  return fetch(`/.netlify/functions/cv-delete/${todoId}`, {
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const batchDeleteTodo = (todoIds) => {
  return fetch(`/.netlify/functions/cv-delete-batch`, {
    body: JSON.stringify({
      ids: todoIds,
    }),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const createList = (data) => {
  return fetch("/.netlify/functions/cvl-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const readAllList = () => {
  return fetch("/.netlify/functions/cvl-read-all").then((response) => {
    return response.json();
  });
};

const updateList = (todoId, data) => {
  return fetch(`/.netlify/functions/cvl-update/${todoId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const deleteList = (todoId) => {
  return fetch(`/.netlify/functions/cvl-delete/${todoId}`, {
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const batchDeleteList = (todoIds) => {
  return fetch(`/.netlify/functions/cvl-delete-batch`, {
    body: JSON.stringify({
      ids: todoIds,
    }),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};
export default {
  create: create,
  readAll: readAll,
  update: update,
  delete: deleteTodo,
  batchDelete: batchDeleteTodo,
  createList: createList,
  readAllList: readAllList,
  updateList: updateList,
  deleteList: deleteList,
  batchDeleteList: batchDeleteList,
};
