import bcrypt from 'bcryptjs'

const generateRandomString = (num) => {
    return [...Array(num)].map(() => {
        const randomNum = ~~(Math.random() * 36);
        return randomNum.toString(36);
    })
        .join('')
        .toUpperCase();
}

const createHash = password => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds)
}
export { generateRandomString,createHash };