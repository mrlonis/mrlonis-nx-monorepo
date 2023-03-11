import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export function productDetailCanActivate(
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  const id = Number(route.paramMap.get('id'));
  if (isNaN(id) || id < 1) {
    alert('Invalid product Id');
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    return false;
  }
  return true;
}
