export { default as diaryAPI } from './diaryAPI';
export { default as habitAPI } from './habitAPI';

// How to Use:
/* 
    1) Create js file similar to 'diaryAPI.js' with the name you desire;
    2) Copy the content from 'diaryAPI.js' example but change the methods in 'SubAPI' var to your own liking
    3) Export your file default in this file with any name you like. That name will be the one with which you will call your subAPI
    4) To call the simulated method just: 
        1: Import yourAPI from '../APIDummy/index', like so $import { yourAPI } from '../APIDummy/index';
        2: Call the method like so: yourAPI('methodNameHere', methodArgumentsHere).then( doSomethingCallback );

*/