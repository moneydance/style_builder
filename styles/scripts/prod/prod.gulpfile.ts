import { Gulpclass, Task, SequenceTask } from 'gulpclass-extendable/Decorators';
import { BaseGulpFile } from '../base/base.gulpfile';

@Gulpclass
export class ProdGulpFile extends BaseGulpFile {
	constructor(config:any) {
		super(config);
	}
}

