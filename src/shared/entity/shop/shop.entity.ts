import { Gift } from 'src/shared/entity/gift/gift.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shop')
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @OneToMany(() => Gift, (gift) => gift.shop)
  gift: Gift[];
}
