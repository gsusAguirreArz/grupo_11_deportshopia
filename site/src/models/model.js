// ------------------- Imports -------------------
const path = require('path');
const fs = require('fs');

// ------------------- Model CODE -------------------
var model = function(fileName) {
    return {
        PATH: path.join(__dirname, '../data/'+ fileName + '.json'),
        read(){
            let fileContent = fs.readFileSync(this.PATH, 'utf-8');
            if (fileContent){
                return JSON.parse(fileContent);
            }
            return [];
        },
        write(newContent){
            let fileContent = JSON.stringify(newContent, null, " ");
            
            fs.writeFileSync(this.PATH, fileContent);
        },
        data(){
            return this.read();
        },
        nextId(){
            let DATA = this.data();
            let finalElement = DATA.pop();

            if (finalElement){
                return ++finalElement.id;
            }
            return 1;
        },
        find(id){
            let DATA = this.data();
            return DATA.find(i => i.id == id);
        },
        create(newElement){
            let DATA = this.data();
            newElement.id = this.nextId();

            DATA.push(newElement);

            this.write(DATA);

            return newElement.id;
        },
        update(element){
            let DATA = this.data();
            let newData = DATA.map( i => {
                if (i.id == element.id){
                    return element;
                }
                return i;
            });

            this.write(newData);

            return element.id;
        },
        delete(id){
            let DATA = this.data();
            let newData = DATA.filter( i => i.id != id);

            this.write(newData);
        },
    };
};

// ------------------- Exports -------------------
module.exports = model;