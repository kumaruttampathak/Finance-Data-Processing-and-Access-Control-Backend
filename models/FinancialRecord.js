const mongoose = require('mongoose');

const financialRecordSchema = new mongoose.Schema(
  {
    amount: {
          type: Number,
          required: true 
        },
    type: { 
          type: String,
          enum: ['income', 'expense'],
          required: true 
        },
    category: { 
          type: String, 
          required: true 
        },
    date: { 
          type: Date, 
          required: true 
        },
    notes: { 
      type: String 
    }
  }, 
  { 
      timestamps: true 
  }
);

module.exports = mongoose.model('FinancialRecord', financialRecordSchema);