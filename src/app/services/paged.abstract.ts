import { Observable } from 'rxjs';
import { IList, IListOptions } from '../core/services';
import { IStateService } from './state.abstract';

// FIXME: this is not quite right, should be a service
export interface IPagedService<T>  extends IStateService<T> {
    GetPagedList(options: IListOptions): Observable<IList<T>>;
}
