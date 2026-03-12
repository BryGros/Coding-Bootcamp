# MongoDB Modeler Walkthrough: Connecting Users to Posts

## What You Will Build

In this walkthrough, you will use MongoDB Modeler to design a database schema with two collections: users and posts. You will learn how to create collections, add fields, and connect them using relationships. By the end, you will understand how primary keys and foreign keys work in MongoDB.

## Step 1: Open MongoDB Modeler

1. Open your web browser
2. Navigate to: https://mongomodeler.com/editor.html
3. You should see a blank canvas with a toolbar at the bottom

The toolbar has these buttons:
- Collection (green button) - Creates a new collection
- Relation (plug icon button) - Connects collections together
- Other tools for advanced features

## Step 2: Create the Users Collection

**Add the collection:**

1. Click the green **"Collection"** button at the bottom of the screen
2. A dialog box appears asking for a collection name
3. Type: `users`
4. Click **OK**

A green box labeled "users" appears on the canvas. This represents your users collection.

**Add fields to users:**

1. Click on the green **users** box to select it
2. The right sidebar shows "Fields" panel
3. We will add 7 fields to represent user data

**Field 1: underscore id (Primary Key)**

1. In the Fields panel, you should see underscore id already listed
2. Type: `objectId`
3. This is the primary key - every document gets one automatically
4. Leave it as is

**Field 2: username**

1. Click the **"+ Add Field"** button
2. Name: `username`
3. Type: `string`
4. Check the box for **Required**
5. Check the box for **Unique**
6. This ensures every user has a unique username

**Field 3: email**

1. Click **"+ Add Field"**
2. Name: `email`
3. Type: `string`
4. Check the box for **Required**
5. Check the box for **Unique**
6. Users need unique emails for login

**Field 4: password**

1. Click **"+ Add Field"**
2. Name: `password`
3. Type: `string`
4. Check the box for **Required**
5. Note: In real apps, passwords are hashed before storage

**Field 5: role**

1. Click **"+ Add Field"**
2. Name: `role`
3. Type: `string`
4. In the **Default** field, type: `user`
5. This gives new users a default role of "user"

**Field 6: createdAt**

1. Click **"+ Add Field"**
2. Name: `createdAt`
3. Type: `date`
4. This tracks when the user account was created

**Field 7: updatedAt**

1. Click **"+ Add Field"**
2. Name: `updatedAt`
3. Type: `date`
4. This tracks when the user account was last modified

Your users collection is now complete. You should see all 7 fields listed in the users box.

## Step 3: Create the Posts Collection

**Add the collection:**

1. Click the green **"Collection"** button at the bottom again
2. A dialog box appears
3. Type: `posts`
4. Click **OK**

A second green box labeled "posts" appears on the canvas. You can drag it to position it next to the users box.

**Add fields to posts:**

1. Click on the green **posts** box to select it
2. The Fields panel on the right updates to show posts fields
3. We will add 6 fields

**Field 1: underscore id (Primary Key)**

1. underscore id is already there
2. Type: `objectId`
3. This is the primary key for posts
4. Leave it as is

**Field 2: userId (Foreign Key)**

This is the most important field because it connects posts to users.

1. Click **"+ Add Field"**
2. Name: `userId`
3. Type: `objectId`
4. Check the box for **Required**
5. This field stores the underscore id of the user who created the post
6. This makes it a foreign key

**Field 3: title**

1. Click **"+ Add Field"**
2. Name: `title`
3. Type: `string`
4. Check the box for **Required**
5. Every post needs a title

**Field 4: content**

1. Click **"+ Add Field"**
2. Name: `content`
3. Type: `string`
4. Check the box for **Required**
5. Every post needs content

**Field 5: createdAt**

1. Click **"+ Add Field"**
2. Name: `createdAt`
3. Type: `date`

**Field 6: updatedAt**

1. Click **"+ Add Field"**
2. Name: `updatedAt`
3. Type: `date`

Your posts collection is now complete with 6 fields.

## Step 4: Connect Users to Posts with a Relationship

Now we will create a visual connection showing that users can have many posts.

**Open the Add Relation dialog:**

1. Click the **plug icon button** at the bottom of the screen (labeled "Relation")
2. The "Add Relation" dialog appears with a dark background
3. This dialog has 5 dropdown menus

**Fill in the relationship form:**

**Dropdown 1: Type of relation**
1. Click the dropdown
2. Select: `1:M` (one-to-many)
3. This means one user can have many posts

**Dropdown 2: Origin Collection**
1. Click the dropdown
2. Select: `users`
3. This is where the relationship starts (the "one" side)

**Dropdown 3: Origin field**
1. Click the dropdown
2. Select: `_id`
3. This is the primary key we are connecting from

**Dropdown 4: Destination Collection**
1. Click the dropdown
2. Select: `posts`
3. This is where the relationship goes (the "many" side)

**Dropdown 5: Destination field**
1. Click the dropdown
2. Select: `userId`
3. This is the foreign key that stores the reference

**Review your settings:**
```
Type of relation: 1:M
Origin Collection: users
Origin field: _id
Destination Collection: posts
Destination field: userId
```

**Apply the relationship:**

1. Click the orange **"Apply"** button at the bottom of the dialog
2. The dialog closes
3. You should now see an orange line connecting the users box to the posts box

The orange line shows that:
- One user (users.underscore id) can have many posts
- Each post (posts.userId) belongs to one user
- The userId field in posts stores the underscore id from users

## Step 5: Understanding What You Built

**Primary Keys:**
- users.underscore id is the primary key for users
- posts.underscore id is the primary key for posts
- Both are type ObjectId
- Both are unique identifiers

**Foreign Key:**
- posts.userId is the foreign key
- It stores an ObjectId that matches a users.underscore id
- This creates the connection between collections

**The Relationship:**
- Type: One-to-Many (1:N)
- One user can create many posts
- Each post belongs to exactly one user
- The orange line visualizes this connection

**How it works in code:**

```javascript
// User document in users collection
{
  _id: ObjectId("507f1f77bcf86cd799439011"),  // Primary key
  username: "alice",
  email: "alice@example.com",
  password: "hashedpassword123",
  role: "user",
  createdAt: "2025-01-15",
  updatedAt: "2025-01-15"
}

// Post document in posts collection
{
  _id: ObjectId("507f191e810c19729de860ea"),  // Primary key
  userId: ObjectId("507f1f77bcf86cd799439011"),  // Foreign key (matches user's _id)
  title: "My First Post",
  content: "Hello world!",
  createdAt: "2025-01-16",
  updatedAt: "2025-01-16"
}
```

Notice how posts.userId stores the same ObjectId as users.underscore id. This is how MongoDB connects related documents.

## Step 6:  Export your schema

MongoDB Modeler has an export feature you can use to export mongodb code or svg/png screenshots of your diagrams. This is a good starting point for creating your MongoDb schemas

