import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import Client from "./Clients";
import { Expose } from "class-transformer"
import Service from "./Services";

@Entity("hired_services")
  class HiredServices {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: "now()" })
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    birthDate: Date;

    @Column({ unique: true })
    cellphone: string;

    // relacionamento N:N clientes e serviços -- cliente como donos
    @ManyToOne(() => Client)
    clients: Client
  
    // relacionamento N:N clientes e serviços -- cliente como donos
    @ManyToOne(() => Service)
    services: Service

    @Column({ default: false})
    paid: boolean
  
    // total price
    // @Expose({ name: "total_price" })
    // getTotalPrice(): number {
    //   return this.services.reduce(
    //     (acc, actual) => acc + Number(actual.price),
    //     0
    //   );
    // }

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default HiredServices;

