
const np = require('number-precision');

function calculateResultSum(purchase, discount) {
    let total = purchase.reduce((acc, purchase) => np.plus(acc + purchase), 0);
    total = np.times(total, discount);
    return total;
}

module.exports = {calculateResultSum};