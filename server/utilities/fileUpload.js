import formidable from "formidable"
import {Request} from "express"

const fileUpload = (req)=> {
  const form = formidable({ multiples: true });
  
  return new Promise<{fields: {}, files: {}}>(((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err)
        // res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        // res.end(String(err));
        reject(err)
      } else {
        console.log(files)
        resolve({fields, files})
      }
      // res.writeHead(200, { 'Content-Type': 'application/json' });
      // res.end(JSON.stringify({ fields, files }, null, 2));
    });
  }))
}


export default fileUpload