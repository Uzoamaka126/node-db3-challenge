const db = require('../data/db-config');

module.exports = {
    findSteps
};


function findSteps(userId) {
    return db('steps as st')
        .join('schemes as sc', 'sc.id', 'st.scheme_id')
        .select('st.id', 'sc.scheme_name', 'st.instructions')
        .where({ 'sc.id': userId })
}

// select st.id, sc.scheme_name, st.instructions 
// from steps as st
// join schemes as sc
//     on st.id = st.scheme_id
