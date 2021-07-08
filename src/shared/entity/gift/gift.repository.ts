import { EntityRepository, Repository } from 'typeorm';
import { Gift } from './gift.entity';

@EntityRepository(Gift)
export class GiftRepository extends Repository<Gift> {}
