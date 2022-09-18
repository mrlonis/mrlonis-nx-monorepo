import { BaseResource } from '../base';
import { SpringDataRestHref } from '../spring-data-rest';

export interface MythicHero extends BaseResource {
  factionId: string;
  rarityId: string;
  typeId: string;
  _links: {
    self: SpringDataRestHref;
    item: SpringDataRestHref;
    type: SpringDataRestHref;
    faction: SpringDataRestHref;
    rarity: SpringDataRestHref;
  };
}
