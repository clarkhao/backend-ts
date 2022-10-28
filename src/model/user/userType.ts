interface User {
    name: string,
    checkUser: (name:string) => Promise<boolean>,
    createUser: (uesr: User) => Promise<boolean>,
    updateUser: (str: string) => Promise<boolean>,
    deleteUser: (user: User) => Promise<boolean>
}

export {User};