

class FileSystem {
    constructor() {
        this.files = {};
    }

    ensureDirectoryExists(path) {
        const directories = path.split('/').slice(1, -1);
        let currentPath = '/';
        for (const directory of directories) {
            currentPath += directory;
            if (!this.files[currentPath]) {
                throw new Error(`Error: Parent directory ${currentPath} does not exist.`);
            }
            currentPath += '/';
        }
    }

    mkdir(path) {
        if (this.files[path]) {
            throw new Error(`Error: Directory ${path} already exists.`);
        }
        this.ensureDirectoryExists(path);
        this.files[path] = '/';
    }

    writeFile(path, data) {
        this.ensureDirectoryExists(path);
        this.files[path] = data;
    }

    readFile(path) {
        const content = this.files[path];
        if (content === undefined) {
            throw new Error(`Error: File ${path} not found.`);
        }
        if (content === '/') {
            throw new Error(`Error: ${path} is a directory.`);
        }
        return content;
    }
    listDirectories() {
        const directories = Object.keys(this.files).filter(path => this.files[path] === '/');
        return directories;
    }
}


const fileSystem = new FileSystem();
fileSystem.mkdir('/fs1');
fileSystem.mkdir('/root');

fileSystem.writeFile('/root/rootfile.txt','creating a file');
fileSystem.writeFile('/root/rootfile.txt');

fileSystem.writeFile('/fs1/file', 'Hello, World!');
// console.log(fileSystem.writeFile('/root/rootfile.txt','creating a file'));
try {
    const fileContent = fileSystem.readFile('/fs1/file');
    const fileContent2=fileSystem.readFile('/root/rootfile.txt');
    console.log(fileContent2);
} catch (error) {
    console.error(error.message);
}
const directories = fileSystem.listDirectories();
console.log('Present Directories:', directories);