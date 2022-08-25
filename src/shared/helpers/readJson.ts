const fs = require('fs');

export async function readJson(callback: any) { 
    fs.readFile('src/shared/jsons/products.json', 'utf8', (error, data) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, data);
        };
    });
} 



