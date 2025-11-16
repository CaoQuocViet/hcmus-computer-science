var random = require('./Ex04-SlowRandom');

random.randomCallback(1, 10, (result) => {
    console.log("Callback:", result);
});

random.randomPromise(1, 10).then((result) => {
    console.log("Promise:", result);
});

(async () => {
    const result = await random.randomAsyncAwait(1, 10);
    console.log("Async/Await:", result);
})();

// vietcq@LEGION-7:~/hcmus/ptudw-week$ node Lab_Javascript_NangCao/22810218_Ex04.js 
// undefined
// Callback: 1.2780383764503382
// Promise: 9.65200990751808
// Async/Await: 5.306499589200239