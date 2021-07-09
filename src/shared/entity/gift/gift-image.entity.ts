import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Gift } from './gift.entity';

@Entity('gift_image')
export class GiftImage {
  @PrimaryColumn()
  @OneToOne(() => Gift, (gift) => gift.gift_image)
  @JoinColumn({ name: 'gift_id' })
  gift_id: number;

  @Column({ length: 150 })
  cover_url: string;

  @Column({ length: 150 })
  full_url: string;
}
