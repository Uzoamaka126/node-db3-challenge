const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    update,
    remove,
    add,
    addStep
};

function find() {
    return db('steps');
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
}

function findSteps(userId) {
    return db('steps as st')
        .join('schemes as sc', 'sc.id', 'st.scheme_id')
        .select('st.id', 'sc.scheme_name', 'st.instructions')
        .where({ 'sc.id': userId })
}

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then((ids => {
            return findById(ids[0]);
        }));
};
function addStep(step, schemeId) {
    return db('steps as st')
        // .join('schemes as sc', 'sc.id', 'st.scheme_id')
        .insert(step)
        .select('schemes as sc')
        .where('sc.id', schemeId)
        .then((ids => {
            return findById(ids[0]);
        }));
};

function update(id, changes) {
    return db('schemes')
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db('schemes')
      .where('id', Number(id))
      .del();
  }