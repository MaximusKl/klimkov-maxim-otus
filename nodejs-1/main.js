const util = require('util')
const fs = require('fs').promises
const path = require('path')

const myArgs = process.argv.slice(2)
if (myArgs.length !== 1) {
	console.log('Number of arguments not correct. Must be equal 1')
	return
}

const startFolder = myArgs[0]

const directories = []

async function tree(dir) {
	directories.push(dir)

	let readFiles = await fs.readdir(dir)

	readFiles = await Promise.all(
		readFiles.map(async file => {
			const filePath = path.join(dir, file)
			const stats = await fs.stat(filePath)
			if (stats.isDirectory()) return tree(filePath)
			else if (stats.isFile()) return filePath
		})
	)

	return readFiles.reduce((all, folderContents) => all.concat(folderContents), [])
}

tree(startFolder).then(files => {
	const finalObj = { files, directories }

	// Чтобы не было строк в выводе типа '... more items'
	console.log(util.inspect(finalObj, { maxArrayLength: null }))
})
