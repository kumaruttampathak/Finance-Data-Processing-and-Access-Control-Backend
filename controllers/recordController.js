const recordService = require('../services/recordService');
const { recordValidation } = require('../utils/validation');

class RecordController {
  async createRecord(req, res) {
    try {
      const { error } = recordValidation.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
      const record = await recordService.createRecord(req.body);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getRecords(req, res) {
    try {
      const filter = {};
      if (req.query.date) filter.date = new Date(req.query.date);
      if (req.query.category) filter.category = req.query.category;
      const records = await recordService.getRecords(filter);
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRecordById(req, res) {
    try {
      const record = await recordService.getRecordById(req.params.id);
      if (!record) return res.status(404).json({ error: 'Record not found' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateRecord(req, res) {
    try {
      const record = await recordService.updateRecord(req.params.id, req.body);
      if (!record) return res.status(404).json({ error: 'Record not found' });
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteRecord(req, res) {
    try {
      const record = await recordService.deleteRecord(req.params.id);
      if (!record) return res.status(404).json({ error: 'Record not found' });
      res.json({ message: 'Record deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSummary(req, res) {
    try {
      const summary = await recordService.getSummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RecordController();