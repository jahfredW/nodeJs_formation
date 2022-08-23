exports.success = (data) => {
    return {
        'status': 200,
        'message': data
    }
}

exports.error = (message) => {
    return {
        'status': 404,
        'message': message
    }
}

exports.getIndex = (id, obj) => {
    for (let index = 0; index < obj.length; index++) {
        if (obj[index].id == id) {
            return index;
        }
    }
    return "wrong id";
}
