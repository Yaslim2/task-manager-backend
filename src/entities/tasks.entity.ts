import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

export enum TaskStatus {
  PENDING = 'Pendente',
  IN_PROGRESS = 'Em Andamento',
  COMPLETED = 'Concluída',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;
}
