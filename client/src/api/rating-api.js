const baseAPI = '/api';

const ratingService = {
  get() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/ratinges`)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch((err) => {
          reject(err);
        });
    });
  },

  create(rating) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/rating`, {
        method: 'PUT',
        body: JSON.stringify(rating),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch((err) => {
          reject(err);
        });
    });
  },

  update(rating) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/rating`, {
        method: 'POST',
        body: JSON.stringify(rating),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  destroy(rating) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/rating/${rating.id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default ratingService;
