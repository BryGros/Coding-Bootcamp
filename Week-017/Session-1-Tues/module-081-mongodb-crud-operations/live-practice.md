<!-- Put this into the shell via Compass -->
<!--
Go to localhost:27017

Codecademy

students

Open MongoDb Shell
-->
<!-- run each command one at a time and make sure that find works -->

```javascript
db.students.insertOne({ name: "Sarah", email: "sarah@codecademy.com" });

db.students.find({ name: "Sarah"});

db.students.insertMany([
  {
    name: "Alice Smith",
    email: "alice@example.com",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
  },
  {
    name: "Charlie Davis",
    email: "charlie@example.com",
  },
]);

db.students.find();

db.students.updateOne(
  { name: "Alice Smith" },
  { $set: { email: "alice.s@example.com" } }
);

db.students.find();

db.students.deleteOne({ name: "Charlie Davis" });

db.students.find();
```
