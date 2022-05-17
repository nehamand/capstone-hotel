import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import Client from "./Clients";

@Entity("bedrooms")
  class Bedroom {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // relacionamento 1:N - quartos e clientes
    @OneToMany(() => Client, (client) => client.bedroom, {
      eager: true,
    })@JoinTable()
    clients: Client;

    @Column({ length: 4 })
    number: string;

    @Column({ length: 3 })
    floor: string;
    
    @Column({ type: "integer" })
    capacity: string;

    @Column({ default: true })
    availability: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Bedroom;
  