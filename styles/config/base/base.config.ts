import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

const dir = __dirname;
const baseDir = path.join(dir, "../..");

export class BaseConfig {
	public readonly baseDir:string;
	public paths:any;
	public extracters:any;
	public rules:any;
	public webpack:any;

	constructor() {
		this.baseDir = baseDir;
		const pkg = require(path.join(this.baseDir, 'package.json'));
		this.paths = {
			src: { path: path.join(this.baseDir, 'src/') },
			entry: {
				main: path.join(this.baseDir, 'src/main.scss'),
			},
			compass: { path: path.join(this.baseDir, 'node_modules/compass-mixins/lib') },
			ignored: { path: /node_modules/ },
			dist: { path: path.join(this.baseDir, 'dist/') },
		};
		this.extracters = {
			extractCss: new ExtractTextPlugin({
				filename: '[name].css',
			})
		};
		this.rules = {
			css: {
				test: /\.scss$/,
				use: this.extracters.extractCss.extract({
 					use: [
						'css-loader',
						{
							loader: 'resolve-url-loader',
							options: {
								root: this.paths.src.path,
								includeRoot: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								includePaths: [this.paths.compass.path],
								sourceMap: true
							}
						}
					]
				}),
			},
			fonts: [
				{
					test: /\.svg$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 65000,
							mimetype: 'image/svg+xml',
							name: 'public/fonts/[name].[ext]'
						}
					}
				},
				{
					test: /\.[ot]tf$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 65000,
							mimetype: 'application/octet-stream',
							name: 'public/fonts/[name].[ext]'
						},
					}
				}
			],
		};
		this.webpack = {
			entry: this.paths.entry,
			output: {
				path: this.paths.dist.path,
				filename: '[name].css'
			},
			watch: true,
			watchOptions: {
				aggregateTimeout: 0, poll: 300,
				ignored: this.paths.ignored.path
			},
			stats: {
				colors: true, cached: false, chunks: true,
				timings:true
			},
			devtool: 'cheap-module-inline-source-map',
			resolve: {
				modules: [this.paths.src.path, 'node_modules'],
				extensions: ['.scss'],
				unsafeCache: true
			},
			module: {
				rules: [
					this.rules.css, ...this.rules.fonts
				]
			},
			plugins: [
				this.extracters.extractCss
			]
		};
	}
}
