import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import Bedroom from "./Bedrooms";
import HiredServices from "./HiredServices";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 128 })
  name: string;

  @Column({ unique: true, length: 11 })
  cpf: string;

  @Column()
  birthDate: Date;

  @Column({ unique: true, length: 11 })
  cellphone: string;

  // relacionamento 1:N clientes e serviços -- cliente como donos
  @OneToMany(() => HiredServices, (hiredServices) => hiredServices.clients, {
    eager: true,
  })
  hiredServices: HiredServices[];

  // relacionamento N:1 - quartos e clientes
  @ManyToOne((type) => Bedroom, (bedroom) => bedroom.clients)
  bedroom: Client;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  status: boolean;
}

export default Client;
