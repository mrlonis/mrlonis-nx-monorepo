import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResource, SpringDataRestResponse } from '../../api/interfaces';

/**
 * Properties:
 *    match is a function that returns the property on an existing object that you would be querying on.
 *        It is used to return matching resources from the pool of objects that the cache has witnessed.
 *        The most common use case of getBy is to query on ID, so this function is typically (x)=>x.id
 *    directRequest is a function that is used to populate the cache with a single element when the cache
 *        doesn't have the resource.
 *        When querying on IDs, this will probably just be the getSingle of the service you are using.
 *        In other cases, like practitioner role, it's a getCollection(1,1,HttpParams(provider=id)).entry[0].resource.
 */
export interface GetBySlot<T extends BaseResource> {
  match: (entry: T) => Array<HttpParams>;
  directRequest: (httpParams: HttpParams) => Observable<T>;
}

/**
 * Properties:
 *  match is similar to getBy's match, except it returns an array, rather than a single element. This is useful,
 *    for example, when querying the number of locations relevant to an endpoint. Each location is relevant to multiple
 *      endpoints.
 *  directRequest is similar to getBy's directRequest, except it is optional. If absent, the cache makes a request to get
 *    all of a certain resource, and then counts occurrences by hand. In the future, this should probably be made
 *      a required field, but since we can't yet query on arbitrary extensions, it is useful to fall back to sometimes.
 */
export interface CountBySlot<T extends BaseResource> {
  match: (entry: T) => Array<HttpParams>;
  directRequest?: (httpParams: HttpParams) => Observable<number>;
}

/**
 * Properties:
 *    match is similar to countBy's match; each resource can be relevant to multiple keys.
 *    directRequest is similar to getBy's directRequest.
 */
export interface CollectBySlot<T extends BaseResource> {
  match?: (entry: T) => Array<HttpParams>;
  directRequest: (httpParams: HttpParams) => Observable<Array<T>>;
}

// Specifies one type of resource to cache as it comes in.
export interface CacheSlot<T extends BaseResource> {
  /**
   * This is the service that gets a collection of the resource.
   * It is used to count all occurrences of the resources, and to get all of it.
   * it is not used to get single occurrences, or count occurrences that have a certain property.
   */
  service?: (pageIndex: number, pageSize: number, params: HttpParams) => Observable<SpringDataRestResponse<T>>;

  /**
   * The getAll flag specifies whether or not the cache should attempt to cache a full list of the resource.
   * For example, provider-group and provider-billing-group would likely have this flag set to true,
   * because the provider page needs to get a full list of those resources to populate the choices of its dropdown component.
   */
  getAll?: boolean;

  /**
   * The getBy dict specifies all the ways in which single elements of the resource should be queried.
   * For example, most resources will need to be queried by their ID, but some resources, like provider role,
   *    have other properties that they need to be queried on, like practitioner. Billing groups may also
   *    need to be queried on their local IDs.
   */
  getBy?: GetBySlot<T>;

  /**
   * The countBy dict is similar to the getBy dict, but it is used for counting occurrences of a resource.
   * The cache only counts existing objects if it is confident that it has received all of a certain resource.
   *    this happens when some getCollection occurs that returns a bundle where bundle.total==bundle.entry.length.
   */
  countBy?: CountBySlot<T>;

  /**
   * The collectBy dict is similar to the getBy dict, but it is used in situations where there is more than one match.
   * The cache only collects existing objects if it is confident that it has received all of a certain resource.
   *    this happens when some getCollection occurs that returns a bundle where bundle.total==bundle.entry.length.
   */
  collectBy?: CollectBySlot<T>;
  // TODO - Not a map, just raw CollectBySlot since this is the external setup for use in other apps
}
