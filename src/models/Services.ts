import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("services")
  class Service {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ length: 128 })
    name: string;
  
    @Column( {
        type: "decimal",
        precision: 10,
        scale: 2  
      })
    price: number;

    @Column({ length: 256 })
    description: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Service;
  