import { Gulpclass, Task, SequenceTask } from 'gulpclass-extendable/Decorators';
import { BaseGulpFile } from '../base/base.gulpfile';
import * as gulp from 'gulp';

@Gulpclass
export class DevGulpFile extends BaseGulpFile {
	constructor(config:any) {
		super(config);
	}
}

