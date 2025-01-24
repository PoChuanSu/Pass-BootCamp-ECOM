import brycpt from "bcrypt";

const users = [
    {
        name: "Admin User",
        email: "admin@email.com",
        password: brycpt.hashSync("123456", 12),
        isAdmin: true,
    },
    {
        name: "John Wicked",
        email: "john@email.com",
        password: brycpt.hashSync("123456", 12),
        isAdmin: false,
    },
    {
        name: "David Tao",
        email: "david@email.com",
        password: brycpt.hashSync("123456", 12),
        isAdmin: false,
    },
];

export default users;
