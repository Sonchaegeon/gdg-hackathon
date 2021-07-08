import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Gift } from './gift.entity';

@Entity('gift_image')
export class GiftImage {
  @PrimaryColumn()
  @ManyToOne(() => Gift, (gift) => gift.gift_image)
  @JoinColumn({ name: 'gift_id' })
  gift_id: number;

  @Column({ length: 150 })
  url: string;
}
