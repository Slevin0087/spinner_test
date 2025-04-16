export class SlotApi {
  static async spin() {
    const response = await fetch("server.php");
    return parseInt(await response.text()) || 3;
  }
}

// export class SlotApi {
//   static async spin() {
//     try {

//       const delay = this.getRandomDelay();
//       await new Promise(resolve => setTimeout(resolve, delay));

//       const combination = this.generateCombination();
//       const isWin = this.checkWin(combination);

//       return {
//         success: true,
//         combination,
//         isWin,
//         winAmount: isWin ? this.calculateWin(combination) : 0,
//         serverDelay: delay
//       };
//     } catch (error) {
//       console.error("API Error:", error);
//       return {
//         success: false,
//         combination: [3, 3, 3, 3, 3],
//         isWin: false,
//         winAmount: 0
//       };
//     }
//   }

//   static getRandomDelay() {
//     const [min, max] = Config.serverDelay;
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   static generateCombination() {
//     return Array(Config.drumsCount).fill(0).map(
//       () => Math.floor(Math.random() * Config.iconPaths.length)
//     );
//   }

//   static checkWin(combination) {
//     const counts = {};
//     combination.forEach(num => counts[num] = (counts[num] || 0) + 1);
//     return Object.values(counts).some(count => count >= 3);
//   }

//   static calculateWin(combination) {
//     const symbolValues = [10, 20, 30, 40, 50, 100, 150, 200, 500];
//     const counts = {};
//     combination.forEach(num => counts[num] = (counts[num] || 0) + 1);

//     return Object.entries(counts).reduce((total, [symbol, count]) => {
//       if (count >= 3) {
//         return total + symbolValues[symbol] * count * 10;
//       }
//       return total;
//     }, 0);
//   }
// }
