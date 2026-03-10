## To recreate this project

Run from the root of this folder for any terminal commands.

1.

```bash
npm init -y
```

2.

```bash
npm install mongoose dotenv
```

3. create a .env - populate it

```
MONGODB_CONNECT=<put your connection string here>
```

4. create index.js - populate that

```
const mongoose = require("mongoose");
require("dotenv").config();
console.log("This is our connection string", process.env.MONGODB_CONNECT);
```

5. git init
6. create a .gitignore with these contents

```
.env
node_modules
```

7. run index.js

```
node index.js
```

8. You should see:

```
This is our connection string <connection string here>
```

9. Populate the index file as shown in index.js
10. You should get a list of movies out from the db in the console
11. Commit the files to your repo
12. Notice how the files aren't added from the gitignore (note this is a local repo only , no Github instance)
