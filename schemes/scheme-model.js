const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
        .where({id})
        .first();
}

function findSteps(scheme_id) {
    return db('steps')
        .join('schemes', 'scheme_name', 'steps.scheme_id')
        .select('steps.id', 'schemes.scheme_name', 'steps.instructions')
        .where({scheme_id});
}

async function add(scheme) {
    const [id] = await db('schemes').insert(scheme);
    return findById(id);
}

async function update(changes, id) {
    await db('schemes')
        .where({id})
        .update(changes);

    return findById(id);
}

function remove(id) {
    return db('schemes')
        .where({id})
        .del();
}