const methods = [{
    ID: 1,
    Name: 'Create'
  },
  {
    ID: 2,
    Name: 'Read'
  },
  {
    ID: 3,
    Name: 'Update'
  },
  {
    ID: 4,
    Name: 'Delete'
  },
  {
    ID: 5,
    Name: 'GetList'
  },
  {
    ID: 6,
    Name: 'Search'
  },
  {
    ID: 7,
    Name: 'Rating'
  },
  {
    ID: 8,
    Name: 'Follow'
  }
]

const modules = [{
    ID: 1,
    Name: 'Users'
  },
  {
    ID: 2,
    Name: 'Article'
  },
  {
    ID: 3,
    Name: 'Description-Articles'
  },
  {
    ID: 4,
    Name: 'Image-Article'
  },
  {
    ID: 5,
    Name: 'Comment'
  },
]
let count = 1
const permissions = []
for (let i = 0; i < modules.length; i++) {
  for (let y = 0; y < methods.length; y++) {
    permissions.push({
      ID: count,
      Module_Id: modules[i].ID,
      Method_Id: methods[y].ID
    })
    count++
  }
}

const admin_role_permission = []
for (let i = 1; i < count; i++) {
  admin_role_permission.push({
    Role_Id: 1,
    Permission_Id: i
  })
}

const users_role_permission = []

function UsersRole(moduleName, methodNames = []) {
  modules.forEach(module => {
    if (moduleName == module.Name) {
      for (let i = 0; i < methodNames.length; i++) {
        methods.forEach(method => {
          if (method.Name == methodNames[i]) {
            permissions.forEach(permission => {
              if (permission.Method_Id == method.ID && permission.Module_Id == module.ID) {
                users_role_permission.push({
                  Role_Id: 3,
                  Permission_Id: permission.ID
                })
              }
            })
          }
        });
      }
    }
  })
}


const moderator_role_permission = []

function ModeratorRole(moduleName, methodNames = []) {
  modules.forEach(module => {
    if (moduleName == module.Name) {
      for (let i = 0; i < methodNames.length; i++) {
        methods.forEach(method => {
          if (method.Name == methodNames[i]) {
            permissions.forEach(permission => {
              if (permission.Method_Id == method.ID && permission.Module_Id == module.ID) {
                moderator_role_permission.push({
                  Role_Id: 2,
                  Permission_Id: permission.ID
                })
              }
            })
          }
        });
      }
    }
  })

}

exports.seed = async function (knex) {
  await UsersRole('Users', ['Search', 'Read', 'GetList'])
  await UsersRole('Article', ['Read', 'Create', 'Update', 'Delete', 'Follow'])
  await UsersRole('Description-Articles', ['Read', 'Create', 'Update', 'Delete'])
  await UsersRole('Image-Article', ['Read', 'Create', 'Read', 'Delete'])

  await ModeratorRole('Users', ['Create', 'Read', 'GetList', 'Search', 'Delete', 'Update'])
  await ModeratorRole('Article', ['Read', 'GetList', 'Search'])
  await ModeratorRole('Description-Article', ['Read', 'GetList', 'Search'])

  // Deletes ALL existing entries
  await knex('Role_Permission').del();
  await knex('Permissions').del();
  await knex('Methods').del();
  await knex('Modules').del();
  await knex('Roles').del()
  await knex('Roles').insert([{
      ID: 1,
      Name: 'Admin'
    },
    {
      ID: 2,
      Name: 'Moderator'
    },
    {
      ID: 3,
      Name: 'Users'
    }
  ]);
  await knex('Methods').insert(methods);
  await knex('Modules').insert(modules);
  await knex('Permissions').insert(permissions);
  await knex('Role_Permission').insert(admin_role_permission);
  await knex('Role_Permission').insert(moderator_role_permission);
  await knex('Role_Permission').insert(users_role_permission);

};