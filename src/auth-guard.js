// const parser = document.createElement('a');

// export const parseUrl = (url) => {
//   parser.href = url;
//   return { hash, host, hostname, href, origin, pathname, port, protocol, search } = parser;
// }

let _prefix = 'apx:'
let _useHash = false
let _testProtected = (path) => path != '/'
let _loginPath = '/login'

const { location } = window
const { pathname, search, hash } = location
const getBackpathQuery = () => _useHash ? hash : search

const _getDelimiter = () => _useHash ? '#' :'?'
const _redirect = (url) => location.replace(url)
const _backpathExists = () => getBackpathQuery().startsWith(`${_getDelimiter()}${_prefix}`)

export const config = (config={}) => {
  const { useHash, testProtected, loginPath, prefix } = config
  _useHash = useHash || _useHash
  _testProtected = testProtected || _testProtected
  _loginPath = loginPath || _loginPath
  _prefix = prefix || _prefix
}

export const unprotect = () => {
  if(!_backpathExists()){ return }
  const prefixLen = _prefix.length + 1
  _redirect(getBackpathQuery().substr(prefixLen))
}

export const protect = () => {
  const isProtected = (path) => ( _testProtected(path) && path != _loginPath )
  /*
    window.location
    ---------------
    ancestorOrigins: DOMStringList {length: 0}
    assign: ƒ ()
    hash: ""
    host: "localhost:9101"
    hostname: "localhost"
    href: "http://localhost:9101/"
    origin: "http://localhost:9101"
    pathname: "/"
    port: "9101"
    protocol: "http:"
    reload: ƒ reload()
    replace: ƒ ()
    search: ""
    toString: ƒ toString()
  */
  if( isProtected(pathname) ){
    const delim = _getDelimiter()
    _redirect(`${location.origin}${_loginPath}${delim}${_prefix}${location.href}`)
  }
}
