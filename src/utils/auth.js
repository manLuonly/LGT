import Cookies from 'js-cookie'

const TokenKey = 'Token';
const Name = 'name';
const Avatar = 'Avatar';

export function getToken(TokenKey) {
    return Cookies.get(TokenKey)
}

export function setToken(TokenKey, token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getName(Name) {
    return Cookies.get(Name)
}

export function setName(Name, name) {
    return Cookies.set(Name, name)
}

export function removeName() {
    return Cookies.remove(Name)
}


export function getAvatar(Avatar) {
    return Cookies.get(Avatar)
}

export function setAvatar(Avatar, avatar) {
    return Cookies.set(Avatar, avatar)
}

export function removeAvatar() {
    return Cookies.remove(Avatar)
}