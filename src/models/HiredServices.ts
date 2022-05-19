import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

import Client from "./Clients"
import Service from "./Services"

import {Expose} from "class-transformer"

@Entity("hired_services")
class HiredServices {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ default: "now()" })
  start_date: Date;

  @Column()
  end_date: Date;

  // relacionamento N:N clientes e serviços -- cliente como donos
  @ManyToOne(() => Client, (clients) => clients.hiredServices)
  client: Client;

  // relacionamento N:N clientes e serviços -- cliente como donos
  @ManyToOne(() => Service, (service) => service.hiredServices)
  service: Service;

  @Column()
  bedroom_number: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  status: boolean;
}

export default HiredServices
