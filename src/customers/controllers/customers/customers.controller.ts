import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dto/createCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('')
  getCustomers() {
    return this.customersService.getUsers();
  }

  @Get(':id')
  getCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.getUserById(id);
    if (customer?.length > 0) return customer;
    else
      throw new HttpException(
        'Customer does not exist',
        HttpStatus.BAD_REQUEST,
      );
  }
  @Post('/create')
  @UsePipes(ValidationPipe)
  addCustomer(@Body() craeteCustomer: CreateCustomerDto) {
    this.customersService.createCustomer(craeteCustomer);
  }
}
