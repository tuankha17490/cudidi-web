import faker from 'faker'

const createUsers = () => ({
  Email: faker.internet.email(),
  FullName: faker.name.findName(),
  Password: faker.internet.password(),
  Avatar: faker.internet.avatar(),
  Slug: faker.lorem.slug(),
  Username: faker.internet.userName(),
  Address: faker.address.streetAddress(),
  BirthDay: faker.date.past(),
  PhoneNumber: faker.phone.phoneNumber(),
  Role_Id: 1
})
exports.seed = async function (knex) {
  const fakeUsers = [];
  const fakeUserAmount = 50
  for (let i = 0; i < fakeUserAmount; i++) {
    fakeUsers.push(createUsers())
  }
  await knex('Users').insert(fakeUsers)
};