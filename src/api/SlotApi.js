// api/slotApi.js
export class SlotApi {
  static async spin() {
    const response = await fetch("server.php");
    return parseInt(await response.text()) || 3;
  }
}

// export class SlotApi {
//   static async spin() {
//     try {
//       // Имитация задержки сервера
//       const delay = this.getRandomDelay();
//       await new Promise(resolve => setTimeout(resolve, delay));
      
//       // Генерация выигрышной комбинации
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
//         combination: [3, 3, 3, 3, 3], // Комбинация по умолчанию при ошибке
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
//     // Простая проверка на 3+ одинаковых символа
//     const counts = {};
//     combination.forEach(num => counts[num] = (counts[num] || 0) + 1);
//     return Object.values(counts).some(count => count >= 3);
//   }

//   static calculateWin(combination) {
//     // Более сложная логика расчета выигрыша
//     const symbolValues = [10, 20, 30, 40, 50, 100, 150, 200, 500]; // Значения для каждого символа
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