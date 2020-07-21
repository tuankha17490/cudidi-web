import faker from 'faker'
import bcript from "bcrypt"
const createUsers = () => ({
  Email: faker.internet.email(),
  FullName: faker.name.findName(),
  Password: faker.internet.password(),
  Avatar: faker.internet.avatar(),
  Slug: faker.lorem.slug(),
  Username: faker.internet.userName(),
  Address: faker.address.streetAddress(),
  PhoneNumber: faker.phone.phoneNumber(),
  Role_Id: 3
})
const createAdmin = {
  Email: 'admin@gmail.com',
  FullName: 'admin',
  Password:  bcript.hashSync('admin123',10),
  Avatar: faker.image.business(),
  Username: 'admin',
  Address: 'admin',
  PhoneNumber: faker.phone.phoneNumber(),
  Role_Id: 1
}
exports.seed = async function (knex) {
  const fakeUsers = [];
  fakeUsers.push(createAdmin)
  const fakeUserAmount = 30
  for (let i = 0; i < fakeUserAmount; i++) {
    fakeUsers.push(createUsers())
  }
  await knex('Users').del()
  // Deletes ALL existing entries
  await knex('Users').insert(fakeUsers)
};