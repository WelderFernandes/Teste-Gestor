import { faker } from '@faker-js/faker'
export const agencies = Array.from({ length: 200 }).map(() => {
  return {
    id: faker.number.int({ min: 1000, max: 9999 }),
    imageUrl: faker.image.avatar(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    status: faker.helpers.arrayElement([0, 1]),
    createdAt: faker.date.recent({ days: 30 }),
    updatedAt: faker.date.recent({ days: 10 }),
  }
})
