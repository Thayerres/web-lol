import { promises as fs } from 'fs';
import path from 'path';

export async function getDataJson() {
   const jsonDirectory = path.join(process.cwd(), 'src/pages/api');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  //Return the content of the data file in json format
  return JSON.parse(fileContents)
}