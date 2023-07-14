// Create user
dbAdmin = db.getSiblingDB("admin");
dbAdmin.createUser({
    user: "nextjsRoot",
    pwd: "root",
    roles: [{ role: "userAdminAnyDatabase", db: "admin" }],
    mechanisms: ["SCRAM-SHA-1"],
});

// Authenticate user
dbAdmin.auth({
    user: "nextjs",
    pwd: "1234",
    mechanisms: ["SCRAM-SHA-1"],
    roles: [{ role: "userAdminAnyDatabase", db: "next_tailwind" }, { role: "readWrite", db: "next_tailwind" }],
    digestPassword: true,
});


// Create DB and collection
db = new Mongo().getDB("next_tailwind");
db.getSiblingDB('next_tailwind');
db.createUser({
    user: "next_user",
    pwd: "111111",
    roles: ["readWrite"],
});

db.createCollection("users", { capped: false });

