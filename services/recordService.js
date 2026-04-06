const FinancialRecord = require('../models/FinancialRecord');

class RecordService {
  async createRecord(recordData) {
    const record = new FinancialRecord(recordData);
    await record.save();
    return record;
  }

  async getRecords(filter = {}) {
    return await FinancialRecord.find(filter);
  }

  async getRecordById(id) {
    return await FinancialRecord.findById(id);
  }

  async updateRecord(id, updates) {
    return await FinancialRecord.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteRecord(id) {
    return await FinancialRecord.findByIdAndDelete(id);
  }

  async getSummary() {
    const summary = await FinancialRecord.aggregate([
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' }
        }
      }
    ]);
    const income = summary.find(s => s._id === 'income')?.total || 0;
    const expense = summary.find(s => s._id === 'expense')?.total || 0;
    const balance = income - expense;
    const categoryTotals = await FinancialRecord.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);
    return { balance, income, expense, categoryTotals };
  }
}

module.exports = new RecordService();