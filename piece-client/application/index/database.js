module.exports = (db,fn,data) => {
    switch (fn) {
        case 'addProject':
            ldbc.insert('project', {
                id: ldbc.id,
                type: data.type,
                name: data.name,
                location: data.location
            });
            break;
    }
};