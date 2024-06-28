import { faker } from '@faker-js/faker'
export const brokerRankFakerData = Array.from({ length: 6 }).map(() => {
  return {
    id: faker.string.uuid(),
    imageUrl: faker.image.avatar(),
    name: faker.person.fullName(),
    post: faker.person.jobTitle(),
    values: faker.number.int({ min: 100, max: 1000 }),
  }
})
