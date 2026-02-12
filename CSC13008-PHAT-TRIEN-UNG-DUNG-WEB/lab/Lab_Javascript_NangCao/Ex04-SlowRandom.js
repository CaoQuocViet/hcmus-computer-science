var Ex04_SlowRandom = {};

Ex04_SlowRandom.randomCallback = (min, max, callback) => {
    setTimeout(() => {
        const randNum = Math.random() * (max - min) + min;
        callback(randNum);
    }, 1000);
}

Ex04_SlowRandom.randomPromise = (min, max) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const randNum = Math.random() * (max - min) + min;
            resolve(randNum);
        }, 1000);
    });
}

Ex04_SlowRandom.randomAsyncAwait = async (min, max) => {
    const randNum = await Ex04_SlowRandom.randomPromise(min, max);
    return randNum;
}

module.exports = Ex04_SlowRandom;
