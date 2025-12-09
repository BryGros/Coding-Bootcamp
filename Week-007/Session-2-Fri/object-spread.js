const baseUser = { name: "Alex", age: 25 };
const permissions = { canEdit: true, canDelete: false };
const preferences = { theme: "light", language: "English" };

const completeUser = {
  ...baseUser,
  ...permissions,
  ...preferences,
  newProperty: 123,
};

console.log(completeUser);

const compUser2 = {}
