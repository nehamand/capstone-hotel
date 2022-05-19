import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

import Client from "./Clients"

@Entity("bedrooms")
class Bedroom {
  @PrimaryGeneratedColumn()
  readonly id: number

  // relacionamento 1:N - quartos e clientes
  @OneToMany(() => Client, (client) => client.bedroom, {
    eager: true,
  })
  @JoinColumn()
  clients: Client[]

  @Column({length: 4})
  number: string

  @Column({length: 3})
  floor: string

  @Column({type: "integer"})
  capacity: number

  @Column({default: true})
  availability: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({default: true})
  status: boolean
}

export default Bedroom
