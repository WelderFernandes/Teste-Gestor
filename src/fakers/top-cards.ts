import { faker } from '@faker-js/faker'
export const topCardsFaker = Array.from({ length: 6 }).map(() => {
  return {
    id: faker.string.uuid(),
    icon: faker.image.dataUri({ width: 50, height: 50 }),
    title: faker.commerce.product(),
    digits: faker.number.int({ min: 100, max: 10000 }),
    bgcolor: faker.helpers.arrayElement([
      'primary',
      'success',
      'info',
      'secondary',
      'error',
      'warning',
    ]),
  }
})
