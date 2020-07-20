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
  Role_Id: 3
})
const createAdmin = {
  Email: 'admin@gmail.com',
  FullName: 'admin',
  Password: 'admin123',
  Avatar: faker.image.business(),
  Username: 'admin',
  Address: 'admin',
  BirthDay: Date.now(),
  PhoneNumber: faker.phone.phoneNumber(),
  Role_Id: 1
}
exports.seed = async function (knex) {
  const fakeUsers = [];
  const fakeUserAmount = 30
  for (let i = 0; i < fakeUserAmount; i++) {
    fakeUsers.push(createUsers())
  }
  fakeUsers.push(createAdmin)
  await knex('Users').insert(fakeUsers)
};