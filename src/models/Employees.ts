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
  id: string

  @Column({ length: 128 })
  name: string

  // @Column()
  // email: string;

  @Column({ unique: true, length: 11 })
  cpf: string

  @Exclude()
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
