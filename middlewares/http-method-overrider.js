// TODO: Criar testes para o middleware
function overrideHttpMethod(req, _res, next) {
    const { body } = req;

    if (typeof body === 'object' && body._method) {
        switch(body._method.toUpperCase()) {
            case 'PUT':
            case 'DELETE':
                req.method = body._method;
                break;
            default:
                req.method = 'GET'
        }
    }
    
    if ('_method' in body) delete req.body._method;

    next();
}

module.exports = overrideHttpMethod;