import { faker } from '@faker-js/faker';

export class DataGenerator {
  static generateEmployee() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      position: faker.company.name()
    };
  }

  static generateUsername(): string {
    return faker.internet.userName();
  }

  static generateEmail(): string {
    return faker.internet.email();
  }

  static generateFirstName(): string {
    return faker.person.firstName();
  }

  static generateLastName(): string {
    return faker.person.lastName();
  }

  static generatePhoneNumber(): string {
    return faker.phone.number();
  }

  static generateAddress(): string {
    return faker.location.streetAddress();
  }

  static generateCompanyName(): string {
    return faker.company.name();
  }

  static generateJobTitle(): string {
    return faker.person.jobTitle();
  }

  static generateRandomNumber(min: number, max: number): number {
    return faker.number.int({ min, max });
  }

  static generateBatch(count: number) {
    return Array.from({ length: count }, () => this.generateEmployee());
  }
}
