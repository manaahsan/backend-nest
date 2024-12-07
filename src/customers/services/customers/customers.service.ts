import { Injectable } from '@nestjs/common';
import { CreateCustomerDetails } from 'src/customers/types/createCustomer';

@Injectable()
export class CustomersService {
  private customers: CreateCustomerDetails[] = [
    {
      id: 1,
      email: 'jack@gmail.com',
      age: 18,
    },
    {
      id: 2,
      email: 'frank@gmail.com',
      age: 27,
    },
    {
      id: 3,
      email: 'john@gmail.com',
      age: 29,
    },
  ];

  getUsers() {
    return this.customers
  }
  getUserById(id:number) {
    return this.customers.filter((user) => user.id == id)
  }
createCustomer(createUserDetails:CreateCustomerDetails) {
    return this.customers.push(createUserDetails)
  }
}

