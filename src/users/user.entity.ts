import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

// import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Exclude()
  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  preferedLocation: string;

  @AfterInsert()
  logInsert() {
    console.log(`User id: ${this.id} was inserted`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`User id: ${this.id} was updated`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`User id: ${this.id} was removed`);
  }
}
