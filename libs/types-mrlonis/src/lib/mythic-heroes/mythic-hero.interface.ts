import { BaseResource, SpringDataRestHref } from '.';

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
