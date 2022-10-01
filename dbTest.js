const db = require('./models');

async function createUser() {
    try {
        const newUser = await db.user.create({
            name: "My Name",
            email: "myemail@gmail.com"
        });
        console.log('my new user >>>', newUser);
    } catch (error) {
        console.log('new user was not created b/c of >>>', error);
    }
    
}
async function findOneUser() {
    try {
        const user = await db.user.findOne({
            where: { id: 1 }
        });
        console.log('current user here >>>', user);  
    } catch (error) {
        console.log('did not find user b/c of >>>', error);
    }
}

async function findAllUsers() {
    try {
        const users = await db.user.findAll();
        console.log('all users here >>>', users);  
    } catch (error) {
        console.log('did not find all users because of >>>', error);
    }
}

async function findOrCreate() {
    try {
        const users = await db.user.findOrCreate({
            where: { email: 'brainsmith@gmail.com' },
            defaults: {
                name: 'Brian Smith',
            },
        });
        console.log('all users here >>>', users);  
    } catch (error) {
        console.log('did not find all users because of >>>', error);
    }
}

async function updateUser() {
    try {
        const numRowsUpdated = await db.user.update({
            name: 'Brain Taco'
        }, {
            where: {
                email: 'brainsmith@gmail.com'
            }
        });
        console.log('number of users updated', numRowsUpdated);
    } catch (error) {
        console.log('did not update user(s) because of >>>', error);
    }
}

async function deleteUser() {
    try {
        let numOfRowsDeleted = await db.user.destroy({
            where: { email: 'brainsmith@gmail.com' }
        });
        console.log('number of rows deleted >>>', numOfRowsDeleted);
    } catch (error) {
        console.log('did not delete user(s) because of >>>', error);
    }
}
