import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

import HiredServices from "./HiredServices"

@Entity("services")
class Service {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ length: 128 })
  name: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({ length: 256 })
  description: string;

  @OneToMany((type) => HiredServices, (hiredService) => hiredService.service, {
    eager: true
  })
  @JoinColumn()
  hiredServices: HiredServices[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  status: boolean;
}

export default Service
