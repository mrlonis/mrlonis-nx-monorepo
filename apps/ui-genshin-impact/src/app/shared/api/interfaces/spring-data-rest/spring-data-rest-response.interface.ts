import { SpringDataRestHref } from '..';

export interface SpringDataRestResponse<T> {
  _embedded: {
    data: T[];
  };
  _links: {
    first?: SpringDataRestHref;
    prev?: SpringDataRestHref;
    self: SpringDataRestHref;
    next?: SpringDataRestHref;
    last?: SpringDataRestHref;
    profile?: SpringDataRestHref;
    search?: SpringDataRestHref;
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
