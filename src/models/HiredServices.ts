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
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({default: "now()"})
  start_date: Date

  @Column()
  end_date: Date

  // relacionamento N:N clientes e serviços -- cliente como donos
  @ManyToOne(() => Client)
  clients: Client

  // relacionamento N:N clientes e serviços -- cliente como donos
  @ManyToOne(() => Service)
  services: Service[]

  @Column({default: false})
  paid: boolean

  // @Column({type: "decimal", precision: 10, scale: 2, nullable: true})
  // total_price: number

  @Expose({name: "total_price"})
  getTotalPrice(): number {
    return this.services.reduce((acc, actual) => acc + Number(actual.price), 0)
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({default: true})
  status: boolean
}

export default HiredServices
