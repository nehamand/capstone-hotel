import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { Exclude } from "class-transformer";

@Entity("users")
  class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ length: 128 })
    name: string;
  
    // @Column()
    // email: string;

    @Column({ unique: true, length: 11 })
    cpf: string;
  
    @Exclude()
    @Column()
    password: string;

    @Column({ default: false }) 
    admin: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default User;
  
