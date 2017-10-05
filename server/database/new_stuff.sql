WyJ0b2RvcyIsMTJd

mutation {
  createtodo(input:{
    ownerid:null,
      title: "Test",
      description: "Bla bla bla",
      priorityid: 1,
      statusid: 1,
      creatorid: 1,
      duedate: "4/15/2017"
  }) {
    clientMutationId
    todo {
      nodeId
      id
      title
      description
      priorityid
      statusid
      userByCreatorid {
        id
        firstname
        lastname
      }
      userByOwnerid {
        id
        firstname
        lastname
      }
    }
  }
}