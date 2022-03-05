export const APPMSG = {
  User: {
    require: {
      userId: "UserID is a required field",
      firstName: "FirstName is a required field",
      lastName: "LastName is a required field",
      email: "E-mail is a required field",
    },
    regular: {
      userId: "UserID is a number",
      email: "The format of the E-mail is incorrect",
    },
    unique: {
      email: "The E-mail already exists"
    }
  },
  Group: {
    require: {
      groupId: "GroupID is a required field",
      groupName: "GroupName is a required field",
    },
    regular: {
      groupId: "GroupID is a number",
    },
  },

  General: {
    notEvenTheMinimum: "could not find parameter to update",
  },
}
