/*
 * app configurations
 * Array[app]
 * app:string | key:value pair
 * string `app` means directory and there is entry direct in it.
 * A key:value pair `app` may have `title`: string, optional, 'dir': string, entry: string | key:value pair | Array[string] 'plugins': array, optional
 */
module.exports = [{
	dir: 'hello-world',
	title: 'Hello World',
	entry: ''
}, {
	dir: 'variable-declarations',
	entry: {
		app: '',
		mutipleVars: 'multiple-vars',
		scopingRules: 'scoping-rules',
		blockScopting: 'block-scoping',
		temporalDeadZone: 'temporal-dead-zone',
		sumMatrix: 'sum-matrix',
		setTimeout: 'set-timeout',
		objectDestructing: 'object-destructing',
		spread: 'spread'
	}
}, {
	dir: 'modules',
	entry: {
		app: '',
		reExportToExtend: 're-export-to-extend',
		importImage: 'import-image'
	}
}, {
	dir: 'advanced-types',
	entry: {
		app: '',
		indexTypes: 'index-types'
	}
}];