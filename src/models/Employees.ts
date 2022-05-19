import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

import { v4 as uuid } from "uuid"
import { Exclude } from "class-transformer"

@Entity("employees")
class Employee {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({ length: 128 })
  name: string

  @Column({ unique: true, length: 11 })
  cpf: string

  @Exclude() //Esconde esse campo quando der um get
  @Column()
  password: string

  @Column({ default: false })
  admin: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({ default: true })
  status: boolean

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export default Employee
