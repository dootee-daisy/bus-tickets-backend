import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  create(createPaymentDto: CreatePaymentDto) : Promise<Payment> {
    const payment = new Payment();
    payment.amount = createPaymentDto.amount;
    payment.paymentMethod = createPaymentDto.paymentMethod;
    payment.status = createPaymentDto.status;
    return this.paymentRepository.save(payment);
  }

  findAll() : Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  findOne(id: number) : Promise<Payment> {
    return this.paymentRepository.findOneBy({ id });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) : Promise<Payment> {
    const payment = await this.findOne(id);
    if (!payment) {
      throw new Error('Payment not found');
    }
    Object.assign(payment, updatePaymentDto);
    return this.paymentRepository.save(payment);
  }

  async remove(id: number) : Promise<void> {
    const payment = await this.findOne(id);
    if (!payment) {
      throw new Error('Payment not found');
    }
    await this.paymentRepository.remove(payment);
  }
}
