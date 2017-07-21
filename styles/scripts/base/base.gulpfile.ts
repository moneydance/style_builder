import { Gulpclass, Task, SequenceTask } from 'gulpclass-extendable/Decorators';
import * as path from 'path';
import * as gulp from 'gulp';
import * as del from 'del';
import * as webpack from 'webpack';
import * as gutil from 'gulp-util';

@Gulpclass
export class BaseGulpFile {

	private run:boolean = false;

	constructor(protected config:any) {}
	/**
	 * Task to clean the dist folder by running force rm -rf on it.
	 */
	@Task('clean')
	public clean(cb) {
		del(path.join(this.config.paths.dist.path, "**/*"))
		cb();
	}

	/**
	 * Task to compile typescript code in src
	 */
	@Task('webpack')
	public pack(cb) {
		const outputHandler = (err, stats) => {
			if(err) {
				new gutil.PluginError(
					'webpack', `Error on webpack build: ${err.message}`
				);
			}
			gutil.log('[webpack]', stats.toString(this.config.webpack.stats));
			if (!this.config.webpack.watch) {
				cb();
			} else if (!this.run) {
				this.run = true;
				cb();
			}
		}
		webpack(this.config.webpack, outputHandler);
	}

	/**
	 * Task to compile code base
	 */
	@SequenceTask('compile')
	public compile() {
		return ['clean', 'webpack'];
	}

	/**
	 * Default Task
	 */
	@Task('default', ['compile'])
	public default() {}
}
