import server from './server'

export default function request({ method = "get", url = '', data = {}, params = {} }) {
    return server({
        method,
        url,
        data,
        params
    })
}