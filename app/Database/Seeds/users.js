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
  BirthDay: faker.date.recent(),
  isDeleted: 0,
  Role_Id: 3
})

const createArticle = () => ({
  User_Id: 1,
  Location: faker.address.country(),
  Image: faker.image.city(),
  Title: faker.lorem.sentence(),
  Slug: faker.lorem.slug(),
  Duration: faker.random.number(15),
  Price: faker.random.number(100) * 10,
  Introduce: faker.lorem.sentence(),
  isDeleted: 0,
  NumberOfPeople: faker.random.number(15)
})

const createArticleOther = () => ({
  User_Id: 21,
  Location: faker.address.country(),
  Image: faker.image.city(),
  Title: faker.lorem.sentence(),
  Slug: faker.lorem.slug(),
  Duration: faker.random.number(15),
  Price: faker.random.number(100) * 10,
  Introduce: faker.lorem.sentence(),
  isDeleted: 0,
  NumberOfPeople: faker.random.number(15)
})

const createDescription = (i) => ({
  Article_Id: i,
  Day: 1,
  Description: faker.lorem.sentence(),
  isDeleted: 0,
  Place: faker.address.streetName()
})
const createAdmin = {
  Email: 'admin@gmail.com',
  FullName: 'admin',
  Password:  bcript.hashSync('admin123',10),
  Avatar: faker.image.business(),
  Username: 'admin',
  Address: 'admin',
  PhoneNumber: faker.phone.phoneNumber(),
  Slug: faker.lorem.slug(),
  isDeleted: 0,
  Role_Id: 1
}

const createModerator = {
  Email: 'moderator@gmail.com',
  FullName: 'moderator',
  Password:  bcript.hashSync('moderator123',10),
  Avatar: faker.image.business(),
  Username: 'moderator',
  Address: 'moderator',
  PhoneNumber: faker.phone.phoneNumber(),
  Slug: faker.lorem.slug(),
  isDeleted: 0,
  Role_Id: 2
}
const createUser = {
  Email: 'user@gmail.com',
  FullName: 'user',
  Password:  bcript.hashSync('user123',10),
  Avatar: faker.image.business(),
  Username: 'user',
  Address: 'user',
  PhoneNumber: faker.phone.phoneNumber(),
  Slug: faker.lorem.slug(),
  isDeleted: 0,
  Role_Id: 3
}
exports.seed = async function (knex) {
  const fakeUsers = [];
  const fakeArticle = [];
  const fakeArticleOther = [];
  const fakeDescription = []
  fakeUsers.push(createAdmin)
  fakeUsers.push(createModerator)
  fakeUsers.push(createUser)
  const fakeUserAmount = 30
  for (let i = 0; i < fakeUserAmount; i++) {
    fakeUsers.push(createUsers())
  }
  for (let t = 0; t < 5; t++) {
    fakeArticle.push(createArticle())
    fakeArticleOther.push(createArticleOther())
  }
  for (let y = 0; y < 10; y++) {
    fakeDescription.push(createDescription(y*10 + 1))
  }
  await knex('Users').del()
  // Deletes ALL existing entries
  await knex('Users').insert(fakeUsers)
  // await knex('Articles').del()
  // // Deletes ALL existing entries
  // await knex('Articles').insert(fakeArticle)
  // // Deletes ALL existing entries
  // await knex('Articles').insert(fakeArticleOther)
  // await knex('Description_Articles').del()
  // // Deletes ALL existing entries
  // await knex('Description_Articles').insert(fakeDescription)
};